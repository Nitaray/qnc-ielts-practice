import React, { useContext, useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import { Redirect, useParams } from "react-router-dom";
import { Comment } from "../../../presentational-components/Comment";
import { AuthorizationContext } from "../../../service-component/Context/authorization";
import { useQuery } from "@apollo/client";
import { TESTCOMMENT_BYID_QUERY, TESTDONEYET_BYID_QUERY } from "../../../service-component/API/query";
import { LoadingDialog } from "../../../presentational-components/Dialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Text, TitleText } from "../../../presentational-components/Text";
import { ListeningChip, ReadingChip } from "../../../presentational-components/Chip";
import CheckIcon from "@material-ui/icons/Check";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Paper from "@material-ui/core/Paper";
import ClearIcon from '@material-ui/icons/Clear';
import Toolbar from "@material-ui/core/Toolbar";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: theme.spacing(2, 24, 2, 24),
		padding: theme.spacing(2, 8, 2, 8),
	},
	toolbar: {
		justifyContent: 'space-between',
		overflowX: 'auto',
	},
}));

export default function ViewTestPage() {
	const { id } = useParams();
	const [authorization] = useContext(AuthorizationContext);
	const testDoneYet = useQuery(TESTDONEYET_BYID_QUERY, {
		variables: {
			userId: parseInt(authorization.user.id, 10),
			testId: parseInt(id, 10),
		}
	});
	const testComment = useQuery(TESTCOMMENT_BYID_QUERY, {
		variables: {
			id: parseInt(id, 10),
		}
	});

	// if query test result caused error, redirect to do test.
	if (testDoneYet.error) return <Redirect to = {`/do/${id}`} />
	if (testDoneYet.data) console.log(testDoneYet.data);
	return (
		<React.Fragment>
			{ (testDoneYet.loading || testComment.loading)
				?
				<LoadingDialog open = { (testDoneYet.loading || testComment.loading) } />
				:
				<React.Fragment>
					<ResultTest { ...testDoneYet.data.getTestResult } />
					<CommentTest { ...testComment.data.getTestById } />
				</React.Fragment>
			}
		</React.Fragment>
	)
};

function ResultTest(props) {
	const classes = useStyles();

	return (
		<Paper variant = 'outlined' className = { classes.root }>
			<Toolbar className = { classes.toolbar }>
				<div>
					<TitleText value = { props.test.title } />
				</div>
				<div>
					<TitleText value = { `Your score: ${props.score}` } />
				</div>
				<div>
					{ props.test.type.toLowerCase() === 'reading' ? <ReadingChip /> : <ListeningChip /> }
				</div>
			</Toolbar>
			<TableContainer>
				<Table size = 'small'>
					<TableHead>
						<TableRow>
							{ ["Question", "Correct Answer", "Your Answer", "Matched"].map((title) =>
									<TableCell align = 'left'>
										<TitleText value={ title }/>
									</TableCell>
								)}
						</TableRow>
					</TableHead>
					<TableBody>
						{
							props.answerHistory.map(answer => {
								return (
									<TableRow>
										<TableCell align = 'left'>
											<Text value = { answer.question.statementText } />
										</TableCell>
										<TableCell align = 'left'>
											<Text value = { answer.question.trueAnswer[0] ? answer.question.trueAnswer[0].text : '' } />
										</TableCell>
										<TableCell align = 'left'>
											<Text value = { answer.answer ? answer.answer.text : '' } />
										</TableCell>
										<TableCell align = 'left'>
											{
												(answer.answer.text === (answer.question.trueAnswer[0] ? answer.question.trueAnswer[0].text : ''))
												? <CheckIcon /> : <ClearIcon />
											}
										</TableCell>
									</TableRow>
								)
							})
						}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}

function CommentTest(props) {
	const { id } = useParams();
	const classes = useStyles();
	const [comments, setComments] = useState([]);

	useEffect(() => {
		setComments(props.comments);
	});

	return (
		<Paper variant = 'outlined' className = { classes.root }>
			<Grid container direction = 'row' justify = 'space-evenly' spacing = {2}>
				<Grid item xs = {12}>
					<Comment testId = { id } comments = { comments } />
				</Grid>
			</Grid>
		</Paper>
	)
}



