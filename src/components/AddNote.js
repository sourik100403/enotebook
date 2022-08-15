import React, { useState,useContext } from 'react';
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote]=useState({title:"",description:"",tag:""})

    const handelClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("New Note Add Successfully",'success');
    }

    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }
  return (
    <div className="container my-3">
    <h1>Add a Note</h1>
    <form>
      <div className="form-group my-2">
        <label htmlFor="title">Title</label>
        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" placeholder="Enter title here" value={note.title}  onChange={onChange} minLength={5} required/>
      </div>
      <div className="form-group my-2">
        <label htmlFor="description">Description</label>
        <input type="text" className="form-control" id="description" name="description" placeholder="Enter your Description Here" value={note.description} onChange={onChange} minLength={5} required/>
      </div>
      <div className="form-group my-2">
        <label htmlFor="tag">Tag</label>
        <input type="text" className="form-control" id="tag" name="tag" placeholder="Enter your Note Tag Here" value={note.tag} onChange={onChange} minLength={5} required/>
      </div>
      <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handelClick}>Add Note</button>
    </form>
  </div>
  )
}

export default AddNote
