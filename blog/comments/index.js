const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = 4001

const commentsByPostId = {}

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(6).toString('hex')
  const newComment = { id: commentId, content: req.body.content }
  const comments = commentsByPostId[req.params.id] || []
  comments.push(newComment)
  commentsByPostId[req.params.id] = comments
  res.status(201).send(comments)
})

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || [])
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
