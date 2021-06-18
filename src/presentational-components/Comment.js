import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Avatar } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import SendIcon from '@material-ui/icons/Send';
import { AuthorizationContext } from "../service-component/Context/authorization";
import { LoadingDialog } from "./Dialog";
import { useMutation } from "@apollo/client";
import { CREATECOMMENT_MUTATION, DETELECOMMENT_MUTATION } from "../service-component/API/mutation";
import DeleteIcon from '@material-ui/icons/Delete';
const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
	},
	fonts: {
		fontWeight: "bold"
	},
	listItemSecondaryAction: {
		visibility: "hidden",
	},
	listItem: {
		"&:hover $listItemSecondaryAction": {
			visibility: "inherit"
		}
	}
}));

export function Comment(props) {
	const classes = useStyles();
	const [authorization] = useContext(AuthorizationContext);
	const [comment, setComment] = useState('');
	const [createComment, { loading }] = useMutation(CREATECOMMENT_MUTATION);
	const [deleteComment] = useMutation(DETELECOMMENT_MUTATION);

	const handleCreateComment = () => {
		createComment({
			variables: {
				comment: {
					content: comment,
					testId: parseInt(props.testId, 10),
					userId: parseInt(authorization.user.id, 10),
				}
			}
		})
			.then(data => console.log(data))
			.catch(error => console.log(error))
	}
	const handleDeleteComment = (id) => {
		deleteComment({
			variables: {
				commentId:parseInt(id, 10),
			}
		})
			.then(data => console.log(data))
			.catch(error => console.log(error))
	}

	return (
		<React.Fragment>
			{ loading && <LoadingDialog open = { loading } /> }
			<List className = { classes.root }>
				{
					props.comments && props.comments.map((comment) => {
						return (
							<React.Fragment>
								<ListItem alignItems = "flex-start"
										  classes = {{ container: classes.listItem }}>
									<ListItemAvatar>
										<Avatar />
									</ListItemAvatar>
									<ListItemText
										primary = {
											<Typography style = {{ fontWeight: 'bold', fontSize: '14px' }}>
												{ comment.user.username }
											</Typography>
										}
										secondary = {
											<React.Fragment>
												<Typography
													variant = "body1"
													color = "textPrimary"
													style = {{ fontSize: '16px' }}>
													{ comment.content }
												</Typography>
												<Typography
													variant = 'body2'
													color = 'textSecondary'
													style = {{ fontSize: '12px'}}>
													{ comment.created }
												</Typography>
											</React.Fragment>
										}
										style = {{ maxWidth: "90%" }}
									/>
									{	(authorization.user.role.name.toLowerCase() === 'admin' || authorization.user.id === comment.user.id) &&
									<ListItemSecondaryAction className = { classes.listItemSecondaryAction }>
										<IconButton onClick = { () => handleDeleteComment(comment.id) }>
											<DeleteIcon />
										</IconButton>
									</ListItemSecondaryAction>
									}
								</ListItem>
								<Divider />
							</React.Fragment>
						)
					})
				}
				<ListItem alignItems = "flex-start">
					<ListItemText
						secondary = {
							<React.Fragment>
								<TextField
									multiline fullWidth
									size = 'small'
									variant = 'outlined'
									id = 'comment'
									value = { comment }
									placeholder = "Type your comment here..."
									onChange = { (event) => setComment(event.target.value) }
								/>
							</React.Fragment>
						}
						style = {{ maxWidth: "95%" }}
					/>
					<ListItemSecondaryAction>
						<IconButton onClick = { handleCreateComment }>
							<SendIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</ListItem>
			</List>
		</React.Fragment>
	);
};