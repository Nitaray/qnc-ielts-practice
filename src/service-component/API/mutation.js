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