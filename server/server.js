const express     = require('express');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const path        = require('path');
const mongoose    = require('mongoose');
const passport    = require('passport');
const session     = require('express-session');

const routes = require('./routes').routes;
const errorHandler = require('./error/errorHandler').errorHandler;

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(morgan('dev'));

routes(app);
app.use(errorHandler);

app.listen(3001, (err) => {
  if(err) console.log(err);

  console.log('api server is listening...');
});