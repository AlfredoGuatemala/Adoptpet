const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;


// class Usuario {
//   constructor (id, username, nombre, apellido, email, password, tipo){
//     this.id = id;
//     this.username = username;
//     this.nombre = nombre;
//     this.apellido = apellido;
//     this.email = email;
//     this.password = password;
//     this.tipo = tipo;
//   }
// }

// module.exports = Usuario;

const UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "No puede estar vacio el campo username"],
    lowercase: true,
    match: [/^[a-zA-Z0-9]+$/, "Username inválido"],
    index: true,
  },
  nombre: {
    type:String, 
    required: true},
  apellido: {
    type: String, 
    required: true},
  email: {
    type: String,
    unique: true,
    required: [true, "Falta email"],
    match: [/\S+@\S+\.\S+/, "Email inválido"],
    index: true
  },
  tipo: {
    type:String,
    enum: ['normal', 'anunciante']
  },
  hash: String,
  salt: String
}, {
  collection: "usuarios", timpestamps: true});

UsuarioSchema.plugin(uniqueValidator, {message: "Ya existe"});

UsuarioSchema.methods.crearPassword = function (password) {
this.salt = crypto.randomBytes(16).toString('hex');
this.hash = crypto
.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512')
.toString('hex');
};



UsuarioSchema.methods.validarPassword = function  (password) {
  const newhash = crypto
  .pbkdf2Sync(password, this.salt, 1000,512, "sha512")
  .toString("hex");
  return this.hash === newhash;
};

UsuarioSchema.methods.generaJWT = function() {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UsuarioSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generaJWT()
  }
}

UsuarioSchema.methods.publicData = function() {
  return {
    id: this.id,
    username: this.username,
    email: this.email,
    nombre: this.nombre,
    apellido: this.apellido,
    tipo: this.tipo,
  };
};


mongoose.model('Usuario', UsuarioSchema);

