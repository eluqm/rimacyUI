import React from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import FormControlLabel from '@material-ui/core/FormControlLabel';

import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
//import Globals from './Globals';

const styles = theme=>({

    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,

    },
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

let names = [
    'lunes',
    'martes',
    'miercoles',
    'jueves',
    'viernes',

];
const options = [
    '',
    '7 dias',
    '15 dias',

];
function getStyles(name, that) {
    return {
        fontWeight:
            that.state.name.indexOf(name) === -1
                ? that.props.theme.typography.fontWeightRegular
                : that.props.theme.typography.fontWeightMedium,
    };
}
class CobranzaRimacy extends React.Component {
    state = {
        date : new Date("2017-05-24"),
        auth: true,
        anchorEl: null,
        empls: [],
        selectedTeam: "",
        validationError: "",
        _zona:[],
        _selectedZona : "",
        _anchorEl: null,
        _selectedIndex: 1,
        labelWidth: 0,
        _week: true,
        _monthly: false,
        checkedA:true,
        checkedB:true,
        commentInput: '',
        pickerInput:'',
        valueday:0,
        _lunes:false,
        _martes:false,
        _miercoles:false,
        _jueves:false,
        _viernes:false,
        _totaldaysvalue:1,
        hostname:"",
        //antoine: true,
    };
//menu list
    //-------------------------------------------------------------
    handleClickListItem = event => {
        this.setState({ _anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, index) => {
        this.setState({ _selectedIndex: index, _anchorEl: null });
    };

    handleCloses = () => {
        this.setState({ _anchorEl: null });
    };

//.----------------------------------------------------

    handleChange = event => {
        this.setState({ auth: event.target.checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

   // handleClick = this.handleClick.bind(this);

    handleClick = event =>{
        //console.log(this.state.selectedTeam);
        //fetch("http://localhost:8181/v1/getRutabyEmpl/"+this.state.selectedTeam)
        //    .then((response)=>{
        //        return response.json();
        //    }).then(data=> {
        //    this.subComponentTable(data.data)
        //    console.log(data.data)
        //}
        //)

        fetch(this.props.hostdata.host+"v1/addcobranza", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },

            //    mode:'no-cors',

            body:JSON.stringify( {

                "dias": this.state._totaldaysvalue,
                "fecha_init":this.state.pickerInput,
                "frecuencia_week":this.state._week,
                "frecuencia_month":this.state._monthly,
                "id_empleado" :this.state.selectedTeam,
                "id_zona" :this.state._selectedZona,
                "comentario":this.state.commentInput,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
        console.log("button data")
        console.log(this.state.commentInput);
        console.log(this.state._totaldaysvalue);
        console.log("semanal: "+this.state._week);
        console.log("mensual:" +this.state._monthly);
        console.log("id_zona:" +this.state._selectedZona);
        console.log("id_empleado" +this.state.selectedTeam);
        console.log("fecha:" +this.state.pickerInput);
        // console.log(data.data)
       // console.log(data.data)
       // console.log(data.data)


    }

    handleChangeFreq = xstate => event => {
        this.setState({ [xstate[0]]: event.target.checked });
        this.setState({ [xstate[1]]: !event.target.checked });

    };
    handleChangeInput = commnent => event => {
        this.setState({
            [commnent]: event.target.value,
        });
    };
    handleChangePickerInput = pickers => event => {
        this.setState({
           [pickers]: event.target.value,
        });
    }

    handleChangeWeek = name => event => {
        this.setState({ [name]: event.target.checked });
        console.log(event.target.checked);
        console.log(event.target.value);
        if(event.target.checked==true)
        {
            this.setState({_totaldaysvalue:this.state._totaldaysvalue*parseInt(event.target.value)})
        }else{this.setState({_totaldaysvalue:this.state._totaldaysvalue/parseInt(event.target.value)})}
        //console.log(event.target.value);
        //console.log(event.target.checked);

    };

    componentDidMount() {

        console.log(this.props.hostdata.host+"v1/allempl")
        fetch(this.props.hostdata.host+"v1/allempl")
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
       // labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWid
        fetch(this.props.hostdata.host+"v1/allzones")
            .then((response) => {
                return response.json();
            }).then(data => {
            console.log(data.data[0]);
            let teamsFromApi = data.data.map(team => { return {value: team[0], display: team[1]} })
            console.log(teamsFromApi);
            this.setState({ _zona: [{value: '', display: '(Selecciona Zona)'}].concat(teamsFromApi) });
        }).catch(error => {
            console.log(error);
        });

    }

    render() {


        const { classes } = this.props;
        const { _anchorEl } = this.state;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (


            <div>
                <Paper className={classes.root} elevation={1}>





                    <FormControl variant="outlined" className={classes.formControl}>

                            <InputLabel htmlFor="filled-age-simple">Empleado</InputLabel>
                            <Select value={this.state.selectedTeam}
                                    onChange={(e) => this.setState({selectedTeam: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : ""})}>
                                {this.state.empls.map((team) => <MenuItem key={team.value} value={team.value}>{team.display}</MenuItem>)}
                                input={<FilledInput name="Seleccione Nombre" id="filled-age-simple" />}
                            </Select>
                    </FormControl>
                </Paper>
                <Paper className={classes.root} elevation={2}>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="date"
                            label="Frecuencia"
                            type="date"
                            defaultValue= {new Date("yyyy-MM-dd")}

                            className={classes.textField}
                            value={this.state.pickerInput}
                            onChange={this.handleChangePickerInput('pickerInput')}
                            InputLabelProps={{
                            shrink: true,
                        }}
                        />
                    </form>
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state._week}
                                    onChange={this.handleChangeFreq(['_week','_monthly'])}
                                    value="_week"
                                />
                            }
                            label="semanal"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state._monthly}
                                    onChange={this.handleChangeFreq(['_monthly','_week'])}
                                    value="_monthly"
                                    //color="Secondary"
                                />
                            }
                            label="quincenal"
                        />

                    </FormGroup>


                    {/*<List component="nav">
                            <ListItem
                                button
                                aria-haspopup="true"
                                aria-controls="lock-menu"
                                aria-label="Seleccione Frecuencia"
                                onClick={this.handleClickListItem}
                            >
                                <ListItemText
                                    primary="Seleccione Frecuencia"
                                    secondary={options[this.state._selectedIndex]}
                                />
                            </ListItem>
                        </List>
                        <Menu
                            id="lock-menu"
                            anchorEl={_anchorEl}
                            open={Boolean(_anchorEl)}
                            onClose={this.handleCloses}
                        >
                            {options.map((option, index) => (
                                <MenuItem
                                    key={option}
                                    disabled={index === 0}
                                    selected={index === this.state._selectedIndex}
                                    onClick={event => this.handleMenuItemClick(event, index)}
                                >
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>*/}




                        <FormControl variant="outlined" className={classes.formControl}>

                            <InputLabel
                                ref={ref => {
                                    this.InputLabelRef = ref;
                                }}
                                htmlFor="outlined-age-simple"
                            >
                                Zona
                            </InputLabel>
                            <Select value={this.state._selectedZona}
                                onChange={(e) => this.setState({_selectedZona: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : ""})}>
                                {this.state._zona.map((team) => <MenuItem key={team.value} value={team.value}>{team.display}</MenuItem>)}
                                input={
                                    <OutlinedInput
                                        labelWidth={this.state.labelWidth}
                                        name="Zona"
                                        id="outlined-age-simple"
                                    />}
                            </Select>

                        </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Dias</FormLabel>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state._lunes}
                                    onChange={this.handleChangeWeek('_lunes')}
                                    value='3'
                                />
                            }
                            label="Lunes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state._martes}
                                    onChange={this.handleChangeWeek('_martes')}
                                    value='5'
                                />
                            }
                            label="Martes"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state._miercoles}
                                    onChange={this.handleChangeWeek('_miercoles')}
                                    value='7'
                                />
                            }
                            label="Miercoles"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state._jueves}
                                    onChange={this.handleChangeWeek('_jueves')}
                                    value='11'
                                />
                            }
                            label="Jueves"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={this.state._viernes}
                                    onChange={this.handleChangeWeek('_viernes')}
                                    value='13'
                                />
                            }
                            label="Viernes"
                        />



                    </FormControl>
                </Paper>
                <Paper className={classes.root} elevation={1}>
                        <TextField
                            id="outlined-name"
                            label="Comentarios"
                            className={classes.textField}
                            value={this.state.commentInput}
                            onChange={this.handleChangeInput('commentInput')}
                            margin="normal"
                            variant="outlined"
                        />


                </Paper>

                    <Button variant="outlined" onClick={this.handleClick} color="primary" className={classes.button}>
                        Asignar Zona

                    </Button>




            </div>

        );
    }
}

CobranzaRimacy.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CobranzaRimacy);