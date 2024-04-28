import React, { useContext } from 'react';
import noteContext from '../contextApis/notes/notesContext';
import { useHistory } from 'react-router-dom';
const About = () => {
  const history = useHistory();
  const { user } = useContext(noteContext);
  if (!(localStorage.getItem("token")))
    history.push("/login")
  if (user.length === 0 && localStorage.getItem("token") !== null)
    history.push("/");

  const onClick = ((e) => {
    e.target.classList.add("active");
    setTimeout(() => {
      e.target.classList.remove("active")
    }, 1000)
  })

  return (
    <div>
      <h2 className='m-5'>My Profile</h2>
      <div className='container my-5'>
        {user.length !== 0 ? <div className="list-group container my-5" style={{ width: "60vw" }}>
          <b>NAME
            <button type="button" className={`list-group-item list-group-item-action `} onClick={onClick} style={{ padding: "20px" }}>{user.name.split(" ").map((nm) => { return nm.charAt(0).toUpperCase() + nm.substring(1) }).join(" ")}</button>
            EMAIL
            <input type="button" value={`${user.email}`} className={`list-group-item list-group-item-action`} style={{ padding: "20px" }} onClick={onClick} />
            USING SINCE
            <button type="button" className={`list-group-item list-group-item-action`} style={{ padding: "20px" }} onClick={onClick}>{new Date(user.date).toDateString()}</button>
          </b></div> : ""}
      </div>
    </div>
  );
};

export default About;