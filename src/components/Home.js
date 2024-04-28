import React, { useState } from 'react'
import Notes from './Notes'
import AddNotes from './AddNotes'
import { useHistory } from 'react-router-dom'

function Home() {
  const [edit, setedit] = useState(true)
  const history = useHistory();
  const onHandleClick = () => {
    localStorage.removeItem("token");
    history.push("/login");
  }
  return (
    <div>
      <Notes edit={edit} setedit={setedit} />
      <h4 className='m-2 mt-4'>{edit ? "Add" : "Edit"} Notes here {edit ? <>&darr;</> : <>&uarr;</>} </h4 >
      <button className='btn btn-secondary btn-lg' style={{
        position: "fixed",
        right: "1vw",
        bottom: "20vh"
      }} onClick={onHandleClick}>Logout</button>
      {edit && <AddNotes />}
    </div>
  )
}
export default Home;