var User = require('../models/user')

module.exports = (app) => {

  // SIGN UP FORM
  app.get('/sign-up', (req, res, next) => {
    res.render('sign-up')
  })

  // SIGN UP POST
  app.post('/sign-up', (req, res, next) => {
    var data = { username: req.body.username, password: req.body.password }
    // Create User and JWT
    console.log(data)
    var user = new User(data)
    user.save((err, user) => {
      console.log(err)
      console.log(user)
      if (err) {
        // return res.status(400).send({ err: err })
        console.log("error:" + err)
      }

      return res.redirect('/')
    })
  })

}
