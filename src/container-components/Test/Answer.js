import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import { TitleText } from "../../presentational-components/Text";
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

export function AnswerGroup(props) {
	const classes = useStyles();

	return (
		<React.Fragment>
			{
				(props.questionGroups.map(questionGroup => {
					return (
						<Box border = {0}>
							<div className = { classes.title }>
								<TitleText value = {`Group ${questionGroup.order}`} fontSize = { '16px' } />
							</div>
							<Answer questions = { questionGroup.questions } answers = { props.answers }
									onAnswer = { props.onAnswer }/>
						</Box>
					)
				}))
			}
		</React.Fragment>
	)
}
export function Answer(props) {
	const classes = useStyles();

	return (
		<Box border = {0} className = { classes.answer }>
			{ props.questions.map(question => {
				return (
					(question.type === 'TF')
						? <TFAnswer id = { question.id } order = { question.order } answers = { question.answers } onAnswer = { props.onAnswer }/>
						: (question.type === 'FITB')
							? <FITBAnswer id = { question.id } order = { question.order } onAnswer = { props.onAnswer }/>
							: <MCAnswer id = { question.id } order = { question.order } answers = { question.answers } onAnswer = { props.onAnswer } />
				)
			}) }
		</Box>
	)
}

export function TFAnswer(props) {
	const theme = useTheme();
	const [answer, setAnswer] = useState({
		questionId: props.id,
		answerId: '',
		answerString: '',
	});

	const handleChange = (event) => {
		setAnswer({
			questionId: props.id,
			answerId: event.target.value,
			answerString: null,
		});
	}

	useEffect(() => {
		props.onAnswer(answer);
	}, [answer.answerId]);

	return (
		<TextField
			select fullWidth
			size = 'small'
			variant = 'outlined'
			id = { props.order }
			label = { `Question ${props.order}`}
			value = { answer.answerId }
			style = {{ marginBottom: theme.spacing(4), }}
			onChange = { (event) => handleChange(event) }
		>
			{ props.answers.map((option) => (
				<MenuItem key = { option.id } value = { option.id }>
					{ option.text }
				</MenuItem>
			)) }
		</TextField>
	)
}
export function MCAnswer(props) {
	const theme = useTheme();
	const [answer, setAnswer] = useState({
		questionId: props.id,
		answerId: '',
		answerString: '',
	});

	const handleChange = (event) => {
		setAnswer({
			questionId: props.id,
			answerId: event.target.value,
			answerString: '',
		});
	}

	useEffect(() => {
		props.onAnswer(answer);
	}, [answer.answerId]);

	return (
		<TextField
			select fullWidth
			size = 'small'
			variant = 'outlined'
			id = { props.order }
			label = { `Question ${props.order}`}
			value = { answer.answerId }
			style = {{ marginBottom: theme.spacing(4), }}
			onChange = { (event) => handleChange(event) }
		>
			{ props.answers.map((option) => (
				<MenuItem key = { option.id } value = { option.id }>
					{ option.text.substring(0, 1) }
				</MenuItem>
			)) }
		</TextField>
	)
};
export function FITBAnswer(props) {
	const theme = useTheme();
	const [answer, setAnswer] = useState({
		questionId: props.id,
		answerId: '',
		answerString: '',
	});

	const handleChange = (event) => {
		setAnswer({
			questionId: props.id,
			answerId: '',
			answerString: event.target.value,
		});
	}

	// this will update answer at ViewTestPage component every time user change their answer.
	useEffect(() => {
		props.onAnswer(answer);
	}, [answer.answerString]);

	return (
		<TextField
			fullWidth
			size = 'small'
			variant = 'outlined'
			id = { props.order }
			label = { `Question ${props.order}`}
			value = { answer.answerString }
			style = {{ marginBottom: theme.spacing(4), }}
			onChange = { (event) => handleChange(event) }
		/>
	);
};