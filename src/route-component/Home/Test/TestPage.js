import React, { useContext, useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import { getCommentByTestId } from "../../../service-component/API/test";
import { ActionButton } from "../../../presentational-components/Button";
import { ReadingTest, TestTimer } from "../../../container-components/Test/Test";
import { TitleText } from "../../../presentational-components/Text";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Comment } from "../../../presentational-components/Comment";
import { AuthorizationContext } from "../../../service-component/Context/authorization";
import { useQuery } from "@apollo/client";
import { TEST_BYID_QUERY } from "../../../service-component/API/query";
import { LoadingDialog } from "../../../presentational-components/Dialog";

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
	const [authorization] = useContext(AuthorizationContext);
	const [noticed, setNoticed] = useState(false);
	const [done, setDone] = useState(false);

	// call testdoneyet mutation to check whether test is done, if done, set done = true
	// else set done = false
	useEffect(() => {
		console.log(id);
	}, []);

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
	const { loading, data, error } = useQuery(TEST_BYID_QUERY, { variables: { id: parseInt(id, 10) } });

	let handleAnswer = () => async (answer) => {
		let elementIdx = answers.findIndex((element => element.questionId === answer.questionId));
		if (elementIdx === -1) {
			await setAnswers([...answers, {
				questionId: answer.questionId,
				answerId: answer.answerId,
				answerString: answer.answerString,
			}]);
		} else {
			let newAnswers = answers;
			newAnswers[elementIdx].answerId = answer.answerId;
			newAnswers[elementIdx].answerString = answer.answerString;
			await setAnswers(newAnswers);
		}
	}

	let handleSubmit = () => {
		console.log(answers);
		props.onDone();
	}

	return (
		<React.Fragment>
			{ loading && <LoadingDialog open = { loading } /> }
			{ !loading && <TestTimer minutes = { 5 } reviewMinutes = { 1 } onTimeOut = { handleSubmit }/> }
			{ data &&
			<Grid container direction = 'row' justify = 'flex-start'>
				<Container className = { classes.testContainer }>
					{
						(data.getTestById.type.toLowerCase() === 'reading')
							? (<ReadingTest sections = { data.getTestById.sections } answers = { answers }
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
			}

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

