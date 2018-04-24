const express = require('express');
const bodyParser = require('body-parser');
const  path = require('path');
const http = require('http');
const app = express();
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(expressValidator());
app.use(cookieParser());
app.use(session({secret: 'krunal', saveUninitialized: false, resave: false}));

app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);


// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
 //res.render('heroes', {success: req.session.success, errors: req.session.errors});
  req.session.errors = null;
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));


















