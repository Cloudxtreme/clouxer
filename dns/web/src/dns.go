package main

import (
	"code.google.com/p/go.net/publicsuffix"
	"fmt"
	"github.com/miekg/dns"
	"labix.org/v2/mgo"
	"labix.org/v2/mgo/bson"
	"net"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"sync"
	"time"
)

func SetupDB() *mgo.Session {
	uri := "mongodb://127.0.0.1/clouxer"
	if uri == "" {
		fmt.Println("no connection string provided")
	} else {
		sess, err := mgo.Dial(uri)
		if err != nil {
			fmt.Printf("Can't connect to mongo, go error %v\n", err)
		} else {
			fmt.Printf("MongoDB Connected \n")
			//defer sess.Close()
			sess.SetSafe(&mgo.Safe{})
			return sess
		}
	}
	return nil
}

//////////////////////////////////////////////////////////
//DNS MAIN//
//////////////////////////////////////////////////////////

func main() {
	fmt.Printf("Clouxer DNS Server\n")

	server := &Server{
		host:     "31.210.63.198",
		port:     53,
		rTimeout: 5 * time.Second,
		wTimeout: 5 * time.Second,
	}

	server.Run()

	sig := make(chan os.Signal)
	signal.Notify(sig, os.Interrupt)

forever:
	for {
		select {
		case <-sig:
			fmt.Printf("signal received, stopping\n")
			break forever
		}
	}
}

func Debug(format string, v ...interface{}) {
	if true {
		fmt.Printf(format, v...)
	}
}

//////////////////////////////////////////////////////////
//SERVER//
//////////////////////////////////////////////////////////
type Server struct {
	host     string
	port     int
	rTimeout time.Duration
	wTimeout time.Duration
}

func (s *Server) Addr() string {
	return s.host + ":" + strconv.Itoa(s.port)
}

func (s *Server) Run() {

	Handler := NewHandler()

	tcpHandler := dns.NewServeMux()
	tcpHandler.HandleFunc(".", Handler.DoTCP)

	udpHandler := dns.NewServeMux()
	udpHandler.HandleFunc(".", Handler.DoUDP)

	tcpServer := &dns.Server{Addr: s.Addr(),
		Net:          "tcp",
		Handler:      tcpHandler,
		ReadTimeout:  s.rTimeout,
		WriteTimeout: s.wTimeout}

	udpServer := &dns.Server{Addr: s.Addr(),
		Net:          "udp",
		Handler:      udpHandler,
		UDPSize:      65535,
		ReadTimeout:  s.rTimeout,
		WriteTimeout: s.wTimeout}

	go s.start(udpServer)
	go s.start(tcpServer)
}

func (s *Server) start(ds *dns.Server) {

	fmt.Printf("Start %s listener on %s\n", ds.Net, s.Addr())
	err := ds.ListenAndServe()
	if err != nil {
		fmt.Printf("Start %s listener on %s failed:%s", ds.Net, s.Addr(), err.Error())
	}

}

//////////////////////////////////////////////////////////
//MEMORY CACHE SYSTEM
//////////////////////////////////////////////////////////
type Cache struct {
	data       map[Question]*CacheData
	flood      map[string]*FloodData
	block      map[string]int
	ipseclimit int
	blocktime  int
}

type CacheData struct {
	answer  *dns.Msg
	timeout int
}

type FloodData struct {
	count   int
	timeout int
}

func (c *Cache) start() {
	cacheticker := time.NewTicker(time.Millisecond * 1000) //sec
	go func() {
		for t := range cacheticker.C { //main loop
			_ = t
			for key, value := range c.data {
				value.timeout--
				if value.timeout == 0 {
					delete(c.data, key)
				}
			}
		}
	}()

	floodticker := time.NewTicker(time.Millisecond * 1000)
	go func() {
		for t := range floodticker.C {
			_ = t
			for key, value := range c.flood {
				value.count = 0
				value.timeout--
				if value.timeout == 0 {
					delete(c.flood, key)
				}
			}
		}
	}()

	blockticker := time.NewTicker(time.Millisecond * 1000)
	go func() {
		for t := range blockticker.C {
			_ = t
			for key, value := range c.block {
				c.block[key] = value - 1
				if value == 0 {
					delete(c.block, key)
				}
			}
		}
	}()
}

func (c *Cache) get(q Question) *dns.Msg {
	if _, ok := c.data[q]; ok {
		return c.data[q].answer
	} else {
		return nil
	}
}

func (c *Cache) set(q Question, a *dns.Msg) {
	c.data[q] = &CacheData{
		answer:  a,
		timeout: 60,
	}
}

func (c *Cache) checkFlood(ip string) bool {

	if _, ok := c.block[ip]; ok {
		return true
	} else {
		if _, ok := c.flood[ip]; ok {
			if c.flood[ip].count > c.ipseclimit {
				delete(c.flood, ip)
				c.block[ip] = c.blocktime
				return true
			} else {
				c.flood[ip].count++
				c.flood[ip].timeout = 10
				return false
			}
		} else {
			c.flood[ip] = &FloodData{
				count:   1,
				timeout: 10, //flood ip cache time
			}
			return false
		}

		c.flood[ip] = &FloodData{
			count:   1,
			timeout: 10, //flood ip cache time
		}
		return false
	}
}

//////////////////////////////////////////////////////////
//HANDLERS//
//////////////////////////////////////////////////////////

type Question struct {
	qname  string
	qtype  string
	qclass string
}

func (q *Question) String() string {
	return q.qname + " " + q.qclass + " " + q.qtype
}

type XNSHandler struct {
	mu           *sync.Mutex
	MongoSession *mgo.Session
	Cache        *Cache
}

func NewHandler() *XNSHandler {

	cache := &Cache{
		data:       make(map[Question]*CacheData),
		flood:      make(map[string]*FloodData),
		block:      make(map[string]int),
		ipseclimit: 10,
		blocktime:  60,
	}
	cache.start()
	return &XNSHandler{new(sync.Mutex), SetupDB(), cache}
}

func findQueryNameFromDomain(domain string) string {
	dom, err := publicsuffix.EffectiveTLDPlusOne(domain)
	PaincIf(err)
	if dom == domain {
		return "@"
	} else {
		return strings.Split(domain, "."+dom)[0]
	}
}

func findTopDomain(domain string) string {
	dom, err := publicsuffix.EffectiveTLDPlusOne(domain)
	PaincIf(err)
	return dom
}

type aDoc struct {
	Id     bson.ObjectId `bson:"_id"`
	Verify bool          `bson:"verify"`
	Domain string        `bson:"domain"`
	Email  string        `bson:"email"`
	Active bool          `bson:"active"`
	Ttl    uint32        `bson:"ttl"`
	Value  string        `bson:"value"`
	Name   string        `bson:"name"`
}

type cnameDoc struct {
	Id     bson.ObjectId `bson:"_id"`
	Verify bool          `bson:"verify"`
	Domain string        `bson:"domain"`
	Email  string        `bson:"email"`
	Ttl    uint32        `bson:"ttl"`
	Value  string        `bson:"value"`
	Name   string        `bson:"name"`
}

type mxDoc struct {
	Id       bson.ObjectId `bson:"_id"`
	Verify   bool          `bson:"verify"`
	Domain   string        `bson:"domain"`
	Email    string        `bson:"email"`
	Priority uint32        `bson:"priority"`
	Ttl      uint32        `bson:"ttl"`
	Value    string        `bson:"value"`
	Name     string        `bson:"name"`
}

type txtDoc struct {
	Id     bson.ObjectId `bson:"_id"`
	Verify bool          `bson:"verify"`
	Domain string        `bson:"domain"`
	Email  string        `bson:"email"`
	Ttl    uint32        `bson:"ttl"`
	Value  string        `bson:"value"`
	Name   string        `bson:"name"`
}

func (h *XNSHandler) do(Net string, w dns.ResponseWriter, req *dns.Msg) {
	q := req.Question[0]
	Q := Question{UnFqdn(q.Name), dns.TypeToString[q.Qtype], dns.ClassToString[q.Qclass]}
	ip := strings.Split(w.RemoteAddr().String(), ":")[0]
	Debug("Question:　%s IP: %s \n", Q.String(), ip)

	if !h.Cache.checkFlood(ip) {
		if Q.qclass == "IN" {
			//bütün sorgular için cname varmı ona bakmamız gerekiyor. Eğer cname varsa ona dönüdürüyor herşeyi
			//değilse
			if Q.qtype == "A" {
				c := h.Cache.get(Q)
				if c == nil {
					var docs []aDoc
					name := findQueryNameFromDomain(Q.qname)
					domain := findTopDomain(Q.qname)
					err := h.MongoSession.DB("clouxer").C("record_as").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
					if err == nil {
						if len(docs) > 0 {
							m := new(dns.Msg)
							m.SetReply(req)
							for _, element := range docs {
								if element.Active == true {
									//return free clouxer server
									/* Find Free Clouxer Server Testing.. */
									rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeA, Class: dns.ClassINET, Ttl: element.Ttl}
									a := &dns.A{rr_header, net.ParseIP("31.210.63.198")}
									m.Answer = append(m.Answer, a)
								} else {
									rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeA, Class: dns.ClassINET, Ttl: element.Ttl}
									a := &dns.A{rr_header, net.ParseIP(element.Value)}
									m.Answer = append(m.Answer, a)
								}
							}
							h.Cache.set(Q, m)
							w.WriteMsg(m)
						} else {
							var docs []cnameDoc
							err := h.MongoSession.DB("clouxer").C("record_cnames").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
							if err == nil {
								if len(docs) > 0 {
									m := new(dns.Msg)
									m.SetReply(req)
									for _, element := range docs {
										rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeCNAME, Class: dns.ClassINET, Ttl: element.Ttl}
										a := &dns.CNAME{rr_header, element.Value + "."}
										m.Answer = append(m.Answer, a)
									}
									h.Cache.set(Q, m)
									w.WriteMsg(m)
								} else {
									h.Cache.set(Q, nil)
								}
							} else {
								h.Cache.set(Q, nil)
							}
						}
					} else {
						h.Cache.set(Q, nil)
					}
				} else { /* Caching.. */
					c.SetReply(req)
					w.WriteMsg(c)
				}

			} else if Q.qtype == "CNAME" {
				c := h.Cache.get(Q)
				if c == nil {
					var docs []cnameDoc
					name := findQueryNameFromDomain(Q.qname)
					domain := findTopDomain(Q.qname)
					err := h.MongoSession.DB("clouxer").C("record_cnames").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
					if err == nil {
						if len(docs) > 0 {
							m := new(dns.Msg)
							m.SetReply(req)
							for _, element := range docs {
								rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeCNAME, Class: dns.ClassINET, Ttl: element.Ttl}
								a := &dns.CNAME{rr_header, element.Value + "."}
								m.Answer = append(m.Answer, a)
							}
							h.Cache.set(Q, m)
							w.WriteMsg(m)
						} else {
							h.Cache.set(Q, nil)
						}
					} else {
						h.Cache.set(Q, nil)
					}
				} else {
					c.SetReply(req)
					w.WriteMsg(c)
				}
			} else if Q.qtype == "MX" {
				c := h.Cache.get(Q)
				if c == nil {
					var docs []mxDoc
					name := findQueryNameFromDomain(Q.qname)
					domain := findTopDomain(Q.qname)
					err := h.MongoSession.DB("clouxer").C("record_mxes").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
					if err == nil {
						if len(docs) > 0 {
							m := new(dns.Msg)
							m.SetReply(req)
							for _, element := range docs {
								rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeMX, Class: dns.ClassINET, Ttl: element.Ttl}
								a := &dns.MX{rr_header, uint16(element.Priority), element.Value + "."}
								m.Answer = append(m.Answer, a)
							}
							h.Cache.set(Q, m)
							w.WriteMsg(m)
						} else {
							var docs []cnameDoc
							err := h.MongoSession.DB("clouxer").C("record_cnames").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
							if err == nil {
								if len(docs) > 0 {
									m := new(dns.Msg)
									m.SetReply(req)
									for _, element := range docs {
										rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeCNAME, Class: dns.ClassINET, Ttl: element.Ttl}
										a := &dns.CNAME{rr_header, element.Value + "."}
										m.Answer = append(m.Answer, a)
									}
									h.Cache.set(Q, m)
									w.WriteMsg(m)
								} else {
									h.Cache.set(Q, nil)
								}
							} else {
								h.Cache.set(Q, nil)
							}
						}
					} else {
						h.Cache.set(Q, nil)
					}
				} else {
					c.SetReply(req)
					w.WriteMsg(c)
				}
			} else if Q.qtype == "SPF" {
				c := h.Cache.get(Q)
				if c == nil {
					var docs []txtDoc
					name := findQueryNameFromDomain(Q.qname)
					domain := findTopDomain(Q.qname)
					err := h.MongoSession.DB("clouxer").C("record_spfs").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
					if err == nil {
						if len(docs) > 0 {
							m := new(dns.Msg)
							m.SetReply(req)
							for _, element := range docs {
								rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeSPF, Class: dns.ClassINET, Ttl: element.Ttl}
								a := &dns.SPF{rr_header, []string{element.Value}}
								m.Answer = append(m.Answer, a)
							}
							h.Cache.set(Q, m)
							w.WriteMsg(m)
						} else {
							var docs []cnameDoc
							err := h.MongoSession.DB("clouxer").C("record_cnames").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
							if err == nil {
								if len(docs) > 0 {
									m := new(dns.Msg)
									m.SetReply(req)
									for _, element := range docs {
										rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeCNAME, Class: dns.ClassINET, Ttl: element.Ttl}
										a := &dns.CNAME{rr_header, element.Value + "."}
										m.Answer = append(m.Answer, a)
									}
									h.Cache.set(Q, m)
									w.WriteMsg(m)
								} else {
									h.Cache.set(Q, nil)
								}
							} else {
								h.Cache.set(Q, nil)
							}
						}
					} else {
						h.Cache.set(Q, nil)
					}
				} else {
					c.SetReply(req)
					w.WriteMsg(c)
				}
			} else if Q.qtype == "TXT" {
				c := h.Cache.get(Q)
				if c == nil {
					var docs []txtDoc
					name := findQueryNameFromDomain(Q.qname)
					domain := findTopDomain(Q.qname)
					err := h.MongoSession.DB("clouxer").C("record_txts").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
					if err == nil {
						if len(docs) > 0 {
							m := new(dns.Msg)
							m.SetReply(req)
							for _, element := range docs {
								rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeTXT, Class: dns.ClassINET, Ttl: element.Ttl}
								a := &dns.TXT{rr_header, []string{element.Value}}
								m.Answer = append(m.Answer, a)
							}
							h.Cache.set(Q, m)
							w.WriteMsg(m)
						} else {
							var docs []cnameDoc
							err := h.MongoSession.DB("clouxer").C("record_cnames").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
							if err == nil {
								if len(docs) > 0 {
									m := new(dns.Msg)
									m.SetReply(req)
									for _, element := range docs {
										rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeCNAME, Class: dns.ClassINET, Ttl: element.Ttl}
										a := &dns.CNAME{rr_header, element.Value + "."}
										m.Answer = append(m.Answer, a)
									}
									h.Cache.set(Q, m)
									w.WriteMsg(m)
								} else {
									h.Cache.set(Q, nil)
								}
							} else {
								h.Cache.set(Q, nil)
							}
						}
					} else {
						h.Cache.set(Q, nil)
					}
				} else {
					c.SetReply(req)
					w.WriteMsg(c)
				}
			} else if Q.qtype == "AAAA" {
				c := h.Cache.get(Q)
				if c == nil {
					var docs []aDoc
					name := findQueryNameFromDomain(Q.qname)
					domain := findTopDomain(Q.qname)
					err := h.MongoSession.DB("clouxer").C("record_aaaas").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
					if err == nil {
						if len(docs) > 0 {
							m := new(dns.Msg)
							m.SetReply(req)
							for _, element := range docs {
								if element.Active == true {
									//return free clouxer server
									/* Find Free Clouxer Server */
								} else {
									rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeAAAA, Class: dns.ClassINET, Ttl: element.Ttl}
									a := &dns.AAAA{rr_header, net.ParseIP(element.Value)}
									m.Answer = append(m.Answer, a)
								}
							}
							h.Cache.set(Q, m)
							w.WriteMsg(m)
						} else {
							var docs []cnameDoc
							err := h.MongoSession.DB("clouxer").C("record_cnames").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
							if err == nil {
								if len(docs) > 0 {
									m := new(dns.Msg)
									m.SetReply(req)
									for _, element := range docs {
										rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeCNAME, Class: dns.ClassINET, Ttl: element.Ttl}
										a := &dns.CNAME{rr_header, element.Value + "."}
										m.Answer = append(m.Answer, a)
									}
									h.Cache.set(Q, m)
									w.WriteMsg(m)
								} else {
									h.Cache.set(Q, nil)
								}
							} else {
								h.Cache.set(Q, nil)
							}
						}
					} else {
						h.Cache.set(Q, nil)
					}
				} else { /* Caching.. */
					c.SetReply(req)
					w.WriteMsg(c)
				}
			} else if Q.qtype == "NS" {
				c := h.Cache.get(Q)
				if c == nil {
					var docs []txtDoc //is same NS database fields
					name := findQueryNameFromDomain(Q.qname)
					domain := findTopDomain(Q.qname)
					err := h.MongoSession.DB("clouxer").C("record_ns").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
					if err == nil {
						if len(docs) > 0 {
							m := new(dns.Msg)
							m.SetReply(req)
							for _, element := range docs {
								rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeNS, Class: dns.ClassINET, Ttl: element.Ttl}
								a := &dns.NS{rr_header, element.Value + "."}
								m.Answer = append(m.Answer, a)
							}
							h.Cache.set(Q, m)
							w.WriteMsg(m)
						} else {
							var docs []cnameDoc
							err := h.MongoSession.DB("clouxer").C("record_cnames").Find(bson.M{"domain": domain, "name": name, "verify": true}).All(&docs)
							if err == nil {
								if len(docs) > 0 {
									m := new(dns.Msg)
									m.SetReply(req)
									for _, element := range docs {
										rr_header := dns.RR_Header{Name: q.Name, Rrtype: dns.TypeCNAME, Class: dns.ClassINET, Ttl: element.Ttl}
										a := &dns.CNAME{rr_header, element.Value + "."}
										m.Answer = append(m.Answer, a)
									}
									h.Cache.set(Q, m)
									w.WriteMsg(m)
								} else {
									h.Cache.set(Q, nil)
								}
							} else {
								h.Cache.set(Q, nil)
							}
						}
					} else {
						h.Cache.set(Q, nil)
					}
				} else {
					c.SetReply(req)
					w.WriteMsg(c)
				}
			} else if Q.qtype == "LOC" {
				/* Not Yet */
			} else if Q.qtype == "SOA" {
				/* Not Yet */
			} else {

			}
		}
	} else {

	}
}

func (h *XNSHandler) DoTCP(w dns.ResponseWriter, req *dns.Msg) {
	h.do("tcp", w, req)
}

func (h *XNSHandler) DoUDP(w dns.ResponseWriter, req *dns.Msg) {
	h.do("udp", w, req)
}

func (h *XNSHandler) isIPQuery(q dns.Question) bool {
	return q.Qtype == dns.TypeA && q.Qclass == dns.ClassINET
}

func UnFqdn(s string) string {
	if dns.IsFqdn(s) {
		return s[:len(s)-1]
	}
	return s
}

func PaincIf(err error) {
	if err != nil {
		panic(err)
	}
}
