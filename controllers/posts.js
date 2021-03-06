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
        console.log("error:" + err)
      } else {
        // REDIRECT TO THE ROOT
        return res.redirect(`/`)
      }
    })
  })

  // INDEX
  app.get('/', (req, res) => {
    const user = req.user
    // Look up all posts
    Post.find().then((posts) => {

      res.render('posts-index', { posts: posts, user: user})

    })
  })

  // SUBREDDIT
  app.get('/n/:subreddit', function(req, res) {
    const user = req.user
    Post.find({ subreddit: req.params.subreddit }).exec(function (err, posts) {
      res.render('posts-index', { posts: posts, user: user})
    })
  })

  // SHOW
  app.get('/posts/:id', (req, res) => {
    const user = req.user
    const post_id = req.params.id
    // Look up the post
    Post.findById(post_id).populate('comments').exec((err, post) => {
      if (err) {
        // Render the error if it exists
        res.render("Whoops something went wrong: \n" + err)
      } else {
        // Respond by rendering the template
        res.render('post-show', { post: post, user: user})
      }
    })
  })
}
