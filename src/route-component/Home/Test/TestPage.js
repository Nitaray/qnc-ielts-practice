import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { useParams } from "react-router-dom";
import { getTestById } from "../../../service-component/API/test";
import { ActionButton } from "../../../presentational-components/Button";
import { ReadingTest } from "../../../container-components/Test/Test";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(8),
		paddingBottom: theme.spacing(4),
		paddingRight: theme.spacing(8)
	},

}));

export default function TestPage() {
	const classes = useStyles();
	const [answers, setAnswers] = useState([]);

	let { id } = useParams();
	const data = getTestById(id);

	let handleAnswer = () => (answer) => {
		let elementIdx = answers.findIndex((element => element.id == answer.id));
		if (elementIdx === -1) {
			setAnswers([...answers, {
				id: answer.id,
				answer: answer.answer
			}]);
		} else {
			let newAnswers = answers;
			newAnswers[elementIdx].answer = answer.answer;
			setAnswers(newAnswers);
		}

	}
	let handleSubmit = () => {
		console.log(answers);
	}

	return (
		<Container className = {classes.container}>
			{
				(data.test.type === 'reading')
					? (<ReadingTest sections = { data.test.sections } answers = { answers }
									onAnswer = { handleAnswer() } />)
					: <div></div>
			}

			<Grid container spacing = {3}>
				<Grid item xs = {4}>

				</Grid>
				<Grid item xs = {4}>
					<ActionButton value = 'Submit' onClick = { () => handleSubmit() }/>
				</Grid>
				<Grid item xs = {4}>

				</Grid>
			</Grid>
		</Container>
	);
};

