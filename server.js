// Declarations
var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();
var bodyParser = require('body-parser');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
  res.render('home', {})
})

app.listen(3000, function () {
  console.log('Reddit Clone App listening on port 3000!')
})
