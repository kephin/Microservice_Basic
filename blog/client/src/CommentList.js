import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default ({ postId }) => {
  const [comments, setComments] = useState([])
  const fetchComments = async () => {
    const { data } = await axios.get(`http://localhost:4001/posts/${postId}/comments`)
    setComments(data)
  }
  useEffect(() => {
    fetchComments()
  }, [])

  const renderComments = comments.map(comment => (
    <li key={comment.id}>{comment.content}</li>
  ))

  return <ul>{renderComments}</ul>
}
