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
    <section className="App">
      <aside>
        <i className="far fa-address-book"></i>
      </aside>
      <main>
        <header className="scrolltop"/>
        <div className="container px-4 px-xl-3">
          <div className="pb-5">
            <h4 className="mb-4">  <i className="far fa-address-book mr-2"></i> Contacts</h4>
            <div className="row">
              <div className="col-lg-6">
                <ContactList forwardPage={ToDoAction} pageAction={Action} />
              </div>
              <div className="col-lg-6">
                {Action.currentPage ? <ReUseContact forwardPage={ToDoAction} pageAction={Action} /> : null}
              </div>
            </div>
          </div>
        </div>
      </main>

    </section>
  );
}

export default App;
