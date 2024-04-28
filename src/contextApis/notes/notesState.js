import React, { useState } from "react";
import noteContext from "./notesContext";

const NoteState = (props) => {

  const host = "http://localhost:3005";
  const notesAll = []
  const users = []
  const [notes, setNotes] = useState(notesAll);
  const [user, setuser] = useState(users);

  //ALL NOTES------------------
  const allnotes = async () => {
    //APi
    const data = await (await fetch(`${host}/api/notes/allnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      }
    })).json();
    setNotes(data);
    // result.then((data)=>{
    //   console.log(data);
    //   //  setNotes(data);
    // }).catch((e)=>console.log(e))
  }

  //ADD NOTES-------------------
  const addnotes = async (title, description, tag) => {
    //APi
    const promise = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    });
    const data = await promise.json();
    setNotes(notes.concat(data))
  }

  //DELETE NOTES---------------------
  const deletenotes = (id) => {
    setNotes(notes.filter((note) => { return note._id !== id }));
  }

  //UPDATE NOTES-------------------
  const editnotes = async (id, title, description, tag) => {
    //API
    const data = await (await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag })
    })).json();

    let New = JSON.parse(JSON.stringify(notes));
    for (let i = 0; i < New.length; i++) {
      if (New[i]._id === id) {
        New[i].title = title;
        New[i].description = description;
        New[i].tag = tag;
        break;
      }
    }
    setNotes(New);
  }

  //userdetails---------------
  const fetchDetails = async () => {
    //APi
    const data = await (await fetch(`${host}/api/auth/details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token")
      }
    })).json();
    setuser(data);
  }
  return (
    <noteContext.Provider value={{ notes, user, addnotes, deletenotes, allnotes, editnotes, fetchDetails }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState;