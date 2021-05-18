import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Logo from '../static/logo.svg';

import {useHistory, Redirect, BrowserRouter} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: '#151a21',
		'& Button': {
			color: '#fd4d4d',
		}
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		cursor: 'pointer',
	},
	s_logo: {
		width: '15px',
		height: '75px',
	},
	img: {
		width: '45px',
		height: '45px',
		padding: '10px',
		cursor: 'pointer',
		color: '#dee3ea',
	},
}));

export default function NavBar(props) {
	let { token } = props;
	const classes = useStyles();
	const history = useHistory();

	/**
	 * TMP logout method deletes local storage
	 * token.
	 * */
	const logout = async () => {
		await localStorage.clear();
		token = null;
		window.location = '/login'; // DISGUSTING HACK
	};

	const returnHome = () => {
		history.push('/dashboard');
	};

	const fiddle = () => {
		history.push('/fiddle');
	};


	// If not logged in, no need to show nav bar
	if (!token) {
		console.log("TOKEN WAS NULL");
		return null;
	}


	return (
		<div className={classes.root}>
			<AppBar alt="Navigation bar" className={classes.root} position="static">
				<Toolbar>
					<img src={Logo} onClick={() => returnHome()} className={classes.img} alt="logo"/>
					<Typography alt="CryptoDash" onClick={() => returnHome()} variant="h6" className={classes.title}>
						CryptoDash
					</Typography>
					<Button alt="fiddle" id="fiddle" onClick={fiddle} color="inherit">Fiddle</Button>
					<Button alt="Logout" id="logout" onClick={logout} color="inherit">Logout</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}

NavBar.propTypes = {
	token: PropTypes.string.isRequired,
};
