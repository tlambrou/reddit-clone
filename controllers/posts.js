var Post = require('../models/post')

module.exports = (app) => {

  // NEW
  app.get('/posts/new', (req, res) => {
    res.render('posts-new', {})
  })

  // CREATE
  app.post('/posts/create', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    var post = new Post(req.body)

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      if (err) {
        res.render("error:" + err)
      } else {
        // REDIRECT TO THE ROOT
        res.redirect(`/`)
      }
    })
  })

  // INDEX
  app.get('/', (req, res) => {
    // Look up all posts
    Post.find().exec((err, posts) => {
      if (err) {
        res.render('Whoops something went wrong: \n' + err)
      } else {
        res.render('posts-index', { posts: posts })
      }

    })
  })

  // SHOW
  app.get('/post/:id', (req, res) => {
    const post_id = req.params.id
    // Look up the post
    Post.findById(post_id).exec((err, post) => {
      if (err) {
        // Render the error if it exists
        res.render("Whoops something went wrong: \n" + err)
      } else {
        // Respond by rendering the template
        res.render('post-show', { post: post })
      }
    })
  })
};
