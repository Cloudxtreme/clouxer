/**
 * Created by Administrator on 23.08.2014.
 */
exports.index = function(req, res){
    req.session.destroy();
    res.redirect('/');
};
