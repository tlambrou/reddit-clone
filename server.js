// Declarations
var express = require('express')
var exphbs  = require('express-handlebars')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/reddit-clone')
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./controllers/posts.js')(app)
require('./controllers/comments.js')(app)

app.listen(3000, function () {
  console.log('Reddit Clone App listening on port 3000!')
})
