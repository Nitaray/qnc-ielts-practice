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
import { Text, TextWithLink, TitleText } from "../../presentational-components/Text";

import { signIn } from '../../service-component/API/authorization';
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

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
    const classes = useStyles();
    const history = useHistory();
    const [signInInfo, setSignInInfo] = useState({
        username: "",
        password: "",
    });

    const LOGIN_MUTATION = gql`
            mutation login($username: String!, $password: String!) {
                login(username: $username, password: $password) {
                    token
                    user {
                        id
                        username
                        fullname
                        role
                        rating
                    }
                }
            }
        `;

    let [signIn] = useMutation(LOGIN_MUTATION);

    const handleSignInChange = (prop) => (event) => {
        event.preventDefault();
        setSignInInfo({ ...signInInfo, [prop]: event.target.value });
    }
    const handleSignInClick = () => {
        signIn({
            variables: {
                username: signInInfo.username,
                password: signInInfo.password,
            }
        })

        console.log(signIn);
    }

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
                    <TitleText value = "Sign In" fontSize = "18px" />
                    <form className = { classes.form }>
                        <TextInput label = "Username" name = "username" value = { signInInfo['username'] }
                                   onChange = { handleSignInChange('username') } />

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

