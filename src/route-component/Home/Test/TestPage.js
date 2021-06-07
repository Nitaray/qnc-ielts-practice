import React, { useContext, useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Redirect, useParams } from "react-router-dom";
import { getCommentByTestId, getTestById } from "../../../service-component/API/test";
import { ActionButton } from "../../../presentational-components/Button";
import { ReadingTest } from "../../../container-components/Test/Test";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import HelpIcon from '@material-ui/icons/Help';
import CommentIcon from '@material-ui/icons/Comment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Text } from "../../../presentational-components/Text";
import { AuthorizationContext } from "../../../service-component/Context/authorization";
import { AuthorizationContainer } from "../../../container-components/Authorization/AuthorizationContainer";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(8),
		paddingBottom: theme.spacing(4),
		paddingRight: theme.spacing(8)
	},
	cardHeader: {
		paddingBottom: theme.spacing(1),
	},
	cardContent: {
		paddingTop: theme.spacing(0),
	}
}));

export default function TestPage() {
	const { id } = useParams();
	const [tab, setTab] = React.useState('doTest');

	const handleTabChange = (event, tab) => {
		setTab(tab);
	};

	return (
		<AuthorizationContainer>
			<Grid container direction = 'row' justify = 'flex-start'>
				<Grid item xs = {1}>
					<Tabs value = { tab } orientation = "vertical" onChange = { handleTabChange }>
						<Tab icon = { <HelpIcon /> } value = 'doTest'/>
						<Tab icon = { <CommentIcon /> } value = 'commentTest'/>
						<Tab icon = { <AssignmentTurnedInIcon /> } value = 'resultTest'/>
					</Tabs>
				</Grid>
				<Grid item xs = {11}>
					{ tab === 'doTest' && <DoTest id = { id }/> }
					{ tab === 'commentTest' && <CommentTest id = { id }/>}
					{ tab === 'resultTest' && <ResultTest id = { id }/> }
				</Grid>
			</Grid>
		</AuthorizationContainer>
	)
};

function DoTest(props) {
	const classes = useStyles();
	const [answers, setAnswers] = useState([]);
	const [data, setData] = useState(null);

	useEffect(() => {
		const data = getTestById(props.id);
		setData(data);
	}, [])

	let handleAnswer = () => (answer) => {
		let elementIdx = answers.findIndex((element => element.id === answer.id));
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
		<Container className = { classes.container }>
			{
				data && (data.test.type === 'reading')
					? (<ReadingTest sections = { data.test.sections } answers = { answers }
									onAnswer = { handleAnswer() } />)
						: <div></div>
			}

			<Grid container spacing = {3}>
				<Grid item xs = {4}></Grid>
				<Grid item xs = {4}>
					<ActionButton value = 'Submit' onClick = { () => handleSubmit() }/>
				</Grid>
				<Grid item xs = {4}></Grid>
			</Grid>
		</Container>
	);
}
function CommentTest(props) {
	const classes = useStyles();
	const [data, setData] = useState(null);

	useEffect(() => {
		const data = getCommentByTestId(props.id);
		setData(data);
	}, []);

	return (
		<Container className = { classes.container }>
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
		</Container>
	)
}
function ResultTest(props) {
	const classes = useStyles();
	const [answers, setAnswers] = useState([]);
	const [data, setData] = useState(null);

	useEffect(() => {
		const data = getTestById(props.id);
		setData(data);
	}, [])

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

	return (
		<Container className = { classes.container }>
			{
				data && (data.test.type === 'reading')
					? (<ReadingTest sections = { data.test.sections } answers = { answers }
									onAnswer = { handleAnswer() } />)
					: <div></div>
			}
		</Container>
	);
}

