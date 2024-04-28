import './App.css';
import NoteState from './contextApis/notes/notesState';
import About from './components/about';
import Navbar from './components/navbar';
import Home from './components/Home';
import Login from './components/login';
import Signup from './components/signup';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
    <>
    <NoteState>
      <Router>
      <Navbar/>
      <Switch>
          <Route exact path="/">
            <Home /></Route>
          <Route exact path="/about">
            <About/>
          </Route> 
          <Route exact path="/login">
            <Login />
          </Route> 
          <Route exact path="/signup">
            <Signup/>
          </Route>
        </Switch>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
