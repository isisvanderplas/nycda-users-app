const express = require('express');
      pug = require('pug');
      morgan = require('morgan');
      fs = require('fs');

var app = express();
  userStore = JSON.parse(fs.readFileSync('users.json'));

app.use(morgan('dev'));

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render('index', { users: userStore });
});

app.get('/search', (request, response) => {
  response.render('searchbar');
});

app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});
