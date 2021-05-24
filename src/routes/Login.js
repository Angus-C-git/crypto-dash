import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from "@material-ui/core/styles";
import Logo from '../static/logo.svg';
import { gql, useMutation } from '@apollo/client';


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


const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            message
        }
    }
`;


export default function Login(props) {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState(undefined);
	const classes = useStyles();
	const [ login ] = useMutation(LOGIN);

	const [
		redirectToDash,
		setRedirectToDash
	] = React.useState(false);


	const handleLogin = async (e) => {

		e.preventDefault();
		try {
			if (!email || !password) {
				setError('Text fields cannot be empty!');
				return;
			}

			await login({variables: {email: email, password: password}}).then((data) => {
				const res = data.data.login[0].message;
				console.log("DATA ::",res);

				if (res !== 'success') {
					setError(res);
					return null;
				}

				setError(null); // hide any previous errors
				setRedirectToDash(true);

			}).catch((err) => {
				console.error('[>>] Login failed', err);
				setError(`Incorrect Credentials`);
			});

		} catch (err) {
			console.log(err);
		}
	};

	if (redirectToDash)
		return <Redirect to="/dashboard" />;


	return (
		<>
			<h1 className={classes.title}>
				<img src={Logo} alt={"Logo"} className={classes.img}/> CryptoDash
			</h1>
			<div className={classes.root}>
				<div className={classes.formFields}>
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
					<Button alt="login-submit" onClick={handleLogin} variant="contained" color="primary" fullWidth>Log in</Button>
				</div>
				<br/>
			</div>
		</>
	);
}

Login.propTypes = {
};