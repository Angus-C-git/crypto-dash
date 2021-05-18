import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, useHistory } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {makeStyles} from "@material-ui/core/styles";
import Logo from '../static/logo.svg';

const BASE_URL = 'https://null/api';


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: '#151a21',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '100vh',
		flexDirection: 'column',
		padding: '20px',
		'& Button': {
			marginTop: '5%',
			backgroundColor: '#fd4d4d',
		},
	},
	formFields: {
		color: '#dee3ea',
		'& TextField': {
			color: '#dee3ea',
		},
		'& label': {
			color: '#dee3ea',
		},
		'& input': {
			color: '#dee3ea',
		}
	},
	title: {
		marginTop: '8px',
	},
	img: {
		width: '45px',
		height: '46px',
		verticalAlign: 'middle',
	},
}));

export default function Login(props) {
	const { token, setToken } = props;
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState(undefined);
	const classes = useStyles();
	const history = useHistory();

	if (token) {
		console.log("TOKEN:", token);
		console.log("REDIRECTING TO DASH");
		// history.push('/dashboard');
		return <Redirect to="/dashboard"/>;
	}

	// Similar to Registration - submits all fields
	const submit = async (e) => {

		console.log("TMP LOGIN FUNCTION ISSUING TOKEN ...");
		localStorage.setItem('token', 'TMP_TOKEN');

		e.preventDefault();
		try {
			if (!email || !password) {
				setError('Text fields cannot be empty!');
				return;
			}
			const response = await fetch(`${BASE_URL}/user/login`, {
				body: JSON.stringify({
					email,
					password,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			const responseData = await response.json();
			setError(responseData.error);
			if (response.status === 200) {
				setToken(responseData.token);
				localStorage.setItem('token', responseData.token);
			}
		} catch (err) {
			console.log(err);
		}
	};



	return (
		<>
			<h1 className={classes.title}>
				<img src={Logo} alt={"Logo"} class={classes.img}/> CryptoDash
			</h1>
			<div className={classes.root}>
				<form onSubmit={submit} className={classes.formFields}>
					<Typography variant="h5">Log in</Typography>
					<TextField
						color={classes.formFields}
						alt="email field"
						label="Email"
						id="email"
						fullWidth
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextField
						color="--primary-text"
						alt="password field"
						id="password"
						label="Password"
						type="password"
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{error && <Alert severity="error">{error}</Alert>}
					<Button alt="login-submit" id="login-submit" variant="contained" color="primary" type="submit" fullWidth>Log in</Button>
				</form>
				<br/>
				{/*<div className="switch-signing-in">*/}
				{/*	Don&#39;t have an account?*/}
				{/*	{'    '}*/}
				{/*</div>*/}
				{/*<div>*/}
				{/*	<Button alt="register here" id="register-here" onClick={() => history.push('/register')} variant="outlined">Register here</Button>*/}
				{/*	<Button alt="forgot password" id="forgot-pass" onClick={() => history.push('/reset')} variant="outlined">Forgot Password</Button>*/}
				{/*</div>*/}

			</div>
		</>
	);
}

Login.propTypes = {
	token: PropTypes.string.isRequired
	// setToken: PropTypes.func.isRequired,
};