import React, { useContext, useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { AuthorizationContext } from "../../../service-component/Context/authorization";
import { Redirect } from "react-router-dom";
import { TitleText } from "../../../presentational-components/Text";
import Grid from "@material-ui/core/Grid";
import { ActionButton } from "../../../presentational-components/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
	testContainer: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(8),
		paddingBottom: theme.spacing(4),
		paddingRight: theme.spacing(8),
	},
	commentContainer: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(8),
	},
	cardHeader: {
		paddingBottom: theme.spacing(1),
	},
	cardContent: {
		paddingTop: theme.spacing(0),
	},
	createTest: {
		marginTop: theme.spacing(20),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
}));

export default function AddTestPage() {
	const [authorization] = useContext(AuthorizationContext);
	const [create, setCreate] = useState(false);

	console.log(authorization);
	if (!authorization.token || authorization.user.role.name.toLowerCase() !== 'admin') return <Redirect to = '/' />;

	return (
		<React.Fragment>
			{
				create
					? <div>Hello</div>
					: <CreateTest onClick = { () => setCreate(true) } />
			}
		</React.Fragment>
	);
}

function CreateTest(props) {
	const classes = useStyles();
	const [testInfo, setTestInfo] = useState({
		title: ' ',
		type: ' ',
	});

	const handleCreateTest = () => {
		// call mutation
		props.onClick();
	}

	return (
		<Container maxWidth = 'xs' className = { classes.createTest }>
			<TitleText value = "Create test" fontSize = "18px"/>
			<form className = { classes.form }>
				<Grid container spacing = {2}>
					<Grid item xs = {12} sm = {12}>
						<TextField
							fullWidth
							variant = 'outlined'
							label = "Title"
							value = { testInfo.title }
							onChange = { (event) => setTestInfo({...testInfo, title: event.target.value }) }
						/>
					</Grid>
					<Grid item xs = {12} sm = {12}>
						<TextField
							select fullWidth
							variant = 'outlined'
							label = 'Type'
							value = { testInfo.type }
							onChange = { (event) => setTestInfo({...testInfo, type: event.target.value }) }
						>
							{ ['Reading', 'Listening'].map((option) => (
								<MenuItem key = { option } value = { option }>
									{ option }
								</MenuItem>
							)) }
						</TextField>
					</Grid>
					<Grid item xs = {12} sm = {12}>
						<ActionButton value = "Create Test" onClick = { handleCreateTest }/>
					</Grid>
				</Grid>
			</form>
		</Container>
	)
}