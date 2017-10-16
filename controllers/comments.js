var Comment = require('../models/comment')
var Post = require('../models/post')

module.exports = (app) => {

  // CREATE
  app.post('/posts/:postId/comments', (req, res) => {
    var comment = new Comment(req.body);

    Post.findById(req.params.postId).exec((err, post) => {
      comment.save((err, comment) => {
        post.comments.unshift(comment);
        post.save();

        return res.redirect(`/posts/` + post._id);
      })
    })
  });

}
