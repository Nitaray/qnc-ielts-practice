
/*	****** QUERY ALL TEST
return LIST OF TEST;
	each element has { id, title, type, created, status }

**************************** */
export function allTest() {
	return [
		createData('1','History of Homo Sapiens', 'Reading', '17/08/2021', 'todo'),
		createData('2','Evolution of hours', 'Listening', '17/08/2021', 'done'),
		createData('3','How to build a house?', 'Reading', '17/08/2021', 'done'),
		createData('4','How to raise child?', 'Listening', '17/08/2021', 'todo'),
		createData('5','History of Homo Sapiens', 'Reading', '17/08/2021', 'done'),
		createData('6','Evolution of hours', 'Reading', '17/08/2021', 'done'),
		createData('7','How to build a house?', 'Reading', '17/08/2021', 'done'),
		createData('8','How to raise child?', 'Listening', '17/08/2021', 'todo'),
		createData('9','History of Homo Sapiens', 'Reading', '17/08/2021', 'done'),
		createData('10','Evolution of hours', 'Listening', '17/08/2021', 'done'),
		createData('11','How to build a house?', 'Listening', '17/08/2021', 'done'),
		createData('12','How to raise child?', 'Reading', '17/08/2021', 'todo'),
		createData('13','History of Homo Sapiens', 'Listening', '17/08/2021', 'done'),
		createData('14','Evolution of hours', 'Reading', '17/08/2021', 'todo'),
		createData('15','How to build a house?', 'Listening', '17/08/2021', 'done'),
		createData('16','How to raise child?', 'Reading', '17/08/2021', 'todo'),
	];
}

function createData(id, title, type, created, status) {
	return { id, title, type, created, status };
}

/*	****** QUERY TEST :id


**************************** */
export function getTestById(id) {
	const TESTBYID_QUERY = `
	{
		test {
			id
			type
			sections {
				id
				number
				type
				statementText
				statementAudio
				questionList {
					id
					number
					introText
					questions {
						id
						number
						type
						statementText
						answer {
							text
						}
					}
				}
			}
		}
	}`;

	const data = {
		test: {
			id: '1',
			type: 'reading',
			sections: [
				{
					id: '1',
					number: '1',
					type: 'TFNG',
					statementText: 'Prof Zeman tells the BBC: "People who have contacted us say they are really delighted that this has been recognised and has been given a name, because they have been trying to explain to people for years that there is this oddity that they find hard to convey to others." How we imagine is clearly very subjective - one person\'s vivid scene could be another\'s grainy picture. But Prof Zeman is certain that aphantasia is real. People often report being able to dream in pictures, and there have been reported cases of people losing the ability to think in images after a brain injury.',
					statementAudio: '',
					questionList: [
						{
							id: '1', number: '1', introText:
								'Do the following statements agree with the information in the IELTS reading text?\n' + '\n' +
								'In boxes 1-5 on your answer sheet, write\n' +
								'\n' +
								'TRUE if the statement agrees with the information\n' +
								'\n' +
								'FALSE if the statement contradicts the information\n' +
								'\n' +
								'NOT GIVEN if there is no information on this',
							questions: [
								{
									id: '1', number: '1', type: 'TFNG',
									statementText: 'Aphantasia is a condition, which describes people, for whom it is hard to visualise mental images.',
									answer: ['True', 'False', 'Not Given'],
								},
								{
									id: '2', number: '2', type: 'TFNG',
									statementText: 'Aphantasia is a condition, which describes people, for whom it is hard to visualise mental images.',
									answer: ['True', 'False', 'Not Given'],
								},{
									id: '3', number: '3', type: 'TFNG',
									statementText: 'Aphantasia is a condition, which describes people, for whom it is hard to visualise mental images.',
									answer: ['True', 'False', 'Not Given'],
								},
								{
									id: '4', number: '4', type: 'TFNG',
									statementText: 'Aphantasia is a condition, which describes people, for whom it is hard to visualise mental images.',
									answer: ['True', 'False', 'Not Given'],
								},
								{
									id: '5', number: '5', type: 'TFNG',
									statementText: 'Aphantasia is a condition, which describes people, for whom it is hard to visualise mental images.',
									answer: ['True', 'False', 'Not Given'],
								}
							]
						}, {
							id: '2', number: '2', introText:
								'Do the following statements agree with the information in the IELTS reading text?\n' + '\n' +
								'In boxes 1-5 on your answer sheet, write\n' +
								'\n' +
								'TRUE if the statement agrees with the information\n' +
								'\n' +
								'FALSE if the statement contradicts the information\n' +
								'\n' +
								'NOT GIVEN if there is no information on this',
							questions: [
								{
									id: '1', number: '6', type: 'FITB',
									statementText: 'Only a small fraction of people have imagination as ___________________ as Lauren does.',
									answer: ['A', 'B', 'C'],
								},
								{
									id: '2', number: '7', type: 'FITB',
									statementText: 'Hyperphantasia is ___________________ to aphantasia.',
									answer: ['A', 'B', 'C'],
								},{
									id: '3', number: '8', type: 'FITB',
									statementText: 'There are a lot of subjectivity in comparing people\'s imagination - somebody\'s vivid scene could be another person\'s ___________________.',
									answer: ['True', 'False', 'Not Given'],
								},
							]
						}, {
							id: '3', number: '3', introText:
								'Do the following statements agree with the information in the IELTS reading text?\n' + '\n' +
								'In boxes 1-5 on your answer sheet, write\n' +
								'\n' +
								'TRUE if the statement agrees with the information\n' +
								'\n' +
								'FALSE if the statement contradicts the information\n' +
								'\n' +
								'NOT GIVEN if there is no information on this',
							questions: [
								{
									id: '1', number: '9', type: 'MC',
									statementText: 'Only a small fraction of people have imagination as ___________________ as Lauren does.',
									answer: ['A. He is the boy', 'B. She is a girl', 'C. Hahaa'],
								},
								{
									id: '2', number: '10', type: 'MC',
									statementText: 'Hyperphantasia is ___________________ to aphantasia.',
									answer: ['A. askhdasd', 'B. asdasdasd', 'C. asdasddasdas', 'D. asdasdasddas'],
								},{
									id: '3', number: '11', type: 'MC',
									statementText: 'There are a lot of subjectivity in comparing people\'s imagination - somebody\'s vivid scene could be another person\'s ___________________.',
									answer: ['A. askhdasd', 'B. asdasdasd', 'C. asdasddasdas', 'D. asdasdasddas', 'E. qweqweqweqweq'],
								},
							]
						}
					]
				}
			]
		}
	};

	return data;
}
