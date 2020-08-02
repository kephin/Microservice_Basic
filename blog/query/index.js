const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const PORT = 4002

const app = express()

app.use(bodyParser.json())
app.use(cors())

const posts = []

app.post('/events', (req, res) => {
  const { type, data } = req.body
  if (type === 'PostCreated') {
    const { id, title } = data
    posts.push({ id, title, comments: [] })
  }
  if (type === 'CommentCreated') {
    const { id, content, postId } = data
    const post = posts.find(p => p.id === postId)
    post.comments.push({ id, content })
  }
  res.status(200)
})

app.get('/posts', (req, res) => {
  res.send(posts)
})

app.listen(PORT, () => console.log(`listening on part ${PORT}`))
