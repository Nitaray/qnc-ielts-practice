import React, { useContext, useEffect, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Redirect, useParams } from "react-router-dom";
import { getCommentByTestId } from "../../../service-component/API/test";
import { ReadingTest,  } from "../../../container-components/Test/Test";
import { Comment } from "../../../presentational-components/Comment";
import { AuthorizationContext } from "../../../service-component/Context/authorization";
import { useQuery } from "@apollo/client";
import { TESTDONEYET_BYID_QUERY } from "../../../service-component/API/query";
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
}));

export default function ViewTestPage() {
	const { id } = useParams();
	const [authorization] = useContext(AuthorizationContext);
	const { loading, error } = useQuery(TESTDONEYET_BYID_QUERY, {
		variables: {
			userId: parseInt(authorization.user.id, 10),
			testId: parseInt(id, 10),
		}
	});

	// if query test result caused error, redirect to do test.
	if (error) return <Redirect to = {`/do/${id}`} />
	return (
		<React.Fragment>
			{ loading
				?
				<LoadingDialog open = { loading } />
				:
				<React.Fragment>
					<ResultTest />
					<CommentTest />
				</React.Fragment>
			}
		</React.Fragment>
	)
};

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
		<Container className = { classes.testContainer }>
			{
				data && (data.test.type === 'reading')
					? (<ReadingTest sections = { data.test.sections } />)
					: <div></div>
			}
		</Container>
	);
}

