import React from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(2, 0, 2),
	},
}));

export function ActionButton({ value, onClick }) {
	const classes = useStyles();

	let handleClick = () => onClick();

	return (
		<Button
			fullWidth
			variant = "contained"
			color = "primary"
			className = { classes.button }
			onClick = { () => handleClick() }>
			{ value }
		</Button>
	);
};

export function DropdownButton({ options, icon }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const history = useHistory();

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleMenuItemClick = (to) => history.push(to);

	return (
		<div component = { Paper }>
			<IconButton color = "inherit"
						aria-haspopup = "true"
						onClick = { handleClick }>
				{ icon }
			</IconButton>
			<Paper elevation = {0} style = {{ margin: '0px', border: "1px solid black" }} />
			<Menu
				keepMounted
				elevation = {2}
				getContentAnchorEl = {null}
				anchorOrigin = {{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin = {{
					vertical: 'top',
					horizontal: 'center',
				}}
				anchorEl = { anchorEl }
				open = { Boolean(anchorEl) }
				onClose = { handleClose }
			>

				{ options.map((option) => (
					<MenuItem onClick = { () => handleMenuItemClick(option.to) }>{ option.value }</MenuItem>
				)) }
			</Menu>
		</div>
	);
}