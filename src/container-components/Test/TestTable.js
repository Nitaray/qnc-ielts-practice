import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { TextWithLink, TitleText } from "../../presentational-components/Text";
import { ListeningChip, ReadingChip } from "../../presentational-components/Chip";
import CheckIcon from '@material-ui/icons/Check';
import Chip from "@material-ui/core/Chip";
import { AuthorizationContext } from "../../service-component/Context/authorization";
import { useHistory } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { useMutation } from "@apollo/client";
import { DELETETEST_MUTATION } from "../../service-component/API/mutation";
import { ALLTEST_QUERY, DONETEST_BYUSERID_QUERY } from "../../service-component/API/query";
import { LoadingDialog } from "../../presentational-components/Dialog";

function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}
function getComparator(order, orderBy) {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	paper: {
		width: '100%',
		marginBottom: theme.spacing(2),
	},
	table: {
		width: 'inherit'
	},
	visuallyHidden: {
		border: 0,
		clip: 'rect(0 0 0 0)',
		height: 1,
		margin: -1,
		overflow: 'hidden',
		padding: 0,
		position: 'absolute',
		top: 20,
		width: 1,
	},
	toolbar: {
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(1),
		justifyContent: 'space-between',
		overflowX: 'auto',
	},
	toolbarTitle: {
		flex: '1 1',
	}
}));

const headCells = [
	{ id: 'id', numeric: true, label: '#' },
	{ id: 'title', numeric: false, label: 'Title' },
	{ id: 'type', numeric: false, label: 'Type' },
	{ id: 'status', numeric: false, label: 'Status' },
];

function SortTableHead(props) {
	const { order, orderBy, deleteMode, onRequestSort } = props;

	return (
		<TableHead>
			<TableRow>
				{ headCells.map((headCell) => (
					<TableCell
						key = { headCell.id }
						align = { headCell.numeric ? 'right' : 'left' }
						sortDirection = { orderBy === headCell.id ? order : false }>
						<TableSortLabel
							active = { orderBy === headCell.id }
							direction = { orderBy === headCell.id ? order : 'asc' }
							onClick = { (event) => onRequestSort(event, headCell.id) }>
							<TitleText value = { headCell.label }/>
						</TableSortLabel>
					</TableCell>
				))}
				{ deleteMode && <TableCell padding = 'checkbox' />}
			</TableRow>
		</TableHead>
	);
}

function TableToolbar(props) {
	const classes = useStyles();
	const [authorization] = useContext(AuthorizationContext);

	return (
		<Toolbar className = { classes.toolbar }>
			<div>
				<Chip size = 'small'/>
			</div>
			<div>
				{
					authorization.user.role.name.toLowerCase() === 'admin' &&
					<React.Fragment>
						<Tooltip title = "Add test">
							<IconButton onClick = { () => props.onAdd() }>
								<AddIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title = "Delete test">
							<IconButton onClick = { () => props.onDelete() }>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</React.Fragment>
				}
			</div>
		</Toolbar>
	);
};

export default function TestTable(props) {
	const { allTests, doneTests } = props;
	const [authorization] = useContext(AuthorizationContext);
	const history = useHistory();
	const classes = useStyles();
	const [tests, setTests] = useState([]);
	const [deleteMode, setDeleteMode] = useState(false);
	const [order, setOrder] = useState('asc');
	const [orderBy, setOrderBy] = useState('id');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [deleteTest, { loading }] = useMutation(DELETETEST_MUTATION, {
		refetchQueries: [
			{
				query: DONETEST_BYUSERID_QUERY,
				variables: {
					id: parseInt(authorization.user.id, 10)
				}
			}, {
				query: ALLTEST_QUERY,
			}
		]
	})

	const emptyRows = rowsPerPage - Math.min(rowsPerPage, allTests.length - page * rowsPerPage);
	const rowHeight = 45;

	useEffect(() => {
		let tmp = [];
		allTests.map(allTest => {
			tmp.push({
				id: allTest.id,
				title: allTest.title,
				type: allTest.type,
				status: doneTests.findIndex((element => element.id === allTest.id)) !== -1,
			});
		});
		setTests(tmp);
	}, []);

	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleDeleteTest = (id) => {
		deleteTest({
			variables: {
				testId: id,
			},
		})
			.then(data => console.log(data))
			.catch(error => console.log(error));
	}

	return (
		<React.Fragment>
			{ loading && <LoadingDialog open = { loading } /> }
			<div className = { classes.root }>
				<Paper variant = 'outlined' className = { classes.paper }>
					<TableToolbar onDelete = { () => setDeleteMode(!deleteMode) }
								  onAdd = { () => history.push('/add') } />
					<TableContainer>
						<Table size = 'small' className = { classes.table }>
							<SortTableHead
								order = { order }
								orderBy = { orderBy }
								deleteMode = { deleteMode }
								onRequestSort = { handleRequestSort }
								rowCount = { tests.length } />
							<TableBody>
								{ stableSort(tests, getComparator(order, orderBy))
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => {
										return (
											<TableRow hover tabIndex = { -1 }
													  key = { row.id } style = {{ height: rowHeight }}>
												<TableCell align = 'right'>
													{ row.id }
												</TableCell>
												<TableCell align = "left">
													<TextWithLink value = { row.title } to = { row.status ? `/view/${row.id}` : `/do/${row.id}`}/>
												</TableCell>
												<TableCell align = "left">
													{ (row.type.toLowerCase() === 'listening') ? <ListeningChip /> : <ReadingChip /> }
												</TableCell>
												<TableCell align = "left">
													{ (row.status) && <CheckIcon fontSize = 'small' /> }
												</TableCell>
												{
													deleteMode &&
													<TableCell>
														<IconButton size = 'small' onClick = { () => handleDeleteTest(row.id) }>
															<DeleteIcon/>
														</IconButton>
													</TableCell>
												}
											</TableRow>
										);
									})}
								{ emptyRows > 0 && (
									<TableRow style = {{ height: rowHeight * emptyRows }}>
										<TableCell colSpan = { 6 } />
									</TableRow>
								)}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions = {[10, 25, 50, 100]}
						component = "div"
						count = { tests.length }
						rowsPerPage = { rowsPerPage }
						page = { page }
						onChangePage = { (event, newPage) => setPage(newPage) }
						onChangeRowsPerPage = { handleChangeRowsPerPage }
					/>
				</Paper>
			</div>
		</React.Fragment>
	);
}
