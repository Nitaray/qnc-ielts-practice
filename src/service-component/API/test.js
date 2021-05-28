
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
		createData('1','History of Homo Sapiens', 'Reading', '17/08/2021', 'done'),
		createData('2','Evolution of hours', 'Reading', '17/08/2021', 'done'),
		createData('3','How to build a house?', 'Reading', '17/08/2021', 'done'),
		createData('4','How to raise child?', 'Listening', '17/08/2021', 'todo'),
		createData('1','History of Homo Sapiens', 'Reading', '17/08/2021', 'done'),
		createData('2','Evolution of hours', 'Listening', '17/08/2021', 'done'),
		createData('3','How to build a house?', 'Listening', '17/08/2021', 'done'),
		createData('4','How to raise child?', 'Reading', '17/08/2021', 'todo'),
		createData('1','History of Homo Sapiens', 'Listening', '17/08/2021', 'done'),
		createData('2','Evolution of hours', 'Reading', '17/08/2021', 'todo'),
		createData('3','How to build a house?', 'Listening', '17/08/2021', 'done'),
		createData('10','How to raise child?', 'Reading', '17/08/2021', 'todo'),
	];
}

function createData(id, title, type, created, status) {
	return { id, title, type, created, status };
}
