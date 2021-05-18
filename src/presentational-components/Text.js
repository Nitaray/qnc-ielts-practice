import React from 'react';
import Typography from "@material-ui/core/Typography";
import { Link as RouteLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

export function Text({ value, align }) {
	return (
		<Typography
			align = { align }
		>
			{ value }
		</Typography>
	)
}

export function TextWithLink({ value, align, to }) {
	return (
		<Link component = {RouteLink} to ={ to }>
			<Typography
				variant = "body2"
				align = { align }>
				{ value }
			</Typography>
		</Link>
	);
};