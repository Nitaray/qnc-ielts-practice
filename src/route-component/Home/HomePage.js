import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NavigationBar from "../../presentational-components/NavigationBar";
import AllTestPage from "./Test/AllTestPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import TestPage from "./Test/TestPage";
import { AuthorizationContainer } from "../../container-components/Authorization/AuthorizationContainer";

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
		<AuthorizationContainer>
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
		</AuthorizationContainer>
	);
};
