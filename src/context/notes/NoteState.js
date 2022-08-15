import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host="http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)


  //get all notesnote
  const getNotes=async ()=>{
    //api call for fetch all note
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json=await response.json();
    console.log(json);
    setNotes(json)
  }




  //ADD a note
  const addNote=async (title,description,tag)=>{
    //api call for adding note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }



  //delete a anote
  const deleteNote=async (id)=>{
    //api call for delete note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const json= response.json(); // parses JSON response into native JavaScript objects
    console.log(json);
  
    //logic to delete note
    console.log("delete note with id"+id)
    const newNotes=notes.filter((note)=>{
     return note._id!==id
    })
    setNotes(newNotes);
  }



  //edit a note
  const editNote= async (id,title,description,tag)=>{
    //api call for edit
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    const json=await response.json(); // parses JSON response into native JavaScript objects
    console.log(json)



let newNotes=JSON.parse(JSON.stringify(notes))
// let newNotes=notes.slice() 
    //logic to edit
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if(element._id===id){
        newNotes[index].title=title;
        newNotes[index].description=description;
        newNotes[index].tag=tag;
        break;
      }
    }
    setNotes(newNotes) 
  }




  return (
  <NoteContext.Provider value={{ notes,addNote,deleteNote,editNote,getNotes}}>
    {props.children}
  </NoteContext.Provider>
  )
}

export default NoteState