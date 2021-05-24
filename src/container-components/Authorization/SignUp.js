import React, { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import { Text } from "../../presentational-components/Text";
import Grid from "@material-ui/core/Grid";

import { PasswordInput, SelectInput, TextInput } from "../../presentational-components/Input";
import { ActionButton } from "../../presentational-components/Button";
import { signUp } from "../../service-component/API/authorization";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
}));

export default function SignUp() {
	const classes = useStyles();
	const [signUpInfo, setSignUpInfo] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSignUpChange = (prop) => (event) => setSignUpInfo({ ...signUpInfo, [prop]: event.target.value });
	const handleSignUpClick = () => {
		signUp(signUpInfo);
	}

	return (
		<div className = { classes.paper }>
			<Avatar className = { classes.avatar }>
				<LockOutlinedIcon />
			</Avatar>
			<Text value = "Create Account" />
			<form className = { classes.form }>
				<Grid container>
					<Grid item xs = {12} sm = {12}>
						<TextInput label = "Full Name" name = "name"
								   value = { signUpInfo['name'] }
								   onChange = { handleSignUpChange('name') } />
					</Grid>
					<Grid item xs = {12} sm = {12}>
						<TextInput label = "Email" name = "email"
								   value = { signUpInfo['email'] }
								   onChange = { handleSignUpChange('email') } />
					</Grid>
					<Grid item xs = {12} sm = {12}>
						<PasswordInput label = "Password" name = "password"
									   value = { signUpInfo['password'] }
									   onChange = { handleSignUpChange('password') } />
					</Grid>
					<Grid item xs = {12} sm = {12}>
						<PasswordInput label = "Confirm password" name = "confirm-password"
									   value = { signUpInfo['confirmPassword'] }
									   onChange = { handleSignUpChange('confirmPassword') } />
					</Grid>
					<Grid item xs = {12} sm = {12}>
						<ActionButton value = "Sign Up"
									  onClick = { () => handleSignUpClick() } />
					</Grid>
				</Grid>
			</form>
		</div>
	)
}