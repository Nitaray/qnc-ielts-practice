import React, { useContext, useEffect } from "react";
import { AuthorizationContext } from "../../service-component/Context/authorization";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REFRESHJWT_MUTATION } from "../../service-component/API/mutation";

export function AuthorizationContainer({ children }) {
	const [authorization, setAuthorization] = useContext(AuthorizationContext);
	const [refreshJWT, { loading }] = useMutation(REFRESHJWT_MUTATION);

	useEffect(() => {
		console.log('refreshJWT called');
		if (authorization.token != null) {
			const tokenPayload = authorization.token.split('.')[1];
			const tokenExpiration = new Date(tokenPayload);
			const now = new Date();
			if (tokenExpiration.getTime() - now.getTime() < 1000 * 60 * 5) {
				refreshJWT()
					.then(data => console.log(data))
					.catch(error => console.log(error));
			}
		} else {
			refreshJWT()
				.then(data => console.log(data))
				.catch(error => console.log(error));
		}
	});

	return (
		<React.Fragment>
			{
				authorization.status
					? children
					: <Redirect to = '/' />
			}
		</React.Fragment>
	)
}