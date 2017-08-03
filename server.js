const express = require ('express');
const hbs = require ('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  } );
  next();
});


app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear() + 'meins';
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send ('<h1>hello express!</h1>');
  res.render ('home.hbs', {
    pageTitle: 'homepage',
    msgWelcome: 'Hello and welcome to this awesome page'
  });
});

app.get('/about', (req, res) =>{
  res.render('about.hbs', {
    pageTitle: 'About Dennis',
  });
});

app.get('/projects', (req, res) =>{
  res.render('projects.hbs', {
    pageTitle: 'My current projects',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Bad request',
    errorCode: 404
  });
});

app.listen(3000, ()=> {
  console.log('Server is listneing to port 3000');
});
