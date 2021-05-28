import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from "./route-component/Authorization/LandingPage";
import SignUpPage from "./route-component/Authorization/SignUpPage";
import ForgotPasswordPage from "./route-component/Authorization/ForgotPasswordPage";

import HomePage from "./route-component/Home/HomePage";


export default function App() {
    return (
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
    );
};
