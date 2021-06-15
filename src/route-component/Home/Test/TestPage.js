import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import { getCommentByTestId, getTestById } from "../../../service-component/API/test";
import { ActionButton } from "../../../presentational-components/Button";
import { ReadingTest, TestTimer } from "../../../container-components/Test/Test";
import { TitleText } from "../../../presentational-components/Text";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Comment } from "../../../presentational-components/Comment";

const useStyles = makeStyles((theme) => ({
	testContainer: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(8),
		paddingBottom: theme.spacing(4),
		paddingRight: theme.spacing(8)
	},
	commentContainer: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(8),
	},
	cardHeader: {
		paddingBottom: theme.spacing(1),
	},
	cardContent: {
		paddingTop: theme.spacing(0),
	},
	noticed: {
		marginTop: theme.spacing(20),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
}));

export default function TestPage() {
	const { id } = useParams();
	const [noticed, setNoticed] = useState(false);
	const [done, setDone] = useState(false);

	// call testdoneyet mutation to check whether test is done, if done, set done = true
	// else set done = false

	// handle submission, submit and change done to true.

	return (
		<React.Fragment>
			{ done
				? <CommentTest />
				: noticed
					? <DoTest onDone = { () => setDone(true) } />
					: <Notice onClick = { () => setNoticed(true) }/>
			}
		</React.Fragment>
	)
};

function Notice(props) {
	const classes = useStyles();
	const rules = [
		{
			id: '1',
			text: 'Test will be account for 60 minutes. After 60 minutes, current answer will be submitted and result will be counted towards your rating.'
		},{
			id: '2',
			text: 'Please do not reload your browser while you do your test; or else, your answer will be deleted.',
		},{
			id: '3',
			text: 'You will be given additional 5 minutes to review your result after 60 minutes ended. Please submit your result in time.',
		}
	]
	return (
		<Container maxWidth = 'xs' className = { classes.noticed }>
			<TitleText value = "Before you do your test..." fontSize = "18px"/>
				<Grid container>
					<Grid item xs = {12} sm = {12}>
						{
							rules.map(rule => {
								return (
									<Box border = {0} style = {{ marginTop: '18px' }}>
										<Typography display = 'inline' style = {{ marginLeft: '10px', marginRight: '25px', fontWeight: 'bold' }}>
											{ rule.id }
										</Typography>
										<Typography display = 'inline'>
											{ rule.text }
										</Typography>
									</Box>
								)
							})
						}
					</Grid>
					<Grid item xs = {12} sm = {12}>
						<ActionButton value = "Do test" onClick = { () => props.onClick() }/>
					</Grid>
				</Grid>
		</Container>
	)
}

function DoTest(props) {
	const { id } = useParams();
	const classes = useStyles();
	const [answers, setAnswers] = useState([]);
	const [data, setData] = useState(null);

	useEffect(() => {
		const data = getTestById(id);
		setData(data);
	}, []);

	useEffect(() => {
		console.log(answers);
	}, [answers]);

	let handleAnswer = () => async (answer) => {
		let elementIdx = answers.findIndex((element => element.id === answer.id));
		if (elementIdx === -1) {
			await setAnswers([...answers, {
				id: answer.id,
				answer: answer.answer
			}]);
		} else {
			let newAnswers = answers;
			newAnswers[elementIdx].answer = answer.answer;
			await setAnswers(newAnswers);
		}
	}

	let handleSubmit = () => {
		console.log(answers);
		props.onDone();
	}

	return (
		<React.Fragment>
			<TestTimer minutes = { 2 } reviewMinutes = { 1 } onTimeOut = { handleSubmit }/>
			<Grid container direction = 'row' justify = 'flex-start'>
				<Container className = { classes.testContainer }>
					{
						data && (data.test.type === 'reading')
							? (<ReadingTest sections = { data.test.sections } answers = { answers }
											onAnswer = { handleAnswer() } />)
							: <div></div>
					}
					<Grid container spacing = {3}>
						<Grid item xs = {4} />
						<Grid item xs = {4}>
							<ActionButton value = 'Submit' onClick = { () => handleSubmit() }/>
						</Grid>
						<Grid item xs = {4} />
					</Grid>
				</Container>
			</Grid>
		</React.Fragment>
	);
}

function CommentTest() {
	const { id } = useParams();
	const classes = useStyles();
	const [data, setData] = useState(null);
	const [comment, setComment] = useState('');

	useEffect(() => {
		console.log('comment test called');
		const data = getCommentByTestId(id);
		setData(data);
	}, []);

	return (
		<Container className = { classes.commentContainer }>
			<Grid container direction = 'row' justify = 'space-evenly' spacing = {2}>
				<Grid item xs = {12} md = {8} lg = {8}>
					{ data && <Comment comments = { data.test.comments } /> }
				</Grid>
			</Grid>
		</Container>
	)
}

function ResultTest() {
	const { id } = useParams();
	const classes = useStyles();
	const [data, setData] = useState(null);

	useEffect(() => {
		console.log('result test called');
		const data = getTestById(id);
		setData(data);
	}, [])

	return (
		<Container className = { classes.container }>
			{
				data && (data.test.type === 'reading')
					? (<ReadingTest sections = { data.test.sections } />)
					: <div></div>
			}
		</Container>
	);
}
