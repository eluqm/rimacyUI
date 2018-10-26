import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
//import 'typeface-roboto';
class App extends Component {
    // default State object
    state = {
        contacts: []
    };
    componentDidMount() {
        axios
            .get("http://localhost:8181/v1/allempl")
            .then(response => {

                // create an array of contacts only with relevant data
                const newContacts = response.data.map(c => {
                    return {
                        id: c.ID,
                        name: c.Nombre
                    };
                });

                // create a new "State" object without mutating
                // the original State object.
                const newState = Object.assign({}, this.state, {
                    contacts: newContacts
                });

                // store the new state object in the component's state
                this.setState(newState);
            })
            .catch(error => console.log(error));
    }
    render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> Rimacy.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
            <ContactList contacts={this.state.contacts} />
        </header>
      </div>
    );
  }
}

export default App;
