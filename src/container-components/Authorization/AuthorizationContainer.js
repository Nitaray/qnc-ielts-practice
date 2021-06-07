import React, { useContext, useEffect } from "react";
import { AuthorizationContext } from "../../service-component/Context/authorization";
import { Redirect } from "react-router-dom";

export function AuthorizationContainer({ children }) {
	const [authorization, setAuthorization] = useContext(AuthorizationContext);
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