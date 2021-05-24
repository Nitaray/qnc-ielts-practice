import React from 'react';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

export function TextInput({ label, name, value, onChange }) {
	let handleChange = (event) => onChange(event);

	return (
		<TextField
			required fullWidth autoFocus
			variant = "outlined"
			margin = "normal"
			id = { name }
			label = { label }
			name = { name }
			value = { value }
			onChange = { (event) => handleChange(event) }
		/>
	);
};

export function PasswordInput({ label, name, value, onChange }) {
	let handleChange = (event) => onChange(event);

	return (
		<TextField
			required fullWidth autoFocus
			variant = "outlined"
			margin = "normal"
			type = "password"
			id = { name }
			label = { label }
			name = { name }
			value = { value }
			onChange = { (event) => handleChange(event) }
		/>
	);
};

export function SelectInput({ label, name, choices }) {
	return (
		<TextField
			required fullWidth select
			variant = "outlined"
			margin = "normal"
			id = { name }
			label = { label }
			name = { name }
		>
			{ choices.map((choice) => {
				return (
					<MenuItem key = { choice } value = { choice }>{ choice }</MenuItem>
				);
			})}
		</TextField>
	)
}