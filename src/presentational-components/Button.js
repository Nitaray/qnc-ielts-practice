import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import Paper from "@material-ui/core/Paper";

export function ActionButton({ value, onClick }) {
	const handleClick = () => onClick();

	return (
		<Button
			fullWidth disableElevation
			variant = "contained"
			color = "primary"
			onClick = { () => handleClick() }>
			{ value }
		</Button>
	);
}

export function IconActionButton({ disabled, icon, onClick }) {
	const handleClick = () => onClick();

	return (
		<IconButton disabled = { disabled } color = "primary" onClick = { () => handleClick() }>
			{ icon }
		</IconButton>
	);
}

export function DropdownButton({ options, icon }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);

	return (
		<Paper variant = 'outlined'>
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
				onClose = { handleClose }>
				{ options.map((option) => { return (option) }) }
			</Menu>
		</Paper>
	);
}