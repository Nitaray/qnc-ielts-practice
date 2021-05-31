import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from "./route-component/Authorization/LandingPage";
import SignUpPage from "./route-component/Authorization/SignUpPage";
import ForgotPasswordPage from "./route-component/Authorization/ForgotPasswordPage";

import HomePage from "./route-component/Home/HomePage";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

// https://coolors.co/fcba04-ffebeb-590004
const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#8c332d',
            main: '#590004',
            dark: '#350000',
            contrastText: '#ffffff'
        },
        secondary: {
            light: '#ffec4e',
            main: '#fcba04',
            dark: '#c48a00',
            contrastText: '#000000'
        },
        chip: {
            listening: '#ff7077',
            reading: '#fede86',
        },
        table: {
            head: '#ffffff',
            text: '#000000',
            even: '#ffffff',
            odd: '#f5f5f5',
        },
        action: {
            hover: '#cccccc',
        }

    },
});

export default function App() {
    return (
        <ThemeProvider theme = {theme}>
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
