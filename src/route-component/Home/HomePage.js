import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import NavigationBar from "../../presentational-components/NavigationBar";
import TestTable from "../../container-components/Test/TestTable";
import AllTestPage from "./Test/AllTestPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TestPage from "./Test/TestPage";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	content: {
		flexGrow: 1,
		overflow: 'auto'
	},
	appBarSpacer: theme.mixins.toolbar,
}));

export default function HomePage() {
	const classes = useStyles();

	return (
		<div className = { classes.root }>
			<NavigationBar />
			<div className = {classes.content}>
				<div className = {classes.appBarSpacer}/>
				<BrowserRouter basename = "/qnc-ielts-practice/tests">
					<Switch>
						<Route exact path = "/" component = { AllTestPage } />
						<Route path = "/:id" children = { <TestPage /> } />
					</Switch>
				</BrowserRouter>
			</div>
		</div>
	);
};

