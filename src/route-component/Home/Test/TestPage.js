import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import { useParams } from "react-router-dom";
import { getCommentByTestId, getTestById } from "../../../service-component/API/test";
import { ActionButton } from "../../../presentational-components/Button";
import { ReadingTest } from "../../../container-components/Test/Test";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import * as PropTypes from "prop-types";
import HelpIcon from '@material-ui/icons/Help';
import CommentIcon from '@material-ui/icons/Comment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Card from "@material-ui/core/Card";
import { CardContent } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import CardHeader from "@material-ui/core/CardHeader";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Text } from "../../../presentational-components/Text";

const useStyles = makeStyles((theme) => ({
	container: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(8),
		paddingBottom: theme.spacing(4),
		paddingRight: theme.spacing(8)
	},
}));

export default function TestPage() {
	const [tab, setTab] = React.useState('doTest');

	const handleTabChange = (event, tab) => {
		setTab(tab);
	};

	return (
		<React.Fragment>
			<Grid container direction = 'row' justify = 'flex-start'>
				<Grid item xs = {1}>
					<Tabs value = { tab } orientation = "vertical" onChange = { handleTabChange }>
						<Tab icon = { <HelpIcon /> } value = 'doTest'/>
						<Tab icon = { <CommentIcon /> } value = 'commentTest'/>
						<Tab icon = { <AssignmentTurnedInIcon /> } value = 'resultTest'/>
					</Tabs>
				</Grid>
				<Grid item xs = {11}>
					{ tab === 'doTest' && <DoTest /> }
					{ tab === 'commentTest' && <CommentTest />}
					{ tab === 'resultTest' && <ResultTest /> }
				</Grid>
			</Grid>
		</React.Fragment>
	)
};

function DoTest() {
	const classes = useStyles();
	const [answers, setAnswers] = useState([]);
	const [data, setData] = useState(null);

	let { id } = useParams();
	useEffect(() => {
		const data = getTestById(id);
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
function CommentTest() {
	const classes = useStyles();
	const [data, setData] = useState(null);
	let { id } = useParams();

	useEffect(() => {
		const data = getCommentByTestId(id);
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
								/>
								<CardContent>
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
function ResultTest() {
	const classes = useStyles();
	const [answers, setAnswers] = useState([]);
	const [data, setData] = useState(null);

	let { id } = useParams();
	useEffect(() => {
		const data = getTestById(id);
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

