import React, { useState } from 'react';

import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Grid from "@material-ui/core/Grid";

import { Text, TextWithLink, TitleText } from "../../presentational-components/Text";
import { TextInput } from "../../presentational-components/Input";
import { ActionButton } from "../../presentational-components/Button";

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

export default function ForgotPasswordPage() {
	const classes = useStyles();
	const [forgotPasswordInfo, setForgotPasswordInfo] = useState({
		email: '',
	});

	const handleForgotPasswordChange = (prop) => (event) => setForgotPasswordInfo({ ...forgotPasswordInfo, [prop]: event.target.value });
	const handleForgotPasswordClick = () => {
	}

	return (
		<React.Fragment>
			<Container maxWidth = "xs">
				<CssBaseline/>
				<div className = { classes.paper }>
					<Avatar className = { classes.avatar }>
						<LockOutlinedIcon />
					</Avatar>
					<TitleText value = "Recover password" fontSize = '18px' />
					<form className = { classes.form }>
						<Grid container>
							<Grid item xs = {12} sm = {12}>
								<TextInput label = "Email" name = "email"
										   value = { forgotPasswordInfo['email'] }
										   onChange = { handleForgotPasswordChange('email') } />
							</Grid>
							<Grid item xs = {12} sm = {12}>
								<ActionButton value = "Recover password"
											  onClick = { () => handleForgotPasswordClick() } />
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs>
								<TextWithLink
									value = "Back to home"
									align = "right"
									to = "/" />
							</Grid>
						</Grid>
					</form>
				</div>
			</Container>
		</React.Fragment>
	)
}