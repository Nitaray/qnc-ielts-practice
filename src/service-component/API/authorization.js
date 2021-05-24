

/*	****************************
signInInfo: {
	email: String,
	password: String,
}

return boolean;
**************************** */
export function signIn(signInInfo) {
	if (signInInfo['email'] === 'test@gmail.com' && signInInfo['password'] === 'test') {
		alert("Sucessful");
	} else {
		alert("Please use fake account to grant access:\nEmail: test@gmail.com\nPassword: test\n\nAPI needed for authorization.");
	}
}


/*	****************************
signUpInfo: {
	name: String,
	email: String,
	password: String,
}

return boolean;
**************************** */
export function signUp(signUpInfo) {
	if (signUpInfo['name'] === 'Test'
		&& signUpInfo['email'] === 'test@gmail.com'
		&& signUpInfo['password'] === 'test') {
		alert("Sucessful");
	} else {
		alert("Please use fake account to grant access:\nName: Test\nEmail: test@gmail.com\nPassword: test\n\nAPI needed for authorization.");
	}
}




