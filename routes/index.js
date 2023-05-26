const routes = require('express').Router();
const passport = require('passport');
routes.use('/', require('./swagger'));

routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err); }
        res.redirect('/');
    });
});


routes.use('/contacts', require('./contacts'));
routes.use('/corrective', require('./corrective'));
routes.use('/employees', require('./employees'));
routes.use('/nonconformance', require('./nonconformance'));

module.exports = routes;
