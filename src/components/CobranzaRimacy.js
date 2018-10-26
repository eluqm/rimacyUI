import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const styles = theme=>({

    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,

    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
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
});


const options = [
    '',
    '7 dias',
    '15 dias',

];

class CobranzaRimacy extends React.Component {
    state = {
        date : new Date(),
        auth: true,
        anchorEl: null,
        empls: [],
        selectedTeam: "",
        validationError: "",
        _zona:[],
        _selectedZona : "",
        _anchorEl: null,
        _selectedIndex: 1,
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

    handleClick = this.handleClick.bind(this);

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

        fetch("http://localhost:8181/v1/allzones")
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
            <div className={classes.root}>
                <Divider />
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
                        }
                        label={auth ? 'Logout' : 'Login'}
                    />
                </FormGroup>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Cobranza
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                {/*<Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                </Menu>*/}

                            </div>


                        )}

                    </Toolbar>

                        <FormControl variant="filled" className={classes.formControl}>

                            <InputLabel htmlFor="filled-age-simple">Nombre</InputLabel>
                            <Select value={this.state.selectedTeam}
                                    onChange={(e) => this.setState({selectedTeam: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : ""})}>
                                {this.state.empls.map((team) => <MenuItem key={team.value} value={team.value}>{team.display}</MenuItem>)}
                                input={<FilledInput name="Seleccione Nombre" id="filled-age-simple" />}
                            </Select>
                        </FormControl>


                    <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="date"
                        label="Frecuencia"
                        type="date"
                        defaultValue={this.state.date}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                        <List component="nav">
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
                        </Menu>
                    </form>
                    <FormControl variant="filled" className={classes.formControl}>

                        <InputLabel htmlFor="filled-age-simple">Zona</InputLabel>
                        <Select value={this.state._selectedZona}
                                onChange={(e) => this.setState({_selectedZona: e.target.value, validationError: e.target.value === "" ? "You must select your favourite team" : ""})}>
                            {this.state._zona.map((team) => <MenuItem key={team.value} value={team.value}>{team.display}</MenuItem>)}
                            input={<FilledInput name="Seleccione Zona" id="filled-age-simple" />}
                        </Select>
                    </FormControl>
                </AppBar>
            </div>
        );
    }
}

CobranzaRimacy.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CobranzaRimacy);