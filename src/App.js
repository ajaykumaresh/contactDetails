import { useEffect, useState } from 'react';
import './App.css';
import ContactList from './component/ContactList';
import ReUseContact from './component/ReUseContact';
function App() {
  let [Action,ToDoAction]=useState({
    currentPage:""
  })

  useEffect(()=>{},[Action])
  return (
    <div className="App container">
      <h4>Contact Details</h4>
      <div className="row">
      <div className="col-sm-3 col-md-6">
      <ContactList forwardPage={ToDoAction} pageAction={Action}/>
      </div>
      <div className="col-sm-3 col-md-6"></div>
      {Action.currentPage?<ReUseContact forwardPage={ToDoAction} pageAction={Action}/> :null}
      </div>
    </div>
  );
}

export default App;
