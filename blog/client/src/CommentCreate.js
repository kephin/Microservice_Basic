import React, { useState } from 'react'
import axios from 'axios'

export default ({ postId }) => {
  const [content, setContent] = useState('')
  const handleOnSubmit = async event => {
    event.preventDefault()
    await axios.post(`http://localhost:4001/posts/${postId}/comments`, { content })
    setContent('')
  }
  return <div>
    <form onSubmit={handleOnSubmit}>
      <div className="form-group">
        <label htmlFor="input">New Comment</label>
        <input
          type="text"
          className="form-control"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  </div>
}
