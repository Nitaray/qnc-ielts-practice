import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { DropdownButton } from "./DropdownButton";
import { TitleText } from "./Text";

const useStyles = makeStyles((theme) => ({
	toolbar: {
		justifyContent: 'space-between',
		overflowX: 'auto',
	},
}));

export default function NavigationBar() {
	const classes = useStyles();
	const options = [
		{
			value: "Home",
			to: "/home",
		},
		{
			value: "Recover password",
			to: "/forgot-password",
		},
	];
	return (
		<AppBar elevation = {0}>
			<Toolbar component = "nav" variant = "dense" className = { classes.toolbar }>
				<TitleText value = "IELTS Training" component = "h1"/>
				<DropdownButton options = { options }
								icon = { <AccountCircleIcon /> } />
			</Toolbar>
		</AppBar>
	);
};

