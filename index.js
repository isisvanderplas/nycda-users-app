const express = require('express'),
      morgan = require('morgan'),
      fs = require('fs'),
      bodyParser = require('body-parser');
      pug = require('pug');


var app = express();

var userStore = JSON.parse(fs.readFileSync('users.json'));

app.use(bodyParser.urlencoded());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index', { users: userStore });
});

app.get('/search', (req, res) => {
  res.render('searchform');
});

app.post('/search', (req, res) => {
  console.log(req.body);
  res.redirect('/search/' + req.body.query);
});

app.get('/search/*', (req, res) => {
  console.log(req.params[0]);
  // make actual search here
  var results = searchUsers(req.params[0]);
  res.render('search-result', { results : results });
});



app.listen(3000, () => {
  console.log('app runing on port 3000');
});

function searchUsers(input) {
  var results = [];
  for(i = 0; i < userStore.length; i++) {
    if (includesFirstName(input, userStore[i]) || includesLastName(input, userStore[i]) || includesEmail(input, userStore[i])) {
      results.push(userStore[i]);
    }
  }
  return results;
}

function includesFirstName(input, user) {
    return user.firstname.toLowerCase().includes(input.toLowerCase());
  }


function includesLastName(input, user) {
    return user.lastname.toLowerCase().includes(input.toLowerCase());
  }

function includesEmail(input, user) {
    return user.email.toLowerCase().includes(input.toLowerCase());
}



























































// const express = require('express'),
//       morgan = require('morgan'),
//       bodyParser = require('body-parser'),
//       pug = require('pug'),
//       fs = require('fs');
//
// var app = express(),
//     userStore = JSON.parse(fs.readFileSync('users.json'));
//
// app.use(morgan('dev'));
//
// app.use(bodyParser.urlencoded({ extended: false }));
//
// app.set('view engine', 'pug');
//
// app.get('/', (request, response) => {
//   response.render('index', { users: userStore });
// });
//
// app.get('/search', (request, response) => {
//   response.render('searchform');
// });
//
// app.post('/search', (request, response) => {
//   response.redirect('/search/' + request.body.query);
// });
//
// app.get('/search/*', (request, response) => {
//   var results = searchUsers(request.params[0]);
//
//   response.render('search-result', { results: results });
// });
//
//
// app.listen(3000, () => {
//   console.log('Web Server is running on port 3000');
// });
//
//
// function searchUsers(input) {
//   var results = [];
//
//   for (i = 0; i < userStore.length; i++) {
//     if (searchFirstName(input, userStore[i]) || searchLastName(input, userStore[i])) {
//       results.push(userStore[i]);
//     }
//   }
//
//   return results;
// }
//
//
// function searchFirstName(input, user) {
//   return user.firstname.toLowerCase().includes(input.toLowerCase());
// }
//
// function searchLastName(input, user) {
//   return user.lastname.toLowerCase().includes(input.toLowerCase());
// }
//
































//
