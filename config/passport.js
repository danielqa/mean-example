var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function () {
    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: 'ed27a1bf7ef00e7704b3',
        clientSecret: '34c9345090850025301e5bb3e857adf5dd3cec98',
        callbackURL: 'http://localhost:3000/auth/github/callback'
    }, function (accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
            {'login': profile.username},
            {'nome': profile.username},
            function (erro, usuario) {
                if (erro) {
                    console.log(erro);
                    return done(erro);
                }
                return done(null, usuario);
            }
        );
    }));

    passport.serializeUser(function (usuario, done) {
        done(null, usuario._id);
    });

    passport.deserializeUser(function (id, done) {
        Usuario.findById(id).exec().then(function (usuario) {
            done(null, usuario);
        });
    });
};