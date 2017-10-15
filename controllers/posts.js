var Post = require('../models/post');

module.exports = function(app) {

  // NEW
  app.get('/posts/new', function(req, res) {
    res.render('posts-new', {})
  })

  // CREATE
  app.post('/posts', function(req,res) {
    // INSTANTIATE INSTANCE OF POST MODEL
    var post = new Post(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save(function (err, post) {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

};
