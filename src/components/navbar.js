import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    let loc = useLocation();
    useEffect(() => {
        console.log(loc.pathname);
    }, [loc]);

    return (
        <div>
            <ul className="nav nav-underline bg-dark border-bottom border-body" data-bs-theme="dark" style={{ height: "7vh" }}>
                <li className="nav-item">
                    <Link to="/" className={`nav-link disabled`} aria-current="page" >I-NoteBook</Link>
                </li>
                <li className="nav-item">
                    <Link to="/" className={`nav-link ${loc.pathname === "/" ? "active" : ""}`} >Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/about" className={`nav-link ${loc.pathname === "/about" ? "active" : ""}`} >About Me</Link>
                </li>
                {
                    localStorage.getItem("token") === null ?
                        <ul className="nav end">
                            <li className="nav-item login " >
                                <Link to="/login" className={`nav-link ${loc.pathname === "/login" ? "active" : ""} mx-3`}  >Login</Link>
                            </li>
                            <li className="nav-item sign">
                                <Link to="/signup" className={`nav-link ${loc.pathname === "/signup" ? "active" : ""}`}  >Singup</Link>
                            </li>
                        </ul> : ""}
            </ul>
        </div >
    )
}

export default Navbar