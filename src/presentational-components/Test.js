import React from "react";
import { Text, TitleText } from "./Text";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles((theme) => ({
	section: {
		margin: theme.spacing(2),
		padding: theme.spacing(2),
	},
	title: {
		marginBottom: theme.spacing(2),
	},
	questionGroup: {
		margin: theme.spacing(2),
		marginBottom: theme.spacing(4),
		padding: theme.spacing(1),
	},
	question: {
		margin: theme.spacing(1),
		padding: theme.spacing(1),
	},

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
export function ReadingSectionQuestion({ data }) {
	return (
		<React.Fragment>
			{
			(data.test.type.toLowerCase() === 'reading')
				? data.test.sections.map((section) => {
					return (
						<React.Fragment>
							<ReadingPassage section = { section.number } passage = { section.statementText } />
							{
								(section.type === 'MC') ?
									<QuestionGroup questionList = { section.questionList } />
									: (<div></div>)
							}
						</React.Fragment>
					)
				}) : <div></div>
			}
		</React.Fragment>
	)
}
export function ReadingSectionAnswer({ data }) {}

export function QuestionGroup({ questionList }) {
	const classes = useStyles();

	return (
		<React.Fragment>
			{
				(questionList.map(question => {
					return (
						<Box border = {0} className = { classes.questionGroup }>
							<div className = { classes.title }>
								<TitleText value = {`Group ${question.number}`} fontSize = { '16px' } />
							</div>
							<Text value = { question.introText }/>
							<Question questions = { question.questions } />
						</Box>
					)
				}))
			}
		</React.Fragment>
	)
}
export function Question({ questions }) {
	return (
		<React.Fragment>
			{ questions.map((question) => {
				return (
					(question.type === 'MC')
						? <MCQuestion number = { question.number } statementText = { question.statementText } />
						: <div></div>
				)
			}) }
		</React.Fragment>
	)
}

export function MCQuestion({ number, statementText }) {
	const classes = useStyles();

	return (
		<Box border = {0} className = { classes.question }>
			<Typography display = 'inline' style = {{ marginRight: '25px', fontWeight: 'bold'}}>
				{ number }
			</Typography>
			<Typography display = 'inline'>
				{ statementText }
			</Typography>
		</Box>
	);
};
export function MCAnswer({ question }) {
	const theme = useTheme();
	const answer = ['True', 'False', 'Not Given'];

	return (
		<TextField
			select
			size = 'small'
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

export function FITBQuestion({ question, statement }) {
	return (
		<div></div>
	);
};
export function FITBAnswer({ question }) {
	return (
		<div>

		</div>
	);
};