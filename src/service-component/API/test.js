export function getCommentByTestId(id) {
	const COMMENTBYTESTID_QUERY = `
	{
		test(id: ${id}) {
			comments {
				id
				user
				content
				created
			}
		}
	}`

	const data = {
		test: {
			comments: [
				{
					id: '1',
					user: 'user1',
					content: 'Many students find the listening section the hardest, largely because the amount of information that you have to hear and remember before answering the questions.  This requires a lot of concentration, which can get tiring if you haven’t listened to lots of authentic English speech (TV shows for example) and are unfamiliar with different English dialects.',
					created: '1622800555'
				},{
					id: '2',
					user: 'user2',
					content: 'The speaking section is the part that the majority of students will be most comfortable with, as they have practiced it the most.  However, the area most students find hard is staying on topic and giving complete answers. For this assessment, I advise you to have a native English speaker help in the evaluation.',
					created: '1622800000'
				},{
					id: '3',
					user: 'user3',
					content: 'The hardest part about the reading section is that there is basically too much to read in the time given.  You have to read up to 2500 words and answer 40 questions in just 60 minutes. If you are a student who is comfortable with skimming and scanning you will find this section much easier than other students. Another aspect that students find challenging is the amount of academic vocabulary, which is often difficult unless you’ve had a lot of exposure to news articles.',
					created: '1522800000',
				}
			]
		}
	}

	return data;
}
