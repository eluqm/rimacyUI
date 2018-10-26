import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


class EmpList extends Component {

        state = {
            empls: [],
            selectedTeam: "",
            validationError: ""
        }
        handleClick = this.handleClick.bind(this)
        handleClick () {
        console.log(this.state.selectedTeam);
            fetch("http://localhost:8181/v1/getRutabyEmpl/"+this.state.selectedTeam)
                .then((response)=>{
                    return response.json();
                }).then(data=> {
                    this.subComponentTable(data.data)
                    console.log(data.data)
            })

        }
        subComponentTable(data) {
            return (<div>Hello World</div>);
        }
        componentDidMount() {
            fetch("http://localhost:8181/v1/allempl")
                .then((response) => {
                    return response.json();
                }).then(data => {
            console.log(data.data[0]);
            let teamsFromApi = data.data.map(team => { return {value: team[0], display: team[1]} })
            console.log(teamsFromApi);
            this.setState({ empls: [{value: '', display: '(Selecciona Empleado)'}].concat(teamsFromApi) });
        }).catch(error => {
            console.log(error);
        });
    }
    render() {
        return (
            <div>
                <select value={this.state.selectedTeam}
                        onChange={(e) => this.setState({selectedTeam: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : ""})}>
                    {this.state.empls.map((team) => <option key={team.value} value={team.value}>{team.display}</option>)}
                </select>
                <div style={{color: 'red', marginTop: '5px'}}>
                    {this.state.validationError}
                </div>
                <div className='button__container'>

                    <button className='button' onClick={this.handleClick}>crear Zona</button>
                    <p>{this.state.selectedTeam}</p>
                </div>
            </div>

        )
    }
}
// after component is finished
export default EmpList;


