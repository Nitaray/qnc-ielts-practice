import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";
import { getCommentByTestId, getTestById } from "../../../service-component/API/test";
import { ActionButton } from "../../../presentational-components/Button";
import { ReadingTest } from "../../../container-components/Test/Test";
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Text, TitleText } from "../../../presentational-components/Text";
import { CommentInput } from "../../../presentational-components/Input";
import SendIcon from '@material-ui/icons/Send';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(8),
		paddingBottom: theme.spacing(4),
		paddingRight: theme.spacing(8)
	},
	commentContainer: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(20),
		paddingRight: theme.spacing(20),
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
		},
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
		<Grid container direction = 'row' justify = 'flex-start'>
			<Container className = { classes.container }>
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
			<Grid container spacing = {2}>
				{ 	data && data.test.comments.map(comment => {
					return (
						<Grid item xs = {12}>
							<Card variant = 'outlined'>
								<CardHeader
									avatar = { <AccountCircleIcon /> }
									action = {
										<IconButton>
											<MoreVertIcon />
										</IconButton>
									}
									title = { comment.user }
									subheader ={ comment.created }
									className = { classes.cardHeader }
								/>
								<CardContent className = { classes.cardContent }>
									<Text value = { comment.content } />
								</CardContent>
							</Card>
						</Grid>
					)
				})}
			</Grid>
			<Grid container spacing = {2}>
				<Grid item xs = {11}>
					<CommentInput onChange = { (event) => setComment(event.target.value) } />
				</Grid>
				<Grid item xs = {1}>
					<ActionButton value = { <SendIcon /> }/>
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

