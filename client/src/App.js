import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import CreateClientInfo from "./components/create-client-info"
import ClientInfo from "./components/client-info"
import Navbar from "./components/navbar"

function App() {
  return (
     <Router>
     <Navbar />
     <br/>
      <div className="container">
      <Route path="/" exact component={ClientInfo} />
        <Route path="/create" exact component={CreateClientInfo} />
      </div>
    </Router>
  );
}

export default App;
