const routes = require('express').Router();
const passport = require('passport');
const contact = require('./contacts');
const corrective = require('./corrective');
const employee = require('./employees');

routes.use('/', require('./swagger'));
routes.use('/contacts', contact);
routes.use('/corrective', corrective);
routes.use('/employees', employee);
// routes.use(
//     '/',
//     (docData = (req, res) => {
//         let docData = {
//         documentationURL:"timo github",
//     };
//     res.send(docData);
// })
// );
routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) {return next(err); }
        res.redirect('/');
    });
});




module.exports = routes;
