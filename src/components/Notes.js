import React, { useContext, useEffect, useState } from 'react'
import NoteContext from '../contextApis/notes/notesContext'
import Notesitem from './Notesitem';
import { useHistory } from 'react-router-dom';

function Notes(props) {

    const { notes, allnotes, user, editnotes, fetchDetails } = useContext(NoteContext); //state n setState r sent to minor compoenents so as to setState at any time 
    const history = useHistory();
    const { setedit } = props;
    const [show, setshow] = useState(false)
    const [note, setnote] = useState({ title: "", description: "", tag: "" });

    // eslint-disable-next-line 
    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchDetails();
            allnotes();
        }
        else
            history.push("/login");
    }, [])

    const onChange = ((e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    })
    const onclick = (e) => {
        e.preventDefault();
        editnotes(note._id, note.title, note.description, note.tag)
        setshow(false)
        setedit(true)

    }
    const editNotes = (note) => {
        setnote(note);
        setshow(true);
        setedit(false)
    }
    return (
        <>
            <div className='row m-2'>
                <h3 className='mb-3'>{user.name ? user.name.substring(0, 1).toUpperCase() + user.name.substring(1).split(" ")[0] : ""}'s Notes</h3>
                {notes.length === 0 ? <h6 style={{ color: "grey" }}> "No Notes! Add New Notes below" </h6> : notes.map((note) => {
                    return <Notesitem key={note._id} name={note._id} noteEach={note} edit={editNotes} /> //using variable as props to itmes component
                })}
                {show && <form>
                    <div className="mb-3 ">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" name="title" className="form-control" value={note.title} id="title" onInput={onChange} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea name="description" id="description" className="form-control" value={note.description} onInput={onChange} />
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault"></label>
                    </div>
                    <input type="button" value="Submit" className='btn btn-danger my-3 ' onClick={onclick} />
                </form>}
            </div>
        </>
    )
}
export default Notes;