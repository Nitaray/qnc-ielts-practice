import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import NavigationBar from "../../presentational-components/NavigationBar";
import TestTable from "../../container-components/Test/TestTable";
import { useParams } from "react-router-dom";
import { getTestById } from "../../service-component/API/test";
import { ReadingPassage, MCAnswer, MCQuestion } from "../../presentational-components/Test";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	content: {
		flexGrow: 1,
		overflow: 'auto'
	},
	appBarSpacer: theme.mixins.toolbar,
	container: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(8),
		paddingBottom: theme.spacing(4),
		paddingRight: theme.spacing(8)
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
		height: 'auto'
	},
	tableHead: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
		fontWeight: 'bold',
	},
	readingPassage: {
		padding: theme.spacing(2),
	}
}));

export default function HomePage() {
	const classes = useStyles();
	let { id } = useParams();
	const data = getTestById(id);

	return (
		<div className = { classes.root }>
			<NavigationBar />
			<div className = {classes.content}>
				<div className = {classes.appBarSpacer}/>
				<Container className = {classes.container}>
					<Grid container spacing = {3}>
						<Grid item xs = {9}>
							<Paper variant = 'outlined' className = { classes.paper }>
								{
									(data.test.type.toLowerCase() === 'reading')
										? data.test.sections.map((section) => {
										return (
											<React.Fragment>
												<ReadingPassage section = { section.number } passage = { section.statementText } />
												{
													(section.type === 'MC') ?
														(section.questionList.map((list) => {
															return (
																<React.Fragment>
																	{
																		list.questions.map((question) => (
																			<MCQuestion number = { question.number } statementText = { question.statementText } />
																		))
																	}
																</React.Fragment>
															)
														}))
														: (<div></div>)
												}
											</React.Fragment>
										)
									}) : <div></div>
								}
							</Paper>
						</Grid>
						<Grid item xs = {3}>
							<Paper variant = 'outlined' className = {classes.paper}>
								{

								}
							</Paper>
						</Grid>
					</Grid>
				</Container>
			</div>
		</div>
	);
};

