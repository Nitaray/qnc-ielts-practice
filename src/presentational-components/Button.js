import React from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(2, 0, 2),
	},
}));

export function ActionButton({ value }) {
	const classes = useStyles();

	return (
		<Button
			fullWidth
			type = "submit"
			variant = "contained"
			color = "primary"
			className = { classes.button }>
			{ value }
		</Button>
	);
};