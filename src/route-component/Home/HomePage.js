import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NavigationBar from "../../presentational-components/NavigationBar";
import AllTestPage from "./Test/AllTestPage";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import ViewTestPage from "./Test/ViewTestPage";
import { AuthorizationContainer } from "../../container-components/Authorization/AuthorizationContainer";
import AddTestPage from "./Test/AddTestPage";
import DoTestPage from "./Test/DoTestPage";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { SIGNOUT_MUTATION } from "../../service-component/API/mutation";
import { useMutation } from "@apollo/client";

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
	const history = useHistory();
	const [signOut] = useMutation(SIGNOUT_MUTATION);
	const navigationBarFunction = [
		<MenuItem onClick = { () => handleSignOut() }>Sign Out</MenuItem>,
	];

	const handleSignOut = () => {
		signOut().then().catch();
		history.push('/');
	}

	return (
		<AuthorizationContainer>
			<div className = { classes.root }>
				<NavigationBar options = { navigationBarFunction }/>
				<div className = {classes.content}>
					<div className = {classes.appBarSpacer}/>
					<BrowserRouter basename = "/qnc-ielts-practice/tests">
						<Switch>
							<Route exact path = "/" component = { AllTestPage } />
							<Route exact path = "/view/:id" children = { <ViewTestPage /> } />
							<Route exact path = "/do/:id" children = { <DoTestPage /> } />
							<Route exact path = "/add" component = { AddTestPage } />
						</Switch>
					</BrowserRouter>
				</div>
			</div>
		</AuthorizationContainer>
	);
};

