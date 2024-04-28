import React,{useContext, useState} from 'react'
import NoteContext from '../contextApis/notes/notesContext';

function AddNotes() {

    const { addnotes } = useContext(NoteContext); //state n setState r sent to minor compoenents so as to setState at any time 
    const [note, setnote] = useState({title:" ",description:" ",tag:" "})
    
    const onHandleClick=(e)=>{
        e.preventDefault();
        addnotes(note.title, note.description, note.tag); //function call from one component to another
        setnote({title:" ",description:" ",tag:" "})
        console.log(note);

    }
    const onChange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <form onSubmit={onHandleClick}>
                <div className="mb-3 my-3 mx-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" name= "title" className="form-control in1" value={note?note.title:" "} onInput={onChange} id="title" minLength={3} required />
                </div>
                <div className='m-3'>
                    <label htmlFor="description" className="form-label">Description</label>
                   <textarea name="description" id="description" className="form-control in2" value={note?note.description:" "} onInput={onChange} minLength={5} required  />
                </div>
                <div className="form-check m-3">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault"></label>
                </div>
                <input type="submit" id="submitadd" className='btn btn-danger m-3'/>
            </form>
        </div>
    )
}

export default AddNotes