import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import './index.css';
//import Table from './TableEmpl';
import EmpList from './components/EmpList';
import PickerRimacy from './components/PickerRimacy';
import InputRimacy from './components/InputRimacy';
import MultiSelectRimacy from './components/MultiSelectRimacy';
import CobranzaRimacy from './components/CobranzaRimacy';
import SwitchLabels from './components/SwitchLabels';
import TablePagination from './components/TablePagination';
import TablePedidos from './components/TablePedidos';
import TablePagos from './components/TablePagos';
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}
TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

var DATA = {
    name: 'John Doe',
    imgURL: 'https://loremflickr.com/320/240',
    followerList: ['Follower-1', 'Follower-2', 'Follower-3'],
    //host: 'http://174.138.48.60:8080/rimacy/',
    host:'http://localhost:8080/',
}

class App extends Component{
    state = {
        value: 0,
    };
    handleChange = (event, value) => {
        this.setState({ value });
    };
    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className="App">
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        <Tab label="Crear Zona" />
                        <Tab label="Asignar Ruta" />
                        <Tab label="Zonas" />
                        <Tab label="Pedidos" />
                        <Tab label="Pagos" />

                        {/*}  <Tab label="Item Three" />
                        <Tab label="Item Four" />
                        <Tab label="Item Five" />
                        <Tab label="Item Six" />
                        <Tab label="Item Seven" />*/}
                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>
                    {/*ReactDOM.render(<MultiSelectRimacy/>, document.getElementById('multiRuta'));
                    */}
                    <MultiSelectRimacy hostdata={DATA}/>
                </TabContainer>}
                {value === 1 && <TabContainer>
                    {/*ReactDOM.render(, document.getElementById('cobranza'));</TabContainer>}
                    */}
                    <CobranzaRimacy hostdata={DATA}/>
                </TabContainer>

                }
                {value === 2 && <TabContainer>
                    <TablePagination hostdata={DATA}/>
                </TabContainer>
                }
                {value === 3 && <TabContainer>
                    <TablePedidos hostdata={DATA}/>
                </TabContainer>
                }
                 {value === 4 && <TabContainer>
                     <TablePagos hostdata={DATA}/>
                 </TabContainer>}
                {/*
                 {value === 4 && <TabContainer>Item Five</TabContainer>}
                {value === 5 && <TabContainer>Item Six</TabContainer>}
                {value === 6 && <TabContainer>Item Seven</TabContainer>}*/}
            </div>
        );
    }
}


// after component is finished


//ReactDOM.render(<EmpList />, document.getElementById('empleList'));
//ReactDOM.render(<PickerRimacy />, document.getElementById('pickerdate'));
//ReactDOM.render(<InputRimacy />, document.getElementById('inputZona'));


ReactDOM.render(<App />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();