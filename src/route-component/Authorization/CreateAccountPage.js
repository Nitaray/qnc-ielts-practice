import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Avatar from "@material-ui/core/Avatar";
import { Text } from "../../presentational-components/Text";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import { SelectInput, TextInput } from "../../presentational-components/Input";

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

export default function CreateAccountPage() {
	// some hook
	const classes = useStyles();

	// return JSX
	return (
		<React.Fragment>
			<Container maxWidth = "xs">
				<CssBaseline/>
				<div className = { classes.paper }>
					<Avatar className = { classes.avatar }>
						<LockOutlinedIcon />
					</Avatar>
					<Text value = "Create Account" />
					<form className = { classes.form }>
						<Grid container spacing = {2}>
							<Grid item xs = {12} sm = {9}>
								<TextInput label = "Name" name = "name" />
							</Grid>
							<Grid item xs = {12} sm = {9}>
								<SelectInput label = "Gender" name = "gender" choices = { ["male", "female"] }/>
							</Grid>
						</Grid>
					</form>
					{/*{*/}
					{/*	this.state.registerStatus*/}
					{/*		?*/}
					{/*		<Typography component="p" variant="body1" align="center">*/}
					{/*			Register Successful <br/>*/}
					{/*			Click <span> </span>*/}
					{/*			<Link component={RouteLink} to='/login'>*/}
					{/*				here*/}
					{/*			</Link>*/}
					{/*			<span> </span> to login*/}
					{/*		</Typography>*/}
					{/*		:*/}
					{/*		<form className={classes.form}>*/}
					{/*			<Grid container spacing={2}>*/}
					{/*				/!* Name Input *!/*/}
					{/*				<Grid item xs={12} sm={9}>*/}
					{/*					<TextField*/}
					{/*						autoComplete="name"*/}
					{/*						name="Name"*/}
					{/*						variant="outlined"*/}
					{/*						required*/}
					{/*						fullWidth*/}
					{/*						id="Name"*/}
					{/*						label="Name"*/}
					{/*						autoFocus*/}
					{/*						value={this.state.name.value}*/}
					{/*						error={this.state.name.hasError}*/}
					{/*						helperText={this.state.name.error}*/}
					{/*						onChange={this.handleNameInput}/>*/}
					{/*				</Grid>*/}
					{/*				/!* Gender Input *!/*/}
					{/*				<Grid item xs={12} sm={3}>*/}
					{/*					<TextField*/}
					{/*						required fullWidth autoFocus select*/}
					{/*						autoComplete="Gender"*/}
					{/*						name="Gender"*/}
					{/*						variant="outlined"*/}
					{/*						id="Gender"*/}
					{/*						label="Sex"*/}
					{/*						value={this.state.gender.value}*/}
					{/*						onChange={this.handleGenderInput}>*/}
					{/*						<MenuItem key="M" value="male">M</MenuItem>*/}
					{/*						<MenuItem key="F" value="female">F</MenuItem>*/}
					{/*					</TextField>*/}
					{/*				</Grid>*/}
					{/*				/!* SSN Input *!/*/}
					{/*				<Grid item xs={12} sm={6}>*/}
					{/*					<TextField*/}
					{/*						autoComplete="ssn"*/}
					{/*						name="SSN"*/}
					{/*						variant="outlined"*/}
					{/*						required*/}
					{/*						fullWidth*/}
					{/*						id="SSN"*/}
					{/*						label="SSN"*/}
					{/*						autoFocus*/}
					{/*						value={this.state.SSN.value}*/}
					{/*						error={this.state.SSN.hasError}*/}
					{/*						helperText={this.state.SSN.error}*/}
					{/*						onChange={this.handleSSNInput}*/}
					{/*					/>*/}
					{/*				</Grid>*/}
					{/*				/!* DOB Input *!/*/}
					{/*				<Grid item xs={12} sm={6}>*/}
					{/*					<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
					{/*						<KeyboardDatePicker*/}
					{/*							disableFuture*/}
					{/*							variant="inline"*/}
					{/*							inputVariant="outlined"*/}
					{/*							label="Date of Birth"*/}
					{/*							format="dd/MM/yyyy"*/}
					{/*							openTo="year"*/}
					{/*							views={["year", "month", "date"]}*/}
					{/*							value={this.state.DOB.value}*/}
					{/*							InputAdornmentProps={{position: "end"}}*/}
					{/*							onChange={this.handleDOBInput}/>*/}
					{/*					</MuiPickersUtilsProvider>*/}
					{/*				</Grid>*/}
					{/*				/!* Email Input *!/*/}
					{/*				<Grid item xs={12} sm={6}>*/}
					{/*					<TextField*/}
					{/*						variant="outlined"*/}
					{/*						required*/}
					{/*						fullWidth*/}
					{/*						id="email"*/}
					{/*						label="Email Address"*/}
					{/*						name="email"*/}
					{/*						autoComplete="email"*/}
					{/*						value={this.state.email.value}*/}
					{/*						error={this.state.email.hasError}*/}
					{/*						helperText={this.state.email.error}*/}
					{/*						onChange={this.handleEmailInput}*/}
					{/*					/>*/}
					{/*				</Grid>*/}
					{/*				/!* Phone Input *!/*/}
					{/*				<Grid item xs={12} sm={6}>*/}
					{/*					<TextField*/}
					{/*						variant="outlined"*/}
					{/*						required*/}
					{/*						fullWidth*/}
					{/*						id="phone"*/}
					{/*						label="Phone Number"*/}
					{/*						name="phone"*/}
					{/*						autoComplete="phone"*/}
					{/*						value={this.state.phone.value}*/}
					{/*						error={this.state.phone.hasError}*/}
					{/*						helperText={this.state.phone.error}*/}
					{/*						onChange={this.handlePhoneInput}*/}
					{/*					/>*/}
					{/*				</Grid>*/}
					{/*				/!* Password Input *!/*/}
					{/*				<Grid item xs={12}>*/}
					{/*					<TextField*/}
					{/*						variant="outlined"*/}
					{/*						required*/}
					{/*						fullWidth*/}
					{/*						name="password"*/}
					{/*						label="Password"*/}
					{/*						type="password"*/}
					{/*						id="password"*/}
					{/*						autoComplete="current-password"*/}
					{/*						value={this.state.password.value}*/}
					{/*						error={this.state.password.hasError}*/}
					{/*						helperText={this.state.password.error}*/}
					{/*						onChange={this.handlePasswordInput}*/}
					{/*					/>*/}
					{/*				</Grid>*/}
					{/*				/!* ConfirmedPassword Input *!/*/}
					{/*				<Grid item xs={12}>*/}
					{/*					<TextField*/}
					{/*						variant="outlined"*/}
					{/*						required*/}
					{/*						fullWidth*/}
					{/*						name="confirmedPassword"*/}
					{/*						label="Confirmed Password Again"*/}
					{/*						type="password"*/}
					{/*						id="ConfirmedPassword"*/}
					{/*						autoComplete="current-password"*/}
					{/*						value={this.state.confirmedPassword.value}*/}
					{/*						error={this.state.confirmedPassword.hasError}*/}
					{/*						helperText={this.state.confirmedPassword.error}*/}
					{/*						onChange={this.handleConfirmedPasswordInput}*/}
					{/*					/>*/}
					{/*				</Grid>*/}
					{/*			</Grid>*/}
					{/*			<Button*/}
					{/*				className={classes.submit}*/}
					{/*				fullWidth*/}
					{/*				variant="contained"*/}
					{/*				color="primary"*/}
					{/*				onClick={this.handleSubmit}>*/}
					{/*				Sign Up*/}
					{/*			</Button>*/}
					{/*			<Grid container justify="flex-end">*/}
					{/*				<Grid item>*/}
					{/*					<Link component={RouteLink} to='/login'>*/}
					{/*						<Typography variant="body2" align="right">*/}
					{/*							Already have an account? Sign in*/}
					{/*						</Typography>*/}
					{/*					</Link>*/}
					{/*				</Grid>*/}
					{/*			</Grid>*/}
					{/*		</form>*/}
					{/*}*/}
				</div>
			</Container>
		</React.Fragment>
	)
}