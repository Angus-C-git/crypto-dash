import React from 'react';
import './css/App.css';
// import NavBar from './components/NavBar';
import Dashboard from './routes/Dashboard';
import Profile from './routes/Profile';
import Login from './routes/Login';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { CookiesProvider } from 'react-cookie';

// TODO: redirect on lack of auth token
const client = new ApolloClient({
    // uri: 'https://crypto-dash-api.herokuapp.com',
    uri: 'http://localhost:2048/',
    cache: new InMemoryCache(),
    credentials: 'include'
});

function App() {

    return (
        <CookiesProvider>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <header>
                        <title>CryptoDash</title>
                    </header>
                    {/*<NavBar />*/}
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/dashboard" />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/dashboard">
                            <Dashboard />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </ApolloProvider>
        </CookiesProvider>
    );
}

export default App;
