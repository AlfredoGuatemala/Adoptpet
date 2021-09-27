//express
const express = require('express');
const app = express();
//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const mongoose = require('mongoose');


//base de datos
mongoose.connect( 
  process.env.MONGO_URI,

  { useUnifiedTopology: true, useNewUrlParser:true, useCreateIndex: true}
);

mongoose.set("debug",true);

require('./models/Usuario');
require('./models/Mascota');

require('./config/passport')
require('.')
//rutas
app.use('/v1', require('./routes'));

PORT = 4001

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

//Mongoose Configuration


