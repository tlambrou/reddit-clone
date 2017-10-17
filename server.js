// Declarations
var express = require('express')
var exphbs  = require('express-handlebars')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var express = require('express')
var cookieParser = require('cookie-parser')
var app = express()

app.use(cookieParser())
mongoose.connect('mongodb://localhost/reddit-clone')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Auth middleware
var checkAuth = function (req, res, next) {
  console.log("Checking authentication");

  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
   req.user = null;
 } else {
   const token = req.cookies.nToken;
   const decodedToken = jwt.decode(token, { complete: true }) || {};
   req.user = decodedToken.payload;
 }
 next();
}
app.use(checkAuth)

require('./controllers/posts.js')(app)
require('./controllers/comments.js')(app)
require('./controllers/auth.js')(app)

app.listen(3000, function () {
  console.log('Reddit Clone App listening on port 3000!')
})
