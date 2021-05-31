import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import withStyles from "@material-ui/core/styles/withStyles";

import { allTest } from "../../service-component/API/test";
import { ListeningChip, ReadingChip } from "../../presentational-components/Chip";
import { DoneIcon } from "../../presentational-components/Icon";
import { TextWithLink, TitleText } from "../../presentational-components/Text";
import makeStyles from "@material-ui/core/styles/makeStyles";

let columns = [
	{
		id: 'id',
		label: '#',
		align: 'right',
		width: '5%',
		compareFn: (a, b, direction) => {
			const res = a.id - b.id;
			return direction === 'asc' ? res : -res;
		}
	},{
		id: 'title',
		label: 'Title',
		align: 'left',
		width: '60%',
		compareFn: (a, b, direction) => {
			const res = a.title - b.title;
			return direction === 'asc' ? res : -res;
		}
	}, {
		id: 'type',
		label: 'Type',
		align: 'left',
		width: '5%',
		compareFn: (a, b, direction) => {
			const res = a.type > b.type ? 1 : -1;
			return direction === 'asc' ? res : -res;
		}
	}, {
		id: 'created',
		label: 'Date Created',
		align: 'right',
		width: '5%',
		compareFn: (a, b, direction) => {
			const res = a.created > b.created ? 1 : -1;
			return direction === 'asc' ? res : -res;
		}
	}, {
		id: 'status',
		label: 'Status',
		align: 'right',
		width: '5%',
		compareFn: (a, b, direction) => {
			const res = a.status.toUpperCase() > b.status.toUpperCase() ? 1 : -1;
			return direction === 'asc' ? res : -res;
		}
	}
];


const useStyles = makeStyles((theme) => ({
	cellWithIcon: {
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
	}
}));

export default function TestTable() {
	const classes = useStyles();
	const test = allTest();

	return (
		<TableContainer component = { Paper }>
			<Table size = "small" stickyHeader>
				<TableHead>
					<TableRow>
						{ columns.map((column) => (
							<TCell align = { column.align }>
								<TitleText value = { column.label }/>
							</TCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{ test.map((row) => (
						<TRow hover key = { row.id } >
							<TCell align = 'right'>
								{ row.id }
							</TCell>
							<TCell align = 'left'
								   style = {{ width: '60%' }}>
								<TextWithLink value = { row.title } to = {`/test/${row.id}`}/>
							</TCell>
							<TCell align = 'left'>
								{ (row.type.toLowerCase() === 'listening') ? <ListeningChip /> : <ReadingChip /> }
							</TCell>
							<TCell align = "right">
								{ row.created }
							</TCell>
							<TCell align = 'right'
								   className = { classes.cellWithIcon }>
								{ (row.status.toLowerCase() === 'done') && <DoneIcon /> }
							</TCell>
						</TRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

const TCell = withStyles((theme) => ({
		root: {
			height: 25,
			borderBottom: "none",
		},
		head: {
			backgroundColor: theme.palette.table.head,
			color: theme.palette.table.text,
		},
		body: {
			fontSize: 14,
		},
	}))(TableCell);

const TRow = withStyles((theme) => ({
		root: {
			'&:nth-of-type(odd)': {
				backgroundColor: theme.palette.table.odd,
			},
		},
	}))(TableRow);