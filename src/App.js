import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from "./route-component/Authorization/LandingPage";
import SignUpPage from "./route-component/Authorization/SignUpPage";
import ForgotPasswordPage from "./route-component/Authorization/ForgotPasswordPage";
import HomePage from "./route-component/Home/HomePage";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { AuthorizationContext } from "./service-component/Context/authorization";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createBrowserHistory } from 'history';


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

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
        console.log('networkError', networkError);
    }
});

const httpLink = createHttpLink({
    uri: process.env.API_URL || 'https://qnc-ielts-practice.herokuapp.com/graphql',
    credentials: 'include'
});

let token;
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    link: authLink.concat(ApolloLink.from([errorLink, httpLink])),
    cache: new InMemoryCache({
        typePolicies: {
            Test: {
                merge: false
            }
        }
    })
});

export default function App() {
    const [authorizationData, setAuthorizationData] = useState({
        status: false,
        token: null,
        user: {
            id: null,
            username: null,
            role: {
                name: null
            }
        }
    });

    token = authorizationData.token ? authorizationData.token : null;

    return (
        <ThemeProvider theme = {theme}>
            <ApolloProvider client = { client }>
                <AuthorizationContext.Provider value = {[authorizationData, setAuthorizationData]}>
                    <BrowserRouter basename = "/qnc-ielts-practice">
                        <Switch>
                            <Route exact path = "/" component = { LandingPage } />
                            <Route exact path = "/create-account" component = { SignUpPage } />
                            <Route exact path = "/forgot-password" component = { ForgotPasswordPage } />
                            <Route path = "/tests" component = { HomePage } />
                        </Switch>
                    </BrowserRouter>
                </AuthorizationContext.Provider>
            </ApolloProvider>
        </ThemeProvider>
    );
};
