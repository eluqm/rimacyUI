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

import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField/TextField";


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
    { id: 'nroguia', numeric: false, disablePadding: true, label: 'Nro Guia' },
    { id: 'cliente', numeric: true, disablePadding: false, label: 'Cliente' },
    { id: 'direccion', numeric: true, disablePadding: false, label: 'Dirección' },
    { id: 'fechaped', numeric: true, disablePadding: false, label: 'FechaPed' },
    { id: 'fechaent', numeric: true, disablePadding: false, label: 'FechaEnt' },
    { id: 'saldo', numeric: true, disablePadding: false, label: 'Saldo' },
    { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
];

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
        datas: [],
        page: 0,
        rowsPerPage: 5,
        currentSaldoInput:0,
        currentPagoInput:0,
        currentDifferenceInput:0.0,
    };
    componentDidMount() {
        fetch(this.props.hostdata.host+"v1/allpedidos")
            .then((response) => {
                return response.json();
            }).then(data => {
            console.log("get data :")
                console.log(data.data)
            this.setState({
                datas:     data.data.map(tbldata=>{return {id:tbldata[0],nroguia:tbldata[6],cliente:tbldata[14],direccion:tbldata[15],
                    fechaped:tbldata[2],fechaent:tbldata[3], saldo:tbldata[5],total:tbldata[8]}}),
                selected:  data.data.map(tbldata1=>{return (parseInt(tbldata1[2])==1) && parseInt(tbldata1[0])
                }),

            })


            let elects =[]
            elects=Array.from(this.state.selected);


            console.log(elects)

            let elects2 = elects.filter(item => item !== false)
            console.log(elects2)
            this.setState({selected: elects2});

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

        if (event.target.checked) {
            this.setState(state => ({ selected: state.datas.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id,saldo) => {
        //console.log(this.state.selected);
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];


        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({currentSaldoInput:saldo});
        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;
    handleClick_Activate  = event=> {
        console.log("....:::::")
        console.log(
            this.state.selected
        )
    };

    handleChangePagoInput = commnent => event => {
        let a=(this.state.currentSaldoInput);
        let b=(event.target.value);
        this.setState({
            [commnent[1]]:b,
            [commnent[0]]:(a-b).toFixed(2),

        });
       // let a=(this.state.currentSaldoInput);
       // let b=(this.state.currentPagoInput);
        console.log(a)
        console.log(b)
        //this.setState({currentDifferenceInput: a-b })
    };
    render() {
        const { classes } = this.props;
        const { datas, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, datas.length - page * rowsPerPage);

        return (
            <div>
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
                                            onClick={event => this.handleClick(event, n.id,n.saldo)}
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
                                                {n.nroguia}

                                            </TableCell>

                                            <TableCell numeric>{n.cliente}</TableCell>
                                            <TableCell numeric>{n.direccion}</TableCell>
                                            <TableCell numeric>
                                                {new Intl.DateTimeFormat('es-GB', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: '2-digit'
                                            }).format(n.fechaped)}
                                            </TableCell>
                                            <TableCell numeric>
                                                {new Intl.DateTimeFormat('es-GB', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: '2-digit'
                                                }).format(n.fechaent)}
                                            </TableCell>
                                            <TableCell numeric>{n.saldo}</TableCell>
                                            <TableCell numeric>{n.total}</TableCell>
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
            </Paper >


                <Paper className={classes.root}>
                    <TextField
                        id="outlined-name"
                        label="Saldo Actual"
                        className={classes.textField}
                        value={this.state.currentSaldoInput}
                       // onChange={this.handleChangeInput('currentSaldoInput')}
                        margin="normal"
                        disabled
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Pago"
                        className={classes.textField}
                        value={this.state.currentPagoInput}
                        //={this.handleChangePagoInput}
                        onChange={this.handleChangePagoInput(['currentDifferenceInput','currentPagoInput'])}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-name"
                        label="Nuevo Saldo"
                        className={classes.textField}
                        value={this.state.currentDifferenceInput}
                        //onChange={this.handleChangePagoInput('currentDifferenceInput')}
                        disabled
                        margin="normal"
                        variant="outlined"
                    />
                </Paper>
            </div>


        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EnhancedTable);