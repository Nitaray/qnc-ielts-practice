import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./route-component/LandingPage";


export default function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = { LandingPage } />
            </Switch>
        </BrowserRouter>
    );
};
