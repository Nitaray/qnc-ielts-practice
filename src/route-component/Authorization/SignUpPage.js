import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Grid from "@material-ui/core/Grid";

import { Text, TextWithLink } from "../../presentational-components/Text";
import { PasswordInput, TextInput } from "../../presentational-components/Input";
import { ActionButton } from "../../presentational-components/Button";

import { signUp } from "../../service-component/API/authorization";

// REMOVE IF BACKEND FOR AUTHENTICATION IS FINISHED
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
// END REMOVE

export default function SignUpPage() {
	// REMOVE IF BACKEND FOR AUTHENTICATION IS FINISHED
	const classes = useStyles();
	const history = useHistory();
	const [signUpInfo, setSignUpInfo] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleSignUpChange = (prop) => (event) => setSignUpInfo({ ...signUpInfo, [prop]: event.target.value });
	const handleSignUpClick = () => {
		if (signUp(signUpInfo)) history.push('/');
	}
	// END REMOVE

	return (
		<React.Fragment>
			<Container maxWidth = "xs">
				<CssBaseline/>
				{/* REMOVE IF BACKEND FOR AUTHENTICATION IS FINISHED */}
				{/* REPLACE WITH <SignUp /> COMPONENT*/}
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
						<Grid container>
							<Grid item xs>
								<TextWithLink
									value = "Oh! I already have account"
									align = "right"
									to = "/" />
							</Grid>
						</Grid>
					</form>
				</div>
				{/* END REMOVE */}
			</Container>
		</React.Fragment>
	)
}