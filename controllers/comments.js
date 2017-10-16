var Comment = require('../models/comment');

module.exports = (app) => {

  // CREATE
  app.post('/posts/:postId/comments', (req, res) => {
    // INSTANTIATE INSTANCE OF MODEL
    var comment = new Comment(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    comment.save((err, comment) => {
      if (err) {
        console.log("error:" + err)
      } else {
        // REDIRECT TO THE ROOT
         return res.redirect(`/`);
      }
    })
  });

}
