import React, { useState } from "react";
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
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TextField from "@material-ui/core/TextField";
import SendIcon from '@material-ui/icons/Send';

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
	const [comment, setComment] = useState(' ');

	return (
		<List className = { classes.root }>
			{
				props.comments.map((comment) => {
					console.log('Comment' + comment);
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
											{ comment.user }
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
								<ListItemSecondaryAction
									className = { classes.listItemSecondaryAction }>
									<IconButton>
										<MoreHorizIcon />
									</IconButton>
								</ListItemSecondaryAction>
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
					<IconButton>
						<SendIcon />
					</IconButton>
				</ListItemSecondaryAction>
			</ListItem>
		</List>
	);
};