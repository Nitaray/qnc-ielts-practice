
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
	return [
		{
			section: '1',
			type: 'true-false',
			passage: 'Prof Zeman tells the BBC: "People who have contacted us say they are really delighted that this has been recognised and has been given a name, because they have been trying to explain to people for years that there is this oddity that they find hard to convey to others." How we imagine is clearly very subjective - one person\'s vivid scene could be another\'s grainy picture. But Prof Zeman is certain that aphantasia is real. People often report being able to dream in pictures, and there have been reported cases of people losing the ability to think in images after a brain injury.',
			question: {
				group: '1',
				list: [
					{
						number: '1',
						statement: 'Aphantasia is a condition, which describes people, for whom it is hard to visualise mental images.',
						answer: '',
					},{
						number: '2',
						statement: 'Niel Kenmuir was unable to count sheep in his head.',
						answer: '',
					},{
						number: '3',
						statement: 'People with aphantasia struggle to remember personal traits and clothes of different people.',
						answer: '',
					},{
						number: '4',
						statement: 'Niel regrets that he cannot portray an image of his fiancee in his mind.',
						answer: '',
					},
					{
						number: '5',
						statement: 'Inability to picture things in someone\'s head is often a cause of distress for a person.',
						answer: '',
					},
					{
						number: '6',
						statement: 'All people with aphantasia start to feel \'isolated\' or \'alone\' at some point of their lives.',
						answer: '',
					},
					{
						number: '7',
						statement: 'Lauren Beard\'s career depends on her imagination.',
						answer: '',
					},
					{
						number: '8',
						statement: 'The author met Lauren Beard when she was working on a comedy scene in her next book.',
						answer: '',
					},
				]
			}
		},{
			section: '2',
			type: 'true-false-ng',
			passage: 'Prof Zeman tells the BBC: "People who have contacted us say they are really delighted that this has been recognised and has been given a name, because they have been trying to explain to people for years that there is this oddity that they find hard to convey to others." How we imagine is clearly very subjective - one person\'s vivid scene could be another\'s grainy picture. But Prof Zeman is certain that aphantasia is real. People often report being able to dream in pictures, and there have been reported cases of people losing the ability to think in images after a brain injury.',
			question: {
				group: '1',
				list: [
					{
						number: '1',
						statement: 'Aphantasia is a condition, which describes people, for whom it is hard to visualise mental images.',
						answer: '',
					},{
						number: '2',
						statement: 'Niel Kenmuir was unable to count sheep in his head.',
						answer: '',
					},{
						number: '3',
						statement: 'People with aphantasia struggle to remember personal traits and clothes of different people.',
						answer: '',
					},{
						number: '4',
						statement: 'Niel regrets that he cannot portray an image of his fiancee in his mind.',
						answer: '',
					},
					{
						number: '5',
						statement: 'Inability to picture things in someone\'s head is often a cause of distress for a person.',
						answer: '',
					},
					{
						number: '6',
						statement: 'All people with aphantasia start to feel \'isolated\' or \'alone\' at some point of their lives.',
						answer: '',
					},
					{
						number: '7',
						statement: 'Lauren Beard\'s career depends on her imagination.',
						answer: '',
					},
					{
						number: '8',
						statement: 'The author met Lauren Beard when she was working on a comedy scene in her next book.',
						answer: '',
					},
				]
			}
		},{
			section: '3',
			type: 'true-false-ng',
			passage: 'Prof Zeman tells the BBC: "People who have contacted us say they are really delighted that this has been recognised and has been given a name, because they have been trying to explain to people for years that there is this oddity that they find hard to convey to others." How we imagine is clearly very subjective - one person\'s vivid scene could be another\'s grainy picture. But Prof Zeman is certain that aphantasia is real. People often report being able to dream in pictures, and there have been reported cases of people losing the ability to think in images after a brain injury.',
			question: {
				group: '1',
				list: [
					{
						number: '1',
						statement: 'Aphantasia is a condition, which describes people, for whom it is hard to visualise mental images.',
						answer: '',
					},{
						number: '2',
						statement: 'Niel Kenmuir was unable to count sheep in his head.',
						answer: '',
					},{
						number: '3',
						statement: 'People with aphantasia struggle to remember personal traits and clothes of different people.',
						answer: '',
					},{
						number: '4',
						statement: 'Niel regrets that he cannot portray an image of his fiancee in his mind.',
						answer: '',
					},
					{
						number: '5',
						statement: 'Inability to picture things in someone\'s head is often a cause of distress for a person.',
						answer: '',
					},
					{
						number: '6',
						statement: 'All people with aphantasia start to feel \'isolated\' or \'alone\' at some point of their lives.',
						answer: '',
					},
					{
						number: '7',
						statement: 'Lauren Beard\'s career depends on her imagination.',
						answer: '',
					},
					{
						number: '8',
						statement: 'The author met Lauren Beard when she was working on a comedy scene in her next book.',
						answer: '',
					},
				]
			}
		},
	]
}
