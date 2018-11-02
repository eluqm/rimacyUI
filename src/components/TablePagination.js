import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Slide from "@material-ui/core/Slide/Slide";
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
let counter = 0;
function createData(name, calories, fat, carbs, protein) {
    counter += 1;
    return { id: counter, name, calories, fat, carbs, protein };
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Nombre Zona' },
    //{ id: 'denominacion', numeric: true, disablePadding: false, label: 'Calories' },
   // { id: 'estado', numeric: true, disablePadding: false, label: 'Activo' },
    //{ id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    //{ id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];
class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose();
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const {classes, onClose, selectedValue, label, ...other} = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
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
class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                <Tooltip
                                    title="Sort"
                                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === row.id}
                                        direction={order}
                                        onClick={this.createSortHandler(row.id)}
                                    >
                                        {row.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
});

let EnhancedTableToolbar = props => {
    const { numSelected, func_save,classes } = props;

    return (
        <Toolbar
            className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            <div className={classes.title}>
                {numSelected > 0 ? (
                    <Typography color="inherit" variant="subtitle1">
                        {numSelected} Zonas Activas
                    </Typography>
                ) : (
                    <Typography variant="h6" id="tableTitle">
                        Zonas
                    </Typography>
                )}
            </div>
            <div className={classes.spacer} />
            <div className={classes.actions}>
                {numSelected > 0 ? (
                    <Tooltip title="guardar cambios" >
                        <Button onClick={func_save}>Guardar</Button>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton aria-label="Filter list">
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    func_save:PropTypes.func.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        selected_state:[],
        id_pivot:[],
        datas: [
            createData('Cupcake', 305, 3.7, 67, 4.3),
            createData('Donut', 452, 25.0, 51, 4.9),
            createData('Eclair', 262, 16.0, 24, 6.0),
            createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
            createData('Gingerbread', 356, 16.0, 49, 3.9),
            createData('Honeycomb', 408, 3.2, 87, 6.5),
            createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
            createData('Jelly Bean', 375, 0.0, 94, 0.0),
            createData('KitKat', 518, 26.0, 65, 7.0),
            createData('Lollipop', 392, 0.2, 98, 0.0),
            createData('Marshmallow', 318, 0, 81, 2.0),
            createData('Nougat', 360, 19.0, 9, 37.0),
            createData('Oreo', 437, 18.0, 63, 4.0),
        ],
        page: 0,
        rowsPerPage: 5,
        open: false,
        open_validation: false,
        open_confirmation: false,
    };
    componentDidMount() {
        fetch(this.props.hostdata.host+"v1/allzones")
            .then((response) => {
                return response.json();
            }).then(data => {

            this.setState({
                datas:     data.data.map(tbldata=>{return {id:tbldata[0],name:tbldata[1],estado:tbldata[2]}}),
                selected:  data.data.map(tbldata1=>{return (parseInt(tbldata1[2])==1) && parseInt(tbldata1[0])

                }),
                selected_state: data.data.map(tbldata1=>{return (parseInt(tbldata1[2])==1)? parseInt(tbldata1[2]):0}),
                id_pivot: data.data.map(tbldata1=>{return parseInt(tbldata1[0])}),
            })


            let elects =[]
            let elects_state =[]
            elects=Array.from(this.state.selected);
            elects_state=Array.from(this.state.selected_state);
            console.log(this.state.id_pivot)
            console.log(elects)
            console.log("state: "+elects_state)
             let elects2 = elects.filter(item => item !== false)
            console.log(elects2)
            this.setState({selected: elects2});
            //this.setState({selected_state: elects_state.filter(items => items !== false)});
            console.log(this.state.selected_state)
        }).catch(error => {
            console.log(error);
        });

    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        //this.setState({selected:this.state.selected.compact});
        const {selected_state} = this.state;
        let new_selected=selected_state;
        console.log("copia:"+new_selected)
        if (event.target.checked) {
            this.setState(state => ({ selected: state.datas.map(n => n.id) }));
            //this.setState({ selected_state: slice(0,this.state.selected_state.length,1)});
            for(var i = 0, value = 1, size = new_selected.length, array = new Array(new_selected.length); i < size; i++) array[i] = value;
            //new_selected.slice(0,new_selected.length,"1");
            this.setState({selected_state:array});
            return;
        }
        for(var i = 0, value = 0, size = new_selected.length, array = new Array(new_selected.length); i < size; i++) array[i] = value;
        this.setState({selected_state:array});
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        console.log(this.state.selected);
        console.log(this.state.selected_state);
        console.log(this.state.id_pivot);
        //console.log(id);

        const { selected } = this.state;
        const { selected_state } = this.state;
        const { id_pivot } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        let newSelected_state = selected_state;
        let newId_pivot = id_pivot;
        //console.log("estados binarios: "+ newSelected_state)
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
           // console.log("indice :"+selectedIndex)
           //console.log("primer valr "+newSelected_state[0])
            //newSelected_state = newSelected_state.concat(selected_state,1);
          //  console.log("encontre el elemento :"+id_pivot.indexOf(id))
            newSelected_state.splice(newId_pivot.indexOf(id),1,1);
            //this.setState({})
            //selected_state[id_pivot.indexOf(id)]=1;
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
            newSelected_state.splice(newId_pivot.indexOf(id),1,0);
            console.log("indice :"+selectedIndex)
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
            newSelected_state.splice(newId_pivot.indexOf(id),1,0);
            console.log("indice :"+selectedIndex)
        } else if (selectedIndex > 0) {
            newSelected_state.splice(newId_pivot.indexOf(id),1,0);
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
        this.setState({ selected_state: newSelected_state });
        this.setState({id_pivot:newId_pivot});

    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;
    handleClickOpenDialog = () => {
        this.setState({open: true});
    };
    handleCloseDialog = () => {
        this.setState({open: false});
    };
    handleCloseDialogConfirm = event => {
        this.setState({open: false});
        this.handleClick_postReq();
    };
    handleClose_Confirmation = () => {
        this.setState({open_confirmation: false});
    };
    handleClick_postReq =() =>
    {
      console.log("ya llegué aca")
        fetch(this.props.hostdata.host + "v1/updatezonastate", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },



            body: JSON.stringify({

                "id_list": this.state.id_pivot,
                "state_list": this.state.selected_state,
                "selected_list":this.state.selected,
                //"frecuencia_week": this.state._week,
                //"frecuencia_month": this.state._monthly,
                //"id_empleado": this.state.selectedTeam,
                //"id_zona": this.state._selectedZona,
                //"comentario": this.state.commentInput,
            })
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson)
                this.setState({open_confirmation: true})
            })
            .catch((error) => {
                console.error(error);
            });
    };
    handleClick_Activate  = event=> {
        console.log("....:::::")
        console.log(
            this.state.selected
        )
        console.log(
            this.state.selected_state
        )
        this.setState({open: true});
       // this.forceUpdate()
    };
    render() {
        const { classes } = this.props;
        const { datas, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, datas.length - page * rowsPerPage);

        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    func_save={this.handleClick_Activate}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={datas.length}
                        />
                        <TableBody>
                            {stableSort(datas, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role="checkbox"
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell padding="checkbox">

                                                <Checkbox checked={isSelected} />

                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.name}
                                            </TableCell>

                                            {/*<TableCell numeric>{n.estado}</TableCell>
                                            */}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
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
                                actualizar....?
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
                        label={"LLenar todos los campos!!!!!!"}
                        open={this.state.open_validation}
                        onClose={this.handleClose_Validation}
                    />
                    <SimpleDialogWrapped
                        //selectedValue={this.state.selectedValue}
                        label={"Se a creado una nueva zona!!!!!!"}
                        open={this.state.open_confirmation}
                        onClose={this.handleClose_Confirmation}
                    />
                </div>
                <TablePagination
                    component="div"
                    count={datas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);
