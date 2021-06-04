import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { ReadingSectionQuestion } from "./Question";
import { ReadingSectionAnswer } from "./Answer";

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		height: 'auto'
	}
}));

export function ReadingTest(props) {
	const classes = useStyles();

	return (
		(props.sections.map(section => (
			<Grid container spacing = {3}>
				<Grid item xs = {9}>
					<Paper variant = 'outlined' className = { classes.paper }>
						<ReadingSectionQuestion section = { section } />
					</Paper>
				</Grid>
				<Grid item xs = {3}>
					<Paper variant = 'outlined' className = {classes.paper}>
						<ReadingSectionAnswer section = { section } answers = { props.answers }
											  onAnswer = { props.onAnswer }/>
					</Paper>
				</Grid>
			</Grid>
		)))
	)
}



