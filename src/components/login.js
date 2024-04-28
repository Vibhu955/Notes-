import React from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Toast from './Toast';
import './icon.css';
import Loading from './loading';

function Login() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [typee, settypee] = useState("password")
  const [eyee, seteyee] = useState("fa-regular fa-eye");
  const [show, setshow] = useState("");
  const [link, setlink] = useState(false);

  const onIconClick = () => {
    if (eyee === "fa-solid fa-eye-slash") {
      seteyee("fa-regular fa-eye");
      settypee("password");
    }
    else {
      seteyee("fa-solid fa-eye-slash");
      settypee("text");
    }
  }

  const OnClick2 = async (e) => {
    localStorage.removeItem("token");
    history.push("/signup");
  }

  const OnClick = async (e) => {
    e.preventDefault();
    setOpen(true);
    setProgress(progress + 10);

    const promise = await fetch("http://localhost:3005/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    });
    const data = await promise.json();

    setProgress(progress + 20);

    //Toasts or MODALS
    if (data.success) {
      setlink(false)
      setshow("Loggedin Successfully!!!")
      setProgress(50);
      setTimeout(() => {
        setProgress(70);
      }, 1000);
      setTimeout(() => {
        setProgress(100);
      }, 2000);
      localStorage.setItem("token", data.token);
      setTimeout(() => {
        history.push('/');
      }, 2500);
    }
    else {
      setProgress(100);
      if (data.link) {
        setlink(true);
        setshow("Account isn't created!!");
      }
      else {
        setlink(false)
        setshow(data.error);
      }
    }
  }
  const onChangeemail = (e) => {
    setemail(e.target.value);
  }
  const onChangepass = (e) => {
    setpassword(e.target.value);
  }
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Toast isOpen={open} onClose={handleClose}>
        <>
          <div className='header'>
            <button type="button" className="btn-close" ></button>
          </div>
          <hr />
          <h5 className='msg'>{show}
            {link === true ? <p style={{ fontSize: "smaller" }}><Link to="/signup">Create account </Link></p> : ""}
          </h5>
        </>
      </Toast>
      <h1 className='m-5'>Login here!</h1>
      <div className='form container' style={{
        border: "1px solid black",
        marginTop: "5vh",
        width: "50vw",
        height: "50vh",
        display: "flex",
        flexDirection: "column",
      }}>
        <form onSubmit={OnClick}>
          <Loading setProgress={setProgress} progress={progress} />
          <div className="my-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" value={email} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={onChangeemail} />
          </div>
          <div>
            <label htmlFor="inputPassword5" className="form-label">Password</label>
            <div className='icons'>
              <input type={`${typee}`} id="inputPassword5" value={password} placeholder="Password" className="form-control pass" onChange={onChangepass} />
              <i className={`${eyee}`} onClick={onIconClick}></i>
            </div>
          </div>
          <div className='mt-3'><Link to="#" style={{ fontSize: "small" }}>Forgot Password?</Link></div>
          <div className="my-2">
            <input type="checkbox" id="remember" className='remember' />
            <label htmlFor="remember" style={{ fontSize: "small" }}>Remember me?</label>
          </div>
          <button type='submit' className="btn btn-dark my-3 " style={{ height: "7vh", width: "10vw", position: "absolute", top: "65vh", left: "35vw" }}>Login</button>
          <button type="submit" onClick={OnClick2} className="btn btn-dark my-3 " style={{ height: "7vh", width: "10vw", position: "absolute", top: "65vh", left: "55vw" }}>
            {localStorage.getItem("token") === null ? "SignUp" : "SignOut "}</button>
          {localStorage.getItem("token") === null ? <div className='arrow'>&#8606;</div> : ""}
        </form>

      </div>
    </div>

  )
}
export default Login