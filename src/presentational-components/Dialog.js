import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CircularProgress from "@material-ui/core/CircularProgress";

export function ErrorDialog({ error, open, onClose }) {
	const handleClose = () => onClose();

	return (
		<div>
			<Dialog
				open = { open }
				onClose = { handleClose }
			>
				<DialogContent>
					<DialogContentText>{ error }</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick = { handleClose } color = "primary" autoFocus>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export function LoadingDialog({ open }) {
	return (
		<Dialog
			open = { open }
			PaperProps = {{
				style: {
					backgroundColor: 'transparent',
					boxShadow: 'none'
				}
			}}>
			<DialogContent>
				<CircularProgress size = { 60 }/>
			</DialogContent>
		</Dialog>
	)
}

export function SuccessDialog({ success, open }) {

	return (
		<div>
			<Dialog open = { open }>
				<DialogContent>
					<DialogContentText>{ success }</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export function InformDialog({ open, information, onContinue, onCancel}) {
	return (
		<div>
			<Dialog open = { open } onClose = { onCancel }>
				<DialogContent>
					<DialogContentText>{ information }</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick = { onCancel } color = "primary" autoFocus>
						Cancel
					</Button>
					<Button onClick = { onContinue } color = "primary" autoFocus>
						Continue
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
