import React from "react";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles((theme) => ({
	chip: {
		maxHeight: '18px',
		fontSize: '11px',
		fontWeight: 'bold',
	},
}));

export function ListeningChip() {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Chip size = "small" label = "Listening" className = { classes.chip }
			  style = {{ backgroundColor: theme.palette.chip.listening }}/>
	)
}

export function ReadingChip() {
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Chip size = "small" label = "Reading" className = { classes.chip }
			  style = {{ backgroundColor: theme.palette.chip.reading }}/>
	)
}