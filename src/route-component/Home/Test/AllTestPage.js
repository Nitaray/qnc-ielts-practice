import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TestTable from "../../../container-components/Test/TestTable";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(8),
		paddingBottom: theme.spacing(4),
		paddingRight: theme.spacing(8)
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		height: 'auto'
	},
	tableHead: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontWeight: 'bold',
	},
}));

export default function AllTestPage() {
	const classes = useStyles();

	return (
		<Container className = {classes.container}>
			<Grid container spacing = {3}>
				<Grid item xs = {12} md = {8}>
					<Paper elevation = {0}>
						<TestTable />
					</Paper>
				</Grid>
				<Grid item xs = {0} md = {4}>
					<Paper className = {classes.paper}>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
}