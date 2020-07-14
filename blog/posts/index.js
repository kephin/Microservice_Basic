const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = 4000

const posts = [
  { id: 1, title: 'first post' },
  { id: 2, title: 'second post' }
]

app.post('/posts', (req, res) => {
  const id = randomBytes(6).toString('hex')
  const newPost = { id, title: req.body.title }
  posts.push(newPost)
  res.status(201).send(newPost)
})

app.get('/posts', (req, res) => {
  res.status(200).send(posts)
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
