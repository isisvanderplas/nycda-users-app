const express = require('express');
      pug = require('pug');
      morgan = require('morgan');
      fs = require('fs');
      bodyparser = require('body-parser');

var app = express();
  userStore = JSON.parse(fs.readFileSync('users.json'));

app.use(morgan('dev'));

app.use(bodyparser.urlencoded({extended:false}));

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.render('index', { users: userStore });
});

app.get('/search', (request, response) => {
  response.render('searchform');
});

app.get('/search/*', (request, response) => {
  console.log(request.params[0]);
  // make the actual search here!!:
  var foundUser = findUser(request.params[0]);

  response.render('search-result.pug', { user: foundUser });
});

app.post('/search', (request, response) => {

  console.log('search input was: ');
  console.log(request.body);

  response.redirect('/search/' + request.body.query);
});


app.listen(3000, () => {
  console.log('Web Server is running on port 3000');
});

function findUser(input) {
  for (i = 0; i < userStore.length; i++) {
    return(searchFirstName(input, userStore[i]) || searchLastName(input, userStore[i]));
  }
}

function searchFirstName(input, user) {
  return(user.firstname.toLowerCase().includes(input.toLowerCase())); 
}

function searchLastName(input, user) {
  return (user.lastname.toLowerCase().includes(input.toLowerCase()));
}



































//
