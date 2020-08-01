const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = 4001

const commentsByPostId = {}

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(6).toString('hex')
  const newComment = { id: commentId, content: req.body.content }
  const comments = commentsByPostId[req.params.id] || []
  comments.push(newComment)
  commentsByPostId[req.params.id] = comments

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      ...newComment,
      postId: req.params.id
    }
  })

  res.status(201).send(comments)
})

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.post('/events', (req, res) => {
  console.log('====================================');
  console.log(req.body);
  console.log('====================================');
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
