import React from "react";
import Box from "@material-ui/core/Box";
import { TitleText } from "./Text";
import useTheme from "@material-ui/core/styles/useTheme";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
	title: {
		marginBottom: theme.spacing(4),
	},
	answer: {
		margin: theme.spacing(1),
	}
}));

export function ReadingSectionAnswer({ data }) {
	return (
		<React.Fragment>
			{
				(data.test.type.toLowerCase() === 'reading')
					? data.test.sections.map(section => (
						<AnswerGroup questionList = { section.questionList }/>
					))
					: <div></div>
			}
		</React.Fragment>
	)
}
export function AnswerGroup({ questionList }) {
	const classes = useStyles();

	return (
		<React.Fragment>
			{
				(questionList.map(question => {
					return (
						<Box border = {0}>
							<div className = { classes.title }>
								<TitleText value = {`Group ${question.number}`} fontSize = { '16px' } />
							</div>
							<Answer questions = { question.questions } />
						</Box>
					)
				}))
			}
		</React.Fragment>
	)
}
export function Answer({ questions }) {
	const classes = useStyles();

	return (
		<Box border = {0} className = { classes.answer }>
			{ questions.map(question => {
				return (
					(question.type === 'TFNG')
						? <TFAnswer number = { question.number } possibleAnswer = { question.answer } />
						: (question.type === 'FITB')
							? <FITBAnswer number = { question.number } />
							: <MCAnswer number = { question.number } possibleAnswer = { question.answer } />
				)
			})
			}
		</Box>
	)
}

export function TFAnswer({ number, possibleAnswer }) {
	const theme = useTheme();

	return (
		<TextField
			select fullWidth
			size = 'small'
			variant = 'outlined'
			id = { number }
			label = { `Question ${number}`}
			value = { ' ' }
			style = {{ marginBottom: theme.spacing(4), }}
		>
			{ possibleAnswer.map((option) => (
				<MenuItem key = { option } value = { option }>
					{ option }
				</MenuItem>
			)) }
		</TextField>
	)
}
export function MCAnswer({ number, possibleAnswer }) {
	const theme = useTheme();

	return (
		<TextField
			select fullWidth
			size = 'small'
			variant = 'outlined'
			id = { number }
			label = { `Question ${number}`}
			value = { ' ' }
			style = {{ marginBottom: theme.spacing(4), }}
		>
			{ possibleAnswer.map((option) => (
				<MenuItem key = { option } value = { option }>
					{ option.substring(0, 1) }
				</MenuItem>
			)) }
		</TextField>
	)
};
export function FITBAnswer({ number }) {
	const theme = useTheme();

	return (
		<TextField
			fullWidth
			size = 'small'
			variant = 'outlined'
			id = { number }
			label = { `Question ${number}`}
			value = { ' ' }
			style = {{ marginBottom: theme.spacing(4), }}
		>
		</TextField>
	);
};