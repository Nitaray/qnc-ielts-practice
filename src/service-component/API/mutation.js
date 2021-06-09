import gql from "graphql-tag";

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

export const SIGNUP_MUTATION = gql`
     mutation signup($user: UserInput!) {
          signup(user: $user) {
               token
          }
     }
     `;

export const REFRESHJWT_MUTATION = gql`
     mutation refreshJWT {
          refreshJWT {
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

export const CREATECOMMENT_MUTATION = gql`
    mutation createComment($comment: CommentInput!) {
        createComment(comment: $comment) {
            id
        }
    }
`;

export const DETELECOMMENT_MUTATION = gql`
    mutation deleteComment($commentId: Int!) {
        deleteComment(commentId: $commentId) {
            id
        }
    }
`;



