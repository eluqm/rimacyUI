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
import Paper from "@material-ui/core/Paper/Paper";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Slide from "@material-ui/core/Slide/Slide";




function Transition(props) {
    return <Slide direction="up" {...props} />;
}
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

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
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

class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose();
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const { classes, onClose, selectedValue,label, ...other } = this.props;

        return (
            <Dialog  onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">{label}</DialogTitle>
                <div>

                </div>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
   // selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class MultipleSelectRimacy extends React.Component {
    state = {
        name: [],
        nameObject:[],
        nameInput: ' ',
        open: false,
        open_validation:false,
        open_confirmation:false,

    };


    handleChange = event => {
        this.setState({ name: event.target.value});
        this.setState({nameObject:event.target.value});
    };

    handleClickOpenDialog = () => {
        this.setState({ open: true });
    };

    handleCloseDialogConfirm = event => {
        this.setState({ open: false });
        this.setState({nameObject: event.target.value});
        console.log(this.state.nameObject);
        console.log(this.state.nameInput);
        if(this.state.nameObject.length >0){console.log("select esta lleno")}else{console.log("slect esta vacio")}
        if(this.state.nameInput.trim() != ""){console.log("select esta lleno")}else{console.log("slect esta vacio")}
        if(this.state.nameObject.length >0 && this.state.nameInput.trim() != "")
        {
            console.log("ENTRA");
            this.handleClick();

        }else{
            this.setState({open_validation:true});
            console.log("llama algo");

        }
    };
    handleCloseDialog = () => {
        this.setState({ open: false });
    };
    handleClickOpen_Validation = () => {
        this.setState({
            open_validation: true,
        });
    };

    handleClose_Validation=() => {
        this.setState({ open_validation: false });
    };
    handleClose_Confirmation=() => {
        this.setState({ open_confirmation: false });
    };

    handleClick = () => {
        //this.setState({open: true});

        //this.setState({nameObject: event.target.value});
        console.log(this.state.nameObject);
        console.log(this.state.nameInput);
      //  if (this.state.nameObject!== undefined && this.state.nameInput !== undefined) {

        fetch(this.props.hostdata.host + "v1/addzona", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },


            body: JSON.stringify([{

                "denominacion": this.state.nameInput,
                "rutas": this.state.nameObject,
            }])
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({open_confirmation:true})
            })
            .catch((error) => {
                console.error(error);
            });
         //}
         //else{console.log("vamo por buen camino")}

    }
    handleChangeInput = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    componentDidMount() {
        console.log('El componente está disponible en el DOM');
        console.log("v1/allrutas");
        fetch(this.props.hostdata.host+"v1/allrutas")
            .then((response) => {
                return response.json();
            }).then(data => {
            console.log(data.data[1]);

            names1 = data.data.map(team => { return {value:team[0],display: team[1],name_ruta:team[3]} })
            names=names1
            console.log("names data");
            console.log(names);

        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div>

                <Paper className={classes.root} elevation={1}>


                    <TextField
                        id="outlined-name"
                        label="Nombre Zona"
                        className={classes.textField}
                        value={this.state.nameInput}
                        onChange={this.handleChangeInput('nameInput')}
                        margin="normal"
                        variant="outlined"
                    />

                </Paper>
                <Paper className={classes.root} elevation={1}>
                    {/*<FormControl className={classes.formControl}>
*/}
                    <FormControl variant="outlined" className={classes.formControl}>
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
                    </FormControl>
                </Paper>
                <Button variant="outlined" onClick={this.handleClickOpenDialog} color="primary" className={classes.button}>
                    Crear Zona
                </Button>
                    <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"seguro?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            vas a crear una nueva zona ....
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDialog} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleCloseDialogConfirm} color="primary">
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                <SimpleDialogWrapped
                    //selectedValue={this.state.selectedValue}
                    label ={"LLenar todos los campos!!!!!!"}
                    open={this.state.open_validation}
                    onClose={this.handleClose_Validation}
                />
                <SimpleDialogWrapped
                    //selectedValue={this.state.selectedValue}
                    label ={"Se a creado una nueva zona!!!!!!"}
                    open={this.state.open_confirmation}
                    onClose={this.handleClose_Confirmation}
                />

            </div>
        );
    }
}

MultipleSelectRimacy.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultipleSelectRimacy);