import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./route-component/LandingPage";
import CreateAccountPage from "./route-component/Authorization/CreateAccountPage";


export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                {/* LANDING PAGE
                ----------------
                Landing Page is the default when enter the website.
                Has:
                    - Login
                    - Redirect to: /forgot-password and /create-account */}
                <Route exact path = "/" component = { LandingPage } />
                <Route exact path = "/homepage" component = { LandingPage } />

                <Route exact path = "/create-account" component = { CreateAccountPage } />

                {/*<Route exact path = "/forgot-password" component = { ForgotPasswordPage } />*/}
            </Switch>
        </BrowserRouter>
    );
};
