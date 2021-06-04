import React from "react";
import Box from "@material-ui/core/Box";
import { Text, TitleText } from "../../presentational-components/Text";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
	section: {
		margin: theme.spacing(2),
		padding: theme.spacing(2),
	},
	title: {
		marginBottom: theme.spacing(4),
	},
	questionGroup: {
		margin: theme.spacing(2),
		marginBottom: theme.spacing(4),
		padding: theme.spacing(1),
	},
	question: {
		margin: theme.spacing(1),
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

export function ReadingSectionQuestion({ section }) {
	return (
		<React.Fragment>
			<ReadingPassage section = { section.number } passage = { section.statementText } />
			<QuestionGroup questionList = { section.questionList } />
		</React.Fragment>
	)
}
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
					(question.type === 'TFNG')
						? <TFQuestion number = { question.number } statementText = { question.statementText } />
						: (question.type === 'FITB')
							? <FITBQuestion number = { question.number } statementText = { question.statementText } />
							: <MCQuestion number = { question.number } statementText = { question.statementText } possibleAnswer = { question.answer} />
				)
			}) }
		</React.Fragment>
	)
}

export function TFQuestion({ number, statementText }) {
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
export function MCQuestion({ number, statementText, possibleAnswer }) {
	const classes = useStyles();

	return (
		<Box border = {0} className = { classes.question }>
			<Typography display = 'inline' style = {{ marginRight: '25px', fontWeight: 'bold'}}>
				{ number }
			</Typography>
			<Typography display = 'inline'>
				{ statementText }
			</Typography>
			<Box border = {0} style = {{ marginLeft: '25px'}}>
				{
					possibleAnswer.map(answer => {
						return (
							<Box border = {0}>
								<Typography display = 'inline' style = {{ marginLeft: '10px', marginRight: '25px', fontWeight: 'bold' }}>
									{ answer.substring(0, 1) }
								</Typography>
								<Typography display = 'inline'>
									{ answer.substring(3) }
								</Typography>
							</Box>
						)
					})
				}

			</Box>
		</Box>
	)
};
export function FITBQuestion({ number, statementText }) {
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
