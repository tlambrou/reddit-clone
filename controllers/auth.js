const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (app) => {

  // Logout
  app.get('/logout', (req, res, next) => {
    // Clear the cookie and redirect to root
    res.clearCookie('nToken');
    res.redirect('/');
  })

  // Login - show login form
  app.get('/login', (req, res, next) => {
    res.render('login', {
      bodyClass: "login",
      pageTitle: "Log in"
    });
  })

  // Login - submit/handle log in
  app.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    // Find this user name
    User.findOne({ username }, 'username password').then((user) => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: 'Wrong Username or Password' });
      }
      // Check the password
      user.comparePassword(password, (err, isMatch) => {
        if (!isMatch) {
          // Password does not match
          return res.status(401).send({ message: "Wrong Username or password"});
        }
        // Create a token
        const token = jwt.sign(
          { _id: user._id, username: user.username }, process.env.SECRET,
          { expiresIn: "60 days" }
        );
        // Set a cookie and redirect to root
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.redirect('/');
      });
    }).catch((err) => {
      console.log(err);
    });
  })

  // Sign up - show sign-up form
  app.get('/sign-up', (req, res) => {
    res.render('sign-up', {
      bodyClass: "sign-up",
      pageTitle: "Sign Up"
    });
  })

  // Sign up - handle sign up
  app.post('/sign-up', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const postPasswordConfirm = req.body.confirmation;

    // Check password confirmation
    if (password !== postPasswordConfirm) {
      // Passwords don't match
      res.redirect('/sign-up');
    }

    // Create a new user
    const user = new User({
      username,
      password
    });

    // Save the user
    user.save().then((user) => {
      // Create a new jwt token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: "60 days"
      });
      // Set a cookie
      res.cookie('nToken', token, { maxAge: 100000, httpOnly: true });
      // Redirect to root
      res.redirect('/');
    }).catch((err) => {
      console.log("Sign up error: " + err);
      res.status(400).send({ err });
    });
  })

}
