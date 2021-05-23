import * as React from 'react';
import {Redirect, Route} from "react-router-dom";
import { useQuery, gql } from '@apollo/client';


const AUTH = gql`
    query {
        me {
            id
        }
    }
`;


export default function AuthRoute({children, ...rest}) {

	const { loading, error, data } = useQuery(AUTH);

	const isAuthenticated = async() => {
		if (error)
			return false;

		if (!data)
			return null;

		if (!data.me)
			return false;

		return true;
	}

	return (
		<Route {...rest} render={() => {
			return (isAuthenticated) ? children : <Redirect to='/login' />
		}} />
	);
}