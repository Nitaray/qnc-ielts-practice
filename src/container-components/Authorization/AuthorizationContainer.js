import React, { useContext, useEffect, useState } from "react";
import { AuthorizationContext } from "../../service-component/Context/authorization";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { REFRESHJWT_MUTATION } from "../../service-component/API/mutation";

export function AuthorizationContainer({ children }) {
	const [authorization, setAuthorization] = useContext(AuthorizationContext);
	const [unauthorized, setUnauthorized] = useState(false);
	const [refreshJWT] = useMutation(REFRESHJWT_MUTATION);

	const handleRefreshJWT = async () => {
		console.log('refreshJWT');
		try {
			const data = await refreshJWT();
			await setAuthorization({
				status: true,
				token: data.data.refreshJWT.token,
				user: {
					id: data.data.refreshJWT.user.id,
					username: data.data.refreshJWT.user.username,
					role: {
						name: data.data.refreshJWT.user.role.name,
					}
				}
			});
		} catch (error) {
			console.log(error);
			await setUnauthorized(true);
		}
	}

	useEffect(() => {
		(async () => {
			if (authorization.token != null) {
				const tokenPayload = authorization.token.split('.')[1];
				const tokenExpiration = new Date(tokenPayload);
				const now = new Date();
				if (tokenExpiration.getTime() - now.getTime() < 1000 * 60 * 5) {
					await handleRefreshJWT();
				}
			} else {
				await handleRefreshJWT();
			}
		})()
	}, []);

	if (unauthorized) return <Redirect to = '/' />
	else return children;
}