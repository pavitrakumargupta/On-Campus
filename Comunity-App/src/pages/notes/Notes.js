import React from 'react'
import "./Notes.css"
import { useNavigate } from 'react-router-dom'
const Notes = () => {
  const uploadImage="https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png"
  return (
    <div className='notesPage'>
     <div className="card">
      <div className="card-header">Upload Notes</div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" id="description" />
          </div>
          <div className="form-group">
            <label htmlFor="file">File</label>
            <input type="file" id="file" />
          </div>
          <button className="btn">Upload</button>
        </form>
      </div>
    </div>

    <div className="card">
      <div className="card-header">Get Notes</div>
      <div className="card-body">
        <form>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" />
          </div>
          <div className="form-group">
            <label htmlFor="branch">Branch</label>
            <input type="text" id="branch" />
          </div>
          <div className="form-group">
            <label htmlFor="semester">Semester</label>
            <input type="text" id="semester" />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title (optional)</label>
            <input type="text" id="title" />
          </div>
          <button className="btn">Get</button>
        </form>
      </div>
    </div>
 
    </div>
  )
}

export default Notes