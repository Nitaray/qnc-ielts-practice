import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from "./route-component/Authorization/LandingPage";
import SignUpPage from "./route-component/Authorization/SignUpPage";
import ForgotPasswordPage from "./route-component/Authorization/ForgotPasswordPage";

import HomePage from "./route-component/Home/HomePage";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: '#e53e3e',
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter basename = "/ielts-practice-web">
                <Switch>
                    {/*
                LANDING PAGE
                ----------------
                Landing Page is the default when enter the website.
                Has:
                    - Login
                    - Redirect to: /forgot-password and /create-account
                */}
                    <Route exact path = "/" component = { LandingPage } />
                    <Route exact path = "/landing" component = { LandingPage } />
                    <Route exact path = "/home" component = { HomePage } />
                    <Route exact path = "/create-account" component = { SignUpPage } />
                    <Route exact path = "/forgot-password" component = { ForgotPasswordPage } />
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
};
