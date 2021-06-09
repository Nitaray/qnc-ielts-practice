import gql from 'graphql-';
import { getTestById } from "./test";

export const SIGNIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                id
                username
                role {
                    name
                }
            }
        }
    }
`;

export const ALLTEST_QUERY = gql`
    query allTests {
        allTests {
            id
            title
            type
        }
    }
`;

export const TESTBYID_QUERY = gql`
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
                questionList {
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

export const TESTRESULT_QUERY = gql`
    query getTestResult($userId: Int!, $testId: Int!) {
        getTestResult(userId: $userId, testId: $testId) {
            test {
                id
                type
                sections {
                    id
                    order
                    type
                    statementText
                    statementAudio
                    questionList {
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
			score
			answerHistory {
				question {
					id
					order
				}
				answer {
					id
					text
				}
			}
        }
    }
`;