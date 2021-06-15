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

export function QuestionGroup({ questionGroups }) {
	const classes = useStyles();

	return (
		<React.Fragment>
			{
				(questionGroups.map(questionGroup => {
					return (
						<Box border = {0} className = { classes.questionGroup }>
							<div className = { classes.title }>
								<TitleText value = {`Group ${questionGroup.order}`} fontSize = { '16px' } />
							</div>
							<Text value = { questionGroup.introText }/>
							<Question questions = { questionGroup.questions } />
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
					(question.type === 'TF')
						? <TFQuestion order = { question.order } statementText = { question.statementText } answers = { question.answers } />
						: (question.type === 'FITB')
							? <FITBQuestion order = { question.order } statementText = { question.statementText } />
							: <MCQuestion order = { question.order } statementText = { question.statementText } answers = { question.answers } />
				)
			}) }
		</React.Fragment>
	)
}

export function TFQuestion({ order, statementText }) {
	const classes = useStyles();

	return (
		<Box border = {0} className = { classes.question }>
			<Typography display = 'inline' style = {{ marginRight: '25px', fontWeight: 'bold'}}>
				{ order }
			</Typography>
			<Typography display = 'inline'>
				{ statementText }
			</Typography>
		</Box>
	);
};
export function MCQuestion({ order, statementText, answers }) {
	const classes = useStyles();

	return (
		<Box border = {0} className = { classes.question }>
			<Typography display = 'inline' style = {{ marginRight: '25px', fontWeight: 'bold'}}>
				{ order }
			</Typography>
			<Typography display = 'inline'>
				{ statementText }
			</Typography>
			<Box border = {0} style = {{ marginLeft: '25px'}}>
				{
					answers.map(answer => {
						return (
							<Box border = {0}>
								<Typography display = 'inline' style = {{ marginLeft: '10px', marginRight: '25px', fontWeight: 'bold' }}>
									{ answer.text.substring(0, 1) }
								</Typography>
								<Typography display = 'inline'>
									{ answer.text.substring(3) }
								</Typography>
							</Box>
						)
					})
				}

			</Box>
		</Box>
	)
};
export function FITBQuestion({ order, statementText }) {
	const classes = useStyles();

	return (
		<Box border = {0} className = { classes.question }>
			<Typography display = 'inline' style = {{ marginRight: '25px', fontWeight: 'bold'}}>
				{ order }
			</Typography>
			<Typography display = 'inline'>
				{ statementText }
			</Typography>
		</Box>
	);
};
