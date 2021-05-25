import React, { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';

import makeStyles from "@material-ui/core/styles/makeStyles";

import { ActionButton } from "../../presentational-components/Button";
import { PasswordInput, TextInput } from "../../presentational-components/Input";
import { Text, TextWithLink } from "../../presentational-components/Text";

import { signIn } from '../../service-component/API/authorization';

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
        width: '100%',
        marginTop: theme.spacing(1),
    },
}));

export default function LandingPage() {
    // REMOVE IF BACKEND FOR AUTHENTICATION IS FINISHED
    const classes = useStyles();
    const history = useHistory();
    const [signInInfo, setSignInInfo] = useState({
        email: "",
        password: "",
    });

    const handleSignInChange = (prop) => (event) => setSignInInfo({ ...signInInfo, [prop]: event.target.value });
    const handleSignInClick = () => {
        // FAKE DATA - FOR TESTING ONLY
        if (signIn(signInInfo)) history.push('/home');
        // END OF FAKE DATA
    }
    // END REMOVE

    return (
        <Grid container component = "main" className = { classes.root }>
            <CssBaseline />
            <Grid item xs = {false} sm = {4} md = {8}>
                {/* PAGE INTRODUCTION */}
            </Grid>
            {/* REMOVE IF BACKEND FOR AUTHENTICATION IS FINISHED */}
            {/* REPLACE WITH <SignIn /> COMPONENT*/}
            <Grid item xs = {12} sm = {8} md = {4} component = {Paper}>
                <div className = { classes.paper }>
                    <Avatar className = { classes.avatar }>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Text value = "Sign In" />
                    <form className = { classes.form }>
                        <TextInput label = "Email Address" name = "email" value = { signInInfo['email'] }
                                   onChange = { handleSignInChange('email') } />

                        <PasswordInput label = "Password" name = "password" value = { signInInfo['password'] }
                                   onChange = { handleSignInChange('password') } />

                        <ActionButton value = "Sign In"
                                      onClick = { () => handleSignInClick() } />
                        <Grid container>
                            <Grid item xs>
                                <TextWithLink
                                    value = "Forgot password!"
                                    align = "left"
                                    to = "/forgot-password" />
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
            {/* END REMOVE */}
        </Grid>
    );
};

