import React from 'react'

function Notesitem(props) {
    const { noteEach, edit } = props;

    const onClick = (e) => {
        edit(noteEach);
    }

    return (
        <div className='col-4 my-2' style={{ width: "30vw" }}>
            <div className="card">
                <div className="card-body" style={{ fontSize: "small" }}>
                    <h5 className="card-title" style={{ fontSize: "1.1rem" }}>{noteEach.title}</h5>
                    <p className="card-text">{noteEach.description}.</p>
                    <i className="fa-regular fa-pen-to-square m-2" id={props.name} onClick={onClick}></i>
                </div>
            </div>
        </div>
    )
}
export default Notesitem;