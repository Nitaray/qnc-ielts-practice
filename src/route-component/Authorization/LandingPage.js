import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import makeStyles from "@material-ui/core/styles/makeStyles";
import { ActionButton } from "../../presentational-components/Button";
import { PasswordInput, TextInput } from "../../presentational-components/Input";
import { TextWithLink, TitleText } from "../../presentational-components/Text";
import { useMutation } from "@apollo/client";
import { SIGNIN_MUTATION } from "../../service-component/API/mutation";
import { ErrorDialog, LoadingDialog } from "../../presentational-components/Dialog";
import { AuthorizationContext } from "../../service-component/Context/authorization";

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
    const [error, setError] = useState(null);
    const [signIn, { loading }] = useMutation(SIGNIN_MUTATION);
    const [authorization, setAuthorization] = useContext(AuthorizationContext);

    const handleSignInChange = (prop) => (event) => {
        event.preventDefault();
        setSignInInfo({ ...signInInfo, [prop]: event.target.value });
    }

    const handleSignInClick = async () => {
        signIn({
                variables: {
                    username: signInInfo.username,
                    password: signInInfo.password
                },
                errorPolicy: 'none',
        })
        .then(data => {
            setAuthorization({
                status: true,
                token: data.data.login.token,
                user: {
                    id: data.data.login.user.id,
                    username: data.data.login.user.username,
                    role: {
                        name: data.data.login.user.role.name,
                    }
                }
            });
            history.push("/tests/");
        })
        .catch(error => {
            setError(true);
        });
    }

    return (
        <React.Fragment>
            { loading && <LoadingDialog open = { loading } /> }
            { error && <ErrorDialog error = 'Invalid username/password. Please try again!'
                                    open = { error } onClose = { setError(false) } /> }
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
        </React.Fragment>
    );
};

