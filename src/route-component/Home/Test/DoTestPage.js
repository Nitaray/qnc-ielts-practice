import Container from "@material-ui/core/Container";
import { TitleText } from "../../../presentational-components/Text";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { ActionButton } from "../../../presentational-components/Button";
import { Redirect, useParams } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthorizationContext } from "../../../service-component/Context/authorization";
import { useMutation, useQuery } from "@apollo/client";
import { TEST_BYID_QUERY, TESTDONEYET_BYID_QUERY } from "../../../service-component/API/query";
import { STARTTEST_MUTATION, SUBMITTEST_MUTATION } from "../../../service-component/API/mutation";
import { LoadingDialog } from "../../../presentational-components/Dialog";
import { ReadingTest, TestTimer } from "../../../container-components/Test/Test";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

export default function DoTestPage() {
	const { id } = useParams();
	const [authorization] = useContext(AuthorizationContext);
	const { loading, data } = useQuery(TESTDONEYET_BYID_QUERY, {
		variables: {
			userId: parseInt(authorization.user.id, 10),
			testId: parseInt(id, 10),
		}
	});
	const [noticed, setNoticed] = useState(false);
	const [startTest] = useMutation(STARTTEST_MUTATION);
	const [done, setDone] = useState(false);

	const handleStartTest = () => {
		setNoticed(true);
		startTest({
			variables: {
				testId: parseInt(id, 10),
				userId: parseInt(authorization.user.id, 10),
			}
		})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
	}
	const handleDoneTest = () => {
		setDone(true);
	}

	// if test is done by this user, redirect to view test.
	if (data) return <Redirect to = {`/view/${id}`} />
	// if user is well informed by Noticed component, start test timer on backend.
	if (done) return <Redirect to = {`/view/${id}`} />

	return (
		<React.Fragment>
			{ loading
				? <LoadingDialog open = { loading } />
				: noticed
					? <DoTest onDone = { () => handleDoneTest() } />
					: <Noticed onClick = { () => handleStartTest() } />
			}
		</React.Fragment>
	)
}

function Noticed(props) {
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
	const [authorization] = useContext(AuthorizationContext);
	const [answers, setAnswers] = useState([]);
	const test = useQuery(TEST_BYID_QUERY, { variables: { id: parseInt(id, 10) } });
	const [submitTest, { loading }] = useMutation(SUBMITTEST_MUTATION);

	let handleAnswer = () => async (answer) => {
		let elementIdx = answers.findIndex((element => element.questionId === answer.questionId));
		if (elementIdx === -1) {
			await setAnswers([...answers, {
				questionId: answer.questionId,
				answerString: answer.answerString,
			}]);
		} else {
			let newAnswers = answers;
			newAnswers[elementIdx].answerString = answer.answerString;
			await setAnswers(newAnswers);
		}
	}

	let handleSubmit = () => {
		console.log(answers);
		submitTest({
			variables: {
				testSubmission: {
					testId: parseInt(id, 10),
					userId:	parseInt(authorization.user.id, 10),
					answers: answers,
				}
			},
			errorPolicy: 'none',
		})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.log(error);
			});
		props.onDone();
	}

	return (
		<React.Fragment>
			{ loading && <LoadingDialog open = { loading } /> }
			{ test.loading && <LoadingDialog open = { test.loading } /> }
			{ !test.loading && <TestTimer minutes = { 5 } reviewMinutes = { 1 } onTimeOut = { handleSubmit }/> }
			{ test.data &&
			<Grid container direction = 'row' justify = 'flex-start'>
				<Container className = { classes.testContainer }>
					{
						(test.data.getTestById.type.toLowerCase() === 'reading')
							?
							<ReadingTest sections = { test.data.getTestById.sections } answers = { answers } onAnswer = { handleAnswer() } />
							:
							<div>This is not developed yet.</div>
					}
					<Grid container spacing = {2} direction = 'row' justify = 'space-evenly'>
						<Grid item xs = {4}>
							<ActionButton value = 'Submit' onClick = { () => handleSubmit() }/>
						</Grid>
					</Grid>
				</Container>
			</Grid>
			}
		</React.Fragment>
	);
}