import React from "react";
import { useHistory } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

/* HOW TO USE?
******************************
<DropdownButton options = {[
	{
		value: "Home",
		to: "/home",
	},
	{
		value: "Recover password",
		to: "/forgot-password",
	}
]} />
******************************
*/

export function DropdownButton({ options, icon }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const history = useHistory();

	const handleClick = (event) => setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleMenuItemClick = (to) => history.push(to);

	return (
		<div>
			<IconButton color = "inherit"
						aria-haspopup = "true"
						onClick = { handleClick }>
				{ icon }
			</IconButton>
			<Menu
				keepMounted
				elevation = {0}
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