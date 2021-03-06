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
			{ props.questions.map(question => (
				<TypeAnswer type = { question.type } id = { question.id } order = { question.order }
							answers = { question.answers } onAnswer = { props.onAnswer } />
			)) }
		</Box>
	)
}

export function TypeAnswer(props) {
	const theme = useTheme();
	const [answer, setAnswer] = useState({
		questionId: parseInt(props.id, 10),
		answerString: '',
	});

	const handleChange = (event) => {
		setAnswer({
			questionId: parseInt(props.id, 10),
			answerString: event.target.value,
		});
	}

	useEffect(() => {
		props.onAnswer(answer);
	}, [answer.answerString]);

	return (
		<React.Fragment>
			{
				props.type.toUpperCase() === 'TF'
					?
					<TextField
						select fullWidth
						size = 'small'
						variant = 'outlined'
						id = { props.order }
						label = { `Question ${props.order}`}
						value = { answer.answerString }
						style = {{ marginBottom: theme.spacing(4), }}
						onChange = { (event) => handleChange(event) }
					>
						{ props.answers.map((option) => (
							<MenuItem key = { option.id } value = { option.text }>
								{ option.text }
							</MenuItem>
						)) }
					</TextField>
					: props.type.toUpperCase() === 'FITB'
					?
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
					:
					<TextField
						select fullWidth
						size = 'small'
						variant = 'outlined'
						id = { props.order }
						label = { `Question ${props.order}`}
						value = { answer.answerString }
						style = {{ marginBottom: theme.spacing(4), }}
						onChange = { (event) => handleChange(event) }
					>
						{ props.answers.map((option) => (
							<MenuItem key = { option.id } value = { option.text }>
								{ option.text.substring(0, 1) }
							</MenuItem>
						)) }
					</TextField>

			}
		</React.Fragment>
	)
}