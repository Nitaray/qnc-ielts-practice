import React from "react";
import Paper from "@material-ui/core/Paper";
import { Text, TitleText } from "./Text";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
	section: {
		margin: theme.spacing(2),
		padding: theme.spacing(2),
	},
	title: {
		marginBottom: theme.spacing(2),
	}
}));

export function ReadingPassage({ section, passage }) {
	const classes = useStyles();

	return (
		<Box border = {1.5} className = { classes.section }>
			<div className = { classes.title }>
				<TitleText value = {`Section ${section}`} fontSize = { '18px' } />
			</div>
			<Text value = { passage }/>
		</Box>
	)
}