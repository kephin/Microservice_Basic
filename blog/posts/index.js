const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const PORT = 4000

const posts = [
  { id: 1, title: 'first post' },
  { id: 2, title: 'second post' }
]

app.post('/posts', async (req, res) => {
  const id = randomBytes(6).toString('hex')
  const newPost = { id, title: req.body.title }
  posts.push(newPost)

  await axios.post('http://localhost:4005/events', {
    type: 'PostCreated',
    data: newPost
  })

  res.status(201).send(newPost)
})

app.get('/posts', (req, res) => {
  res.status(200).send(posts)
})

app.post('/events', (req, res) => {
  console.log('====================================');
  console.log(req.body);
  console.log('====================================');
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
