import React, { useContext, useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { AuthorizationContext } from "../../../service-component/Context/authorization";
import { Redirect } from "react-router-dom";
import { TextWithLink, TitleText } from "../../../presentational-components/Text";
import Grid from "@material-ui/core/Grid";
import { ActionButton } from "../../../presentational-components/Button";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Box from "@material-ui/core/Box";
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import { useMutation } from "@apollo/client";
import {
	ADDANSWER_MUTATION,
	ADDQUESTION_MUTATION,
	ADDQUESTIONGROUP_MUTATION,
	ADDTEST_MUTATION,
	ADDTESTSECTION_MUTATION
} from "../../../service-component/API/mutation";
import { ErrorDialog, LoadingDialog } from "../../../presentational-components/Dialog";
import { ListeningChip, ReadingChip } from "../../../presentational-components/Chip";

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	createTestContainer: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	testContainer: {
		paddingTop: theme.spacing(4),
		paddingLeft: theme.spacing(8),
		paddingBottom: theme.spacing(4),
		paddingRight: theme.spacing(8)
	},
	testSectionContainer: {
		paddingLeft: theme.spacing(2),
	},
	questionGroupContainer: {
		paddingLeft: theme.spacing(2),
	},
	questionContainer: {
		paddingLeft: theme.spacing(2),
	},
	answerContainer: {
		paddingLeft: theme.spacing(4),
	},
}));

export default function AddTestPage() {
	const classes = useStyles();
	const [authorization] = useContext(AuthorizationContext);
	const [testInfo, setTestInfo] = useState(null);
	const [finished, setFinished] = useState(false);

	const handleCreateTest = (id, title, type) => {
		setTestInfo({
			id: id,
			title: title,
			type: type,
		});
	}

	if (!authorization.token || authorization.user.role.name.toLowerCase() !== 'admin') return <Redirect to = '/' />;
	return (
		<React.Fragment>
			{
				testInfo
					? finished
					?
					<Container maxWidth = 'xs' className = { classes.createTestContainer }>
						<TitleText value = "Test successfully created" fontSize = "18px"/>
						<TextWithLink value = 'Go back to homepage' to = '/' />
					</Container>
					:
					<React.Fragment>
						<Grid container direction = 'row' justify = 'center' alignItems = 'center'>
							<Grid item xs = {12} sm = {12}>
								<AddTest { ...testInfo }/>
							</Grid>
							<Grid item xs = {12} sm = {6}>
								<ActionButton value = 'Finish' onClick = { () => setFinished(true) } />
							</Grid>
						</Grid>
					</React.Fragment>
					:
					<CreateTest onClick = { (id, title, type) => handleCreateTest(id, title, type) } />
			}
		</React.Fragment>
	);
}

function CreateTest(props) {
	const classes = useStyles();
	const [testInput, setTestInput] = useState({
		title: '',
		type: '',
	});
	const [createTest, { loading }] = useMutation(ADDTEST_MUTATION);
	const [error, setError] = useState(null);

	const handleCreateTest = () => {
		if (testInput.title.trimStart() === '' || testInput.type.trimStart() === '') {
			setError('Title and type must not be null.');
		} else {
			createTest({
				variables: {
					test: {
						title: testInput.title.trim(),
						type: testInput.type,
					}
				},
			})
				.then(data => {
					props.onClick(data.data.addTest.id, data.data.addTest.title, data.data.addTest.type);
				})
				.catch(error => {
					console.log(error);
					setError("A test with the same title and type already exists!");
				});
		}
	}

	return (
		<React.Fragment>
			{ loading && <LoadingDialog open = { loading } /> }
			{ error && <ErrorDialog error = { error }
									open = { error } onClose = { () => setError(null) } /> }
			<Container maxWidth = 'xs' className = { classes.createTestContainer }>
				<TitleText value = "Create test" fontSize = "18px"/>
				<form className = { classes.form }>
					<Grid container spacing = {2}>
						<Grid item xs = {12} sm = {12}>
							<TextField
								fullWidth
								variant = 'outlined'
								label = "Title"
								value = { testInput.title }
								onChange = { (event) => setTestInput({...testInput, title: event.target.value }) }
							/>
						</Grid>
						<Grid item xs = {12} sm = {12}>
							<TextField
								select fullWidth
								variant = 'outlined'
								label = 'Type'
								value = { testInput.type }
								onChange = { (event) => setTestInput({...testInput, type: event.target.value }) }
							>
								{ ['Reading', 'Listening'].map((option) => (
									<MenuItem key = { option } value = { option }>
										{ option }
									</MenuItem>
								)) }
							</TextField>
						</Grid>
						<Grid item xs = {12} sm = {12}>
							<ActionButton value = "Create Test" onClick = { handleCreateTest }/>
						</Grid>
					</Grid>
				</form>
			</Container>
		</React.Fragment>
	);
}

function AddTest(props) {
	const classes = useStyles();
	const [numTestSection, setNumTestSection] = useState(1);

	const handleAddTestSection = () => {
		setNumTestSection(numTestSection + 1);
	}

	const generateTestSection = () => {
		let testSection = [];
		for (let i = 0; i < numTestSection; i++) {
			testSection.push(<AddTestSection { ...props }/>);
		}
		return testSection;
	}

	return (
		<Box border = {0} className = { classes.testContainer}>
			<Grid container direction = 'row' justify = 'space-evenly'
				  alignItems = 'center' spacing = {2}>
				<Grid item xs = {12} sm = {8}>
					<TitleText value = { `Title: ${props.title}` } fontSize = '18px' />
				</Grid>
				<Grid item xs = {3} sm = {1}>
					<TitleText value = { `ID: ${props.id}` } fontSize = '18px' />
				</Grid>
				<Grid item xs = {3} sm = {1}>
					{ props.type.toLowerCase() === 'reading' ? <ReadingChip /> : <ListeningChip /> }
				</Grid>
				<Grid item xs = {6} sm = {2}>
					<ActionButton value = { <AddIcon /> } onClick = { handleAddTestSection } />
				</Grid>
				<Grid item xs = {12} sm = {12}>
					{ generateTestSection() }
				</Grid>
			</Grid>
		</Box>
	)
}

function AddTestSection(props) {
	const classes = useStyles();
	const [testSectionInput, setTestSectionInput] = useState({
		testId: props.id,
		type: props.type,
		text: '',
		audio: '',
	});
	const [addTestSection, { loading }] = useMutation(ADDTESTSECTION_MUTATION);
	const [numQuestionGroup, setNumQuestionGroup] = useState(1);
	const [testSectionInfo, setTestSectionInfo] = useState(null);
	const [error, setError] = useState(null);

	const handleAddQuestionGroup = () => {
		setNumQuestionGroup(numQuestionGroup + 1);
	}

	const handleSaveTestSection = () => {
		// && here because with listening test, text can be null and vice versa, only check if both is null
		if (testSectionInput.text.trimStart() === '' && testSectionInput.audio.trimStart() === '') {
			setError('Text or audio must not be null.');
		} else {
			addTestSection({
				variables: {
					section: {
						testId: testSectionInput.testId,
						type: testSectionInput.type,
						text: testSectionInput.text.trim(),
						audio: testSectionInput.audio.trim(),
					}
				},
				errorPolicy: 'none'
			})
				.then(data => {
					setTestSectionInfo({
						id: data.data.addTestSection.id,
					});
				})
				.catch(error => {
					console.log(error);
				});
		}
	}

	const generateQuestionGroup = () => {
		let questionGroup = [];
		for (let i = 0; i < numQuestionGroup; i++) {
			questionGroup.push(<AddQuestionGroup { ...testSectionInfo }/>);
		}
		return questionGroup;
	}

	return (
		<React.Fragment>
			{ loading && <LoadingDialog open = { loading } /> }
			{ error && <ErrorDialog error = { error }
									open = { error } onClose = { () => setError(null) } /> }
			<Box border = {0} className = { classes.testSectionContainer }>
				<Grid container direction = 'row' justify = 'space-evenly' spacing = {2}>
					<Grid item xs = {12} sm = {10}>
						<TextField
							fullWidth multiline
							disabled = { testSectionInfo }
							size = 'small'
							variant = 'outlined'
							label = 'Section statement text'
							value = { testSectionInput.text }
							onChange = { (event) => setTestSectionInput({...testSectionInput, text: event.target.value }) }
						/>
					</Grid>
					<Grid item xs = {12} sm = {2}>
						{ testSectionInfo
							? <ActionButton value = { <AddIcon /> } onClick = { handleAddQuestionGroup } />
							: <ActionButton value = { <SaveIcon /> } onClick = { handleSaveTestSection } /> }
					</Grid>
					{ testSectionInfo &&
					<Grid item xs = {12} sm = {12}>
						{ generateQuestionGroup() }
					</Grid> }
				</Grid>
			</Box>
		</React.Fragment>
	)
}

function AddQuestionGroup(props) {
	const classes = useStyles();
	const [questionGroupInput, setQuestionGroupInput] = useState({
		sectionId: props.id,
		introText: '',
	});
	const [addQuestionGroup, { loading }] = useMutation(ADDQUESTIONGROUP_MUTATION);
	const [questionGroupInfo, setQuestionGroupInfo] = useState(null);
	const [numQuestion, setNumQuestion] = useState(1);
	const [error, setError] = useState(null);

	const handleAddQuestion = () => {
		setNumQuestion(numQuestion + 1);
	}

	const handleSaveQuestionGroup = () => {
		if (questionGroupInput.introText.trimStart() === '') {
			setError('Intro text for question group must not be null.');
		} else {
			addQuestionGroup({
				variables: {
					group: {
						sectionId: questionGroupInput.sectionId,
						introText: questionGroupInput.introText.trim(),
					}
				},
				errorPolicy: 'none',
			})
				.then(data => {
					console.log(data);
					setQuestionGroupInfo({
						id: data.data.addQuestionGroup.id,
					});
					console.log(data)
				})
				.catch(error => console.log(error))
		}
	}

	const generateQuestion = () => {
		let question = [];
		for (let i = 0; i < numQuestion; i++) {
				question.push(<AddQuestion { ...questionGroupInfo }/>);
		}
		return question;
	}

	return (
		<React.Fragment>
			{ loading && <LoadingDialog open = { loading } /> }
			{ error && <ErrorDialog error = { error }
									open = { error } onClose = { () => setError(null) } /> }
			<Box border = {0} className = { classes.questionGroupContainer }>
				<Grid container direction = 'row' justify = 'space-evenly' spacing = {2}>
					<Grid item xs = {12} sm = {10}>
						<TextField
							fullWidth multiline
							disabled = { questionGroupInfo }
							size = 'small'
							variant = 'outlined'
							label = 'Introduction text'
							value = { questionGroupInput.introText }
							onChange = { (event) => setQuestionGroupInput({...questionGroupInput, introText: event.target.value }) }
						/>
					</Grid>
					<Grid item xs = {12} sm = {2}>
						{ questionGroupInfo
							? <ActionButton value = { <AddIcon /> } onClick = { handleAddQuestion } />
							: <ActionButton value = { <SaveIcon /> } onClick = { handleSaveQuestionGroup } /> }
					</Grid>
					{ questionGroupInfo &&
					<Grid item xs = {12} sm = {12}>
						{ generateQuestion() }
					</Grid> }
				</Grid>
			</Box>
		</React.Fragment>
	)
}

function AddQuestion(props) {
	const classes = useStyles();
	const [questionInput, setQuestionInput] = useState({
		questionGroupId: props.id,
		type: '',
		statementText: '',
	});
	const [addQuestion, { loading }] = useMutation(ADDQUESTION_MUTATION);
	const [questionInfo, setQuestionInfo] = useState(null);
	const [numAnswer, setNumAnswer] = useState(1);
	const [error, setError] = useState(null);

	const handleSaveQuestion = () => {
		if (questionInput.type.trimStart() === '' || questionInput.statementText.trimStart() === '') {
			setError('Type or statement text must not be null.');
		} else {
			addQuestion({
				variables: {
					question: {
						questionGroupId: questionInput.questionGroupId,
						type: questionInput.type.trim(),
						statementText: questionInput.statementText.trim(),
					}
				},
				errorPolicy: 'none',
			})
				.then(data => {
					console.log(data);
					setQuestionInfo({
						id: data.data.addQuestion.id,
					});
				})
				.catch(error => console.log(error));
		}
	}

	const handleAddAnswer = () => {
		setNumAnswer(numAnswer + 1);
	}

	const generateAnswer = () => {
		let answer = [];
		for (let i = 0; i < numAnswer; i++) {
			answer.push(<AddAnswer { ...questionInfo }/>);
		}
		return answer;
	}

	return (
		<React.Fragment>
			{ loading && <LoadingDialog open = { loading } /> }
			{ error && <ErrorDialog error = { error }
									open = { error } onClose = { () => setError(null) } /> }
			<Box border = {0} className = { classes.questionContainer }>
				<Grid container direction = 'row' justify = 'space-evenly' spacing = {2}>
					<Grid item xs = {12} sm = {10}>
						<TextField
							fullWidth multiline
							disabled = { questionInfo }
							size = 'small'
							variant = 'outlined'
							label = 'Question statement'
							value = { questionInput.statementText }
							onChange = { (event) => setQuestionInput({...questionInput, statementText: event.target.value }) }
						/>
					</Grid>
					<Grid item xs = {6} sm = {1}>
						<TextField
							select fullWidth
							disabled = { questionInfo }
							size = 'small'
							variant = 'outlined'
							label = 'Type'
							value = { questionInput.type }
							onChange = { (event) => setQuestionInput({...questionInput, type: event.target.value }) }
						>
							{ ['FITB', 'MC', 'TF'].map((option) => (
								<MenuItem key = { option } value = { option }>
									{ option }
								</MenuItem>
							)) }
						</TextField>
					</Grid>
					<Grid item xs = {6} sm = {1}>
						{ questionInfo
							? <ActionButton value = { <AddIcon /> } onClick = { handleAddAnswer } />
							: <ActionButton value = { <SaveIcon /> } onClick = { handleSaveQuestion } /> }
					</Grid>
					{ questionInfo &&
					<Grid item xs = {12} sm = {12}>
						{ generateAnswer() }
					</Grid> }
				</Grid>
			</Box>
		</React.Fragment>

	);
}

function AddAnswer(props) {
	const classes = useStyles();
	const [answerInput, setAnswerInput] = useState({
		questionId: props.id,
		text: '',
		isCorrect: false,
	});
	const [addAnswer, { loading }] = useMutation(ADDANSWER_MUTATION);
	const [error, setError] = useState(null);
	const [answerInfo, setAnswerInfo] = useState(null);

	const handleSaveAnswer = () => {
		if (answerInput.text.trimStart() === '') {
			setError('Answer must not be null');
		} else {
			addAnswer({
				variables: {
					answer: {
						questionId: answerInput.questionId,
						text: answerInput.text.trim(),
						isCorrect: answerInput.isCorrect,
					}
				},
				errorPolicy: 'none'
			})
				.then(data => {
					setAnswerInfo({
						id: data.data.addAnswer.id,
					});
				})
				.catch(error => {
					console.log(error);
					setError("This answer is already assigned to this question.");
				})
		}
	}

	return (
		<React.Fragment>
			{ loading && <LoadingDialog open = { loading } /> }
			{ error && <ErrorDialog error = { error }
									open = { error } onClose = { () => setError(null) } /> }
			<Box border = {0} className = { classes.answerContainer }>
				<Grid container direction = 'row' justify = 'space-evenly' spacing = {2}>
					<Grid item xs = {12} sm = {11}>
						<TextField
							fullWidth multiline
							disabled = { answerInfo }
							size = 'small'
							variant = 'outlined'
							label = 'Answer text'
							value = { answerInput.text }
							onChange = { (event) => setAnswerInput({...answerInput, text: event.target.value }) }
							InputProps = {{
								endAdornment:
									<InputAdornment position = "end">
										<IconButton
											disabled = { answerInfo }
											onClick = { () => setAnswerInput({...answerInput, isCorrect: !answerInput.isCorrect }) }>
											{ answerInput.isCorrect ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon /> }
										</IconButton>
										Correct answer
									</InputAdornment>,
							}}
						/>
					</Grid>
					<Grid item xs = {12} sm = {1}>
						{ answerInfo == null && <ActionButton value = { <SaveIcon /> } onClick = { handleSaveAnswer } /> }
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	)
}