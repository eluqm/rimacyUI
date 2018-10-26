import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';




const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
        maxWidth: 300,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    noLabel: {
        marginTop: theme.spacing.unit * 3,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },

});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
/*
let names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];*/
let names =[""];
let names1=[];
function getStyles(name, that) {
    return {
        fontWeight:
            that.state.name.indexOf(name) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}

class MultipleSelectRimacy extends React.Component {
    state = {
        name: [],
        nameObject:[],

            nameInput: '',


       // names:[]
    };


    handleChange = event => {
        this.setState({ name: event.target.value});
        this.setState({nameObject:event.target.value});
    };
    componentDidMount() {
        console.log('El componente está disponible en el DOM');
        fetch("http://localhost:8181/v1/allrutas")
            .then((response) => {
                return response.json();
            }).then(data => {
            console.log(data.data[1]);
           // names= data.data;
           names1 = data.data.map(team => { return {value:team[0],display: team[1],name_ruta:team[3]} })
            names=names1
            console.log("names data");
            console.log(names);
           //names=data.data.map(team => { return {val:team[0]}});
          //this.setState({ name: names1 });
            //this.setState({name: [""].concat(names1)});
        }).catch(error => {
            console.log(error);
        });
    }

    handleClick = event => {
        this.setState({nameObject:event.target.value});
        console.log(this.state.nameObject);
        console.log(this.state.nameInput);
        fetch("http://localhost:8181/v1/addzona", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },

        //    mode:'no-cors',

            body:JSON.stringify([ {

                "denominacion": this.state.nameInput,
                "rutas":this.state.nameObject,
            }])
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
        /*fetch("http://localhost:8181/v1/getRutabyEmpl/"+this.state.selectedTeam)
            .then((response)=>{
                return response.json();
            }).then(data=> {
            this.subComponentTable(data.data)
            console.log(data.data)
        })*/

    }
    handleChangeInput = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>



                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="outlined-name"
                        label="Nombre Zona"
                        className={classes.textField}
                        value={this.state.nameInput}
                        onChange={this.handleChangeInput('nameInput')}
                        margin="normal"
                        variant="outlined"
                    />
                </form>

                <FormControl className={classes.formControl}>

                    <InputLabel htmlFor="select-multiple-chip">Rutas</InputLabel>
                    <Select
                        multiple

                        value={this.state.name}
                        onChange={this.handleChange}

                        input={<Input id="select-multiple-chip" />}
                        renderValue={selected => (
                            <div className={classes.chips}>
                                {selected.map(value => (
                                    <Chip key={value} label={value} className={classes.chip} />
                                ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                    >

                        {names.map(name => (
                            <MenuItem key={name.value} value={name.value} style={getStyles(name.display, this)}>
                                {name.display+"   "+name.name_ruta}
                            </MenuItem>
                        ))}
                    </Select>
                    {/*<div className>
                        Selected Values: {JSON.stringify(this.state.nameObject)}
                    </div>*/}
                    <Button variant="outlined" onClick={this.handleClick} color="primary" className={classes.button}>
                        Crear Zona

                    </Button>
                </FormControl>

            </div>
        );
    }
}

MultipleSelectRimacy.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelectRimacy);