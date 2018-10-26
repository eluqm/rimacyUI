import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
//import Table from './TableEmpl';
import EmpList from './components/EmpList';
import PickerRimacy from './components/PickerRimacy';
import InputRimacy from './components/InputRimacy';
import MultiSelectRimacy from './components/MultiSelectRimacy';
import CobranzaRimacy from './components/CobranzaRimacy';

class App extends Component{
    render() {
        return (
            <div className="App">
                <h1>Crear Zona</h1>

            </div>
        );
    }
}


// after component is finished


//ReactDOM.render(<EmpList />, document.getElementById('empleList'));
//ReactDOM.render(<PickerRimacy />, document.getElementById('pickerdate'));
//ReactDOM.render(<InputRimacy />, document.getElementById('inputZona'));
ReactDOM.render(<MultiSelectRimacy />, document.getElementById('multiRuta'));
ReactDOM.render(<CobranzaRimacy />, document.getElementById('cobranza'));
ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
