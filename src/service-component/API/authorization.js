

/*	****** SIGN IN AUTHORIZATION
signInInfo: {
	email: String,
	password: String,
}

return boolean;
**************************** */
export function signIn(signInInfo) {
	if (signInInfo['email'] === '123' && signInInfo['password'] === '123') {
		return true;
	} else {
		alert("Please use fake account to grant access:\nEmail: 123\nPassword: 123\n\nAPI needed for authorization.");
		return false;
	}
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




