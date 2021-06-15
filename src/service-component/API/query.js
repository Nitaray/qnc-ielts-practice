import gql from 'graphql-tag';

export const ALLTEST_QUERY = gql`
    query allTests {
        allTests {
            id
            title
            type
        }
    }
`;

export const DONETEST_BYUSERID_QUERY = gql`
	query getUserById($id: Int!) {
		getUserById(id: $id) {
			doneTests {
				id
			}
		}
	}
`;

export const TEST_BYID_QUERY = gql` 	
	query getTestById($id: Int!) {
		getTestById(id: $id) {
			id
			type
			sections {
				id
 				order
				type
				statementText
				statementAudio
				questionGroups {
					id
					order
					introText
					questions {
						id
						order
						type
						statementText
						answers {
							id
							text
						}
					}
				}
			}
		}
	}
`;

/*
 export const TESTRESULT_BYID_QUERY = gql`
     query getTestResult($userId: Int!, $testId: Int!) {
         getTestResult(userId: $userId, testId: $testId) {
             test {
                 type
                 sections {
                     order
                     type
                     statementText
                     statementAudio
                     questionList {
                         order
                         introText
                         questions {
                             order
                             statementText
                         }
                     }
                 }
             }
 			score
 			answerHistory {
 				question {
 					order
 				}
 				answer {
 					text
 				}
 			}
         }
     }
 `;

 export const TESTDONEYET_BYID_QUERY = gql`
 	query getTestResult($userId: Int!, $testId: Int!) {
     	getTestResult(userId: $userId, testId: $testId) {
     		test {
     			id
     		}
     		score
     	}
     }
 `;
*/