import React, { useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { QuestionGroup, ReadingPassage } from "./Question";
import { AnswerGroup } from "./Answer";
import LinearProgress from "@material-ui/core/LinearProgress";
import AppBar from "@material-ui/core/AppBar";
import Zoom from "@material-ui/core/Zoom";
import Card from "@material-ui/core/Card";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const useStyles = makeStyles((theme) => ({
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		height: 'auto'
	},
	card: {
		borderRadius: '50px',
	},
	timer: {
		top: 'auto',
		bottom: 0,
	},
	zoom: {
		position: 'fixed',
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	alert: {
		fontWeight: 'bold',
		backgroundColor: 'white',
	}
}));

export function ReadingTest(props) {
	const classes = useStyles();

	return (
		(props.sections.map(section => (
			<Grid container spacing = {3}>
				<Grid item xs = {12}>
					<Paper variant = 'outlined' className = { classes.paper }>
						<ReadingPassage section = { section.number } passage = { section.statementText } />
					</Paper>
				</Grid>
				<Grid item xs = {9}>
					<Paper variant = 'outlined' className = { classes.paper }>
						<QuestionGroup questionList = { section.questionList } />
					</Paper>
				</Grid>
				<Grid item xs = {3}>
					<Paper variant = 'outlined' className = {classes.paper}>
						<AnswerGroup questionList = { section.questionList } answers = { props.answers }
									 onAnswer = { props.onAnswer }/>
					</Paper>
				</Grid>
			</Grid>
		)))
	)
}

export function TestTimer(props) {
	const classes = useStyles();
	const [progress, setProgress] = useState(0);
	const [alert, setAlert] = useState(null);

	useEffect(() => {
		const timer = setInterval(() => {
			setProgress((progress) => {
				if (progress === 100) {
					clearInterval(timer);
				}
				const diff = 100 / (props.minutes * 60);
				// console.log(progress + diff + ' is ' + (progress + diff) * 180);
				return Math.min(progress + diff, 100);
			});
		}, 1000);
	}, []);

	useEffect(() => {
		if (progress >= 100) {
			setAlert(`${props.reviewMinutes} minutes to review your result.`);
			setTimeout(() => {
				props.onTimeOut();
			}, props.reviewMinutes * 60 * 1000);
		}
		else if (progress >= 83 && progress <= 85) setAlert('Only 10 minutes left.');
		else if (progress >= 66 && progress <= 68) setAlert('20 minutes left. You should do section 3 now!');
		else if (progress >= 33 && progress <= 35) setAlert('20 minutes passed!');
		else setAlert(null);
	}, [progress]);

	return (
		<React.Fragment>
			<AppBar position = 'fixed' className = { classes.timer }>
				<div style = {{ width: '100%' }}>
					<LinearProgress variant = "determinate" value = { progress } />
				</div>
			</AppBar>
			<AlertTimer alert = { alert } />
		</React.Fragment>
	);
}

export function AlertTimer(props) {
	const classes = useStyles();

	return (
		<Box className = { classes.zoom } position = 'fixed' zIndex = "tooltip">
			<Zoom in = { props.alert } >
				<Card variant = 'outlined' classes = {{ root: classes.card }}>
					<List className = { classes.alert }>
						<ListItem>
							<ListItemIcon>
								<PriorityHighIcon />
							</ListItemIcon>
							<ListItemText primary = { props.alert } />
						</ListItem>
					</List>
				</Card>
			</Zoom>
		</Box>
	);
}




