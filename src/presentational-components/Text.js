import React from 'react';
import Typography from "@material-ui/core/Typography";
import { Link as RouteLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

export function TitleText({ value, fontSize }) {
	return (
		<Typography noWrap
					color = 'inherit'
					variant = 'inherit'
					style = {{ fontWeight: 'bold', fontSize: fontSize }}
		>
			{ value }
		</Typography>
	);
};

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
		<Link component = { RouteLink } to = { to } underline = 'none'>
			<Typography
				variant = "body2"
				align = { align }>
				{ value }
			</Typography>
		</Link>
	);
};