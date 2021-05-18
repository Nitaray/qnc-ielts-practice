import React, {Component, useState} from 'react';
import { Link as RouteLink } from 'react-router-dom';

import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import makeStyles from "@material-ui/core/styles/makeStyles";

import { ActionButton } from "../presentational-components/Button";
import { TextInput } from "../presentational-components/Input";
import { TextWithLink } from "../presentational-components/Text";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
}));

export default function LandingPage() {
    // some hooks
    const classes = useStyles();

    // return jsx
    return (
        <Grid container component = "main" className = { classes.root }>
            <CssBaseline />
            <Grid item xs = {false} sm = {4} md = {8}>
                {/* introduce about the page here*/}
            </Grid>

            <Grid item xs = {12} sm = {8} md = {4} component = {Paper}>
                <div className = { classes.paper }>
                    <Avatar className = { classes.avatar }>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <form className = { classes.form }>
                        <TextInput label = "Email Address" name = "email" />
                        <TextInput label = "Password" name = "password" />

                        <ActionButton value = "Sign In" />
                        <Grid container>
                            <Grid item xs>
                                <TextWithLink
                                    value = "Forgot password!"
                                    align = "left"
                                    to = "/forget-password" />
                            </Grid>
                            <Grid item xs>
                                <TextWithLink
                                    value = "Don't have account?"
                                    align = "right"
                                    to = "/create-account" />
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
};

