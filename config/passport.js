const passport = require('passport');
//const LocalStrategy = require('passport').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

passport.use(new LocalStrategy({
  usernameField : 'email',
  passwordField: 'password'
}, function (email, password, done) {
  Usuario.findOne({email: email})
  .then(function (user) {
    if (!user || !user.validarPassword(password)){
      return done(null, false, {errors:{'email o contraseña': 'incorrecta'}});
    }
    return done(null, user);
  })
  .catch(done);
}));