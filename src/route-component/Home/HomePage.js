import React, { useContext, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import NavigationBar from "../../presentational-components/NavigationBar";
import AllTestPage from "./Test/AllTestPage";
import { BrowserRouter, Route, Switch, useHistory, Redirect } from "react-router-dom";
import ViewTestPage from "./Test/ViewTestPage";
import { AuthorizationContainer } from "../../container-components/Authorization/AuthorizationContainer";
import AddTestPage from "./Test/AddTestPage";
import DoTestPage from "./Test/DoTestPage";
import MenuItem from "@material-ui/core/MenuItem";
import { SIGNOUT_MUTATION } from "../../service-component/API/mutation";
import { useMutation } from "@apollo/client";
import { AuthorizationContext } from "../../service-component/Context/authorization";

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
	const [authorization, setAuthorization] = useContext(AuthorizationContext);
	const navigationBarFunction = [
		<MenuItem onClick = { () => history.push('/tests') }>Home</MenuItem>,
		<MenuItem onClick = { () => handleSignOut() }>Sign Out</MenuItem>,
	];

	const handleSignOut = () => {
		signOut()
			.then(data => {
				setAuthorization({
					status: false,
					token: null,
					user: {
						id: null,
						username: null,
						role: {
							name: null
						}
					}
				})})
			.catch();
	}

	if (!authorization.token) return <Redirect to = '/' />
	return (
		<AuthorizationContainer>
			<div className = { classes.root }>
				<NavigationBar options = { navigationBarFunction }/>
				<div className = {classes.content}>
					<div className = {classes.appBarSpacer}/>
					<Switch>
						<Route exact path = "/tests" component = { AllTestPage } />
						<Route exact path = "/tests/view/:id" children = { <ViewTestPage /> } />
						<Route exact path = "/tests/do/:id" children = { <DoTestPage /> } />
						<Route exact path = "/tests/add" component = { AddTestPage } />
					</Switch>
				</div>
			</div>
		</AuthorizationContainer>
	);
};

