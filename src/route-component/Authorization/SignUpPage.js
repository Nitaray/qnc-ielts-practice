import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Grid from "@material-ui/core/Grid";

import { Text, TextWithLink, TitleText } from "../../presentational-components/Text";
import { PasswordInput, TextInput } from "../../presentational-components/Input";
import { ActionButton } from "../../presentational-components/Button";

import { signUp } from "../../service-component/API/authorization";
import { useMutation } from "@apollo/client";
import { SIGNIN_MUTATION, SIGNUP_MUTATION } from "../../service-component/API/mutation";
import { ErrorDialog, LoadingDialog } from "../../presentational-components/Dialog";

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
		username: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState(null);
	const [signUp, { loading }] = useMutation(SIGNUP_MUTATION);

	const handleSignUpChange = (prop) => (event) => setSignUpInfo({ ...signUpInfo, [prop]: event.target.value });
	const handleSignUpClick = () => {
		signUp({
			variables: {
				user: {
					username: signUpInfo.username,
					password: signUpInfo.password,
					name: signUpInfo.name,
				}
			},
			errorPolicy: 'none',
		}).then(data => history.push("/")
		).catch(error => {
			setError(true);
			console.log(error);
		});
	}
	// END REMOVE

	return (
		<React.Fragment>
			{ loading && <LoadingDialog open = { loading } /> }
			{ error && <ErrorDialog error = 'Please try again!'
									open = { error } onClose = { setError(false) } /> }
			<Container maxWidth = "xs">
				<CssBaseline/>
				{/* REMOVE IF BACKEND FOR AUTHENTICATION IS FINISHED */}
				{/* REPLACE WITH <SignUp /> COMPONENT*/}
				<div className = { classes.paper }>
					<Avatar className = { classes.avatar }>
						<LockOutlinedIcon />
					</Avatar>
					<TitleText value = "Create Account" fontSize = "18px"/>
					<form className = { classes.form }>
						<Grid container>
							<Grid item xs = {12} sm = {12}>
								<TextInput label = "Full Name" name = "name"
										   value = { signUpInfo['name'] }
										   onChange = { handleSignUpChange('name') } />
							</Grid>
							<Grid item xs = {12} sm = {12}>
								<TextInput label = "Username" name = "username"
										   value = { signUpInfo['username'] }
										   onChange = { handleSignUpChange('username') } />
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