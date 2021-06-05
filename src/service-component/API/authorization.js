import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

/*	****** SIGN IN AUTHORIZATION
signInInfo: {
	email: String,
	password: String,
}

return boolean;
**************************** */

// const GET_DOG = gql`
//   query GetDog($dogId: ID!) {
//     dog(id: $dogId) {
//       name
//       breed
//     }
//   }
// `;
//
// function Dog({ id }) {
// 	const { loading, error, data } = useQuery(GET_DOG, {
// 		variables: {
// 			dogId: id
// 		},
// 	});
// 	// ...render component...
// }


export function signIn(signInInfo) {

}

/*	****** SIGN UP AUTHORIZATION
signUpInfo: {
	name: String,
	email: String,
	password: String,
}

return boolean;
**************************** */
export function signUp(signUpInfo) {
	if (signUpInfo['name'] === '123'
		&& signUpInfo['email'] === '123'
		&& signUpInfo['password'] === '123') {
		return true;
	} else {
		alert("Please use fake account to grant access:\nName: 123\nEmail: 123\nPassword: 123\n\nAPI needed for authorization.");
	}
}

/*	****** RECOVER PASSWORD
forgotPasswordInfo: {
	email: String,
}

**************************** */
export function forgotPassword(forgotPasswordInfo) {

}




