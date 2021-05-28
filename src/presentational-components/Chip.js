import React from "react";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
	chip: {
		maxHeight: '18px',
		fontSize: '11px',
		fontWeight: 'bold',
	},
}));

export function ListeningChip() {
	const classes = useStyles();
	return (
		<Chip size = "small" label = "Listening"
			  color = "primary" className = { classes.chip }/>
	)
}

export function ReadingChip() {
	const classes = useStyles();
	return (
		<Chip size = "small" label = "Reading"
			  color = "secondary" className = { classes.chip } />
	)
}