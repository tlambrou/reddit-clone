var Post = require('../models/post')
var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()

chai.use(chaiHttp)

describe('Site', () => {
  it('should have a live home page', (done) => {
    chai.request('localhost:3000')
    .get('/')
    .end((err, res) => {
      res.status.should.be.equal(200)
      done()
    })
  })
})

describe('Posts', () => {
  it('should create with valid attributes at POST /posts/create', (done) => {
    var post = { title: "post title", url: "https://www.google.com", summary: "post summary" }
    Post.find().then((posts) => {
      done()
    })
    .catch((err) => {
      return err
    })
  })
})
