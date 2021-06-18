import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import React, { useContext, useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TestTable from "../../../container-components/Test/TestTable";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ALLTEST_QUERY, DONETEST_BYUSERID_QUERY } from "../../../service-component/API/query";
import { LoadingDialog } from "../../../presentational-components/Dialog";
import { AuthorizationContext } from "../../../service-component/Context/authorization";

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
}));

export default function AllTestPage() {
	const classes = useStyles();
	const [authorization] = useContext(AuthorizationContext);
	const allTests = useQuery(ALLTEST_QUERY);
	const doneTests = useQuery(DONETEST_BYUSERID_QUERY, { variables: { id: parseInt(authorization.user.id, 10) } });

	if (allTests.error) {
		console.log(allTests.error);
	}
	if (doneTests.data) {
		console.log(doneTests.data);
	}
	if (doneTests.error) {
		console.log(authorization);
		console.log(doneTests.error);
	}

	return (
		<React.Fragment>
			{ (allTests.loading || doneTests.loading) && <LoadingDialog open = { allTests.loading || doneTests.loading } /> }
			<Container className = {classes.container}>
				<Grid container spacing = {3}>
					<Grid item xs = {12} md = {8}>
						<Paper elevation = {0}>
							{ allTests.data && doneTests.data &&
							 <TestTable allTests = { allTests.data.allTests } doneTests = { doneTests.data.getUserById.doneTests } /> }
						</Paper>
					</Grid>
					<Grid item xs = {0} md = {4}>
						<Paper className = {classes.paper}>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</React.Fragment>
	);
}