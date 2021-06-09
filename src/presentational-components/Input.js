import React from 'react';
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

export function TextInput({ size, label, name, value, onChange }) {
	let handleChange = (event) => onChange(event);

	return (
		<TextField
			required fullWidth autoFocus
			variant = "outlined"
			margin = "normal"
			size = { size }
			id = { name }
			label = { label }
			name = { name }
			value = { value }
			onChange = { (event) => handleChange(event) }
		/>
	);
};

export function PasswordInput({ label, name, value, onChange }) {
	const handleChange = (event) => onChange(event);

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
		<Select
			required fullWidth select
			variant = "outlined"
			margin = "normal"
			id = { name }
			label = { label }
		>
			{ choices.map((choice) => {
				return (
					<MenuItem key = { choice } value = { choice }>{ choice }</MenuItem>
				);
			})}
		</Select>
	)
};

export function CommentInput({ onChange }) {
	const handleChange = (event) => onChange(event);

	return (
		<TextField
			multiline fullWidth
			size = 'small'
			margin = 'normal'
			variant = 'outlined'
			id = 'comment'
			placeholder = "Type your comment here..."
			onChange = { (event) => handleChange(event) }
		/>
	);
}