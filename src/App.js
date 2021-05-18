import React from 'react';
import './css/App.css';
import NavBar from './components/NavBar';
import Dashboard from './routes/Dashboard';
import Fiddle from './routes/Fiddle';
import Login from './routes/Login';
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";


// TODO: redirect on lack of auth token

function App() {

    const setInitialToken = () => {

        if (localStorage.getItem('token'))
            return localStorage.getItem('token');
    };

    const [token] = React.useState(setInitialToken);

    return (
        <BrowserRouter>
            <header>
                <title>CryptoDash</title>
            </header>
            <NavBar token={token}  />
            <Switch>
                <Route exact path="/">
                    {token
                        ? <Redirect to="/dashboard" />
                        : <Redirect to="/login" />}
                </Route>
                <Route path="/fiddle">
                    <Fiddle />
                </Route>
                <Route path="/login">
                    <Login token={token}/>
                </Route>
                <Route path="/dashboard">
                    <Dashboard token={token}/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
