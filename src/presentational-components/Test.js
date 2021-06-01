import React from "react";
import Paper from "@material-ui/core/Paper";
import { Text, TitleText } from "./Text";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { TextFields } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import SelectInput from "@material-ui/core/Select/SelectInput";
import Select from "@material-ui/core/Select";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles((theme) => ({
	section: {
		margin: theme.spacing(2),
		padding: theme.spacing(2),
	},
	title: {
		marginBottom: theme.spacing(2),
	},
	question: {
		margin: theme.spacing(2),
		padding: theme.spacing(1),
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
	);
};

export function TrueFalseQuestion({ question, statement }) {
	const classes = useStyles();

	return (
		<Box border = {0} className = { classes.question }>
			<Typography display = 'inline' style = {{ marginRight: '25px', fontWeight: 'bold'}}>
				{ question }
			</Typography>
			<Typography display = 'inline'>
				{ statement }
			</Typography>
		</Box>
	);
};

export function TrueFalseAnswer({ question }) {
	const theme = useTheme();
	const answer = ['True', 'False', 'Not Given'];

	return (
		<TextField
			select
			variant = 'outlined'
			id = { question }
			label = { `Question ${question}`}
			value = { ' ' }
			style = {{ margin: theme.spacing(1), }}
		>
			{ answer.map((option) => (
				<MenuItem key = { option } value = { option }>
					{ option }
				</MenuItem>
			)) }
		</TextField>
	)
}