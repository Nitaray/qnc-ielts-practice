

/*	****************************
signInInfo: {
	email: String,
	password: String,
}
**************************** */
export function signIn(signInInfo) {
	if (signInInfo['email'] === 'test@gmail.com' && signInInfo['password'] == 'test') {
		alert("Sucessful");
	} else {
		alert("Please use fake account to grant access:\nEmail: test@gmail.com\nPassword: test\n\nAPI needed for authorization.");
	}
}