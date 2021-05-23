import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Logo from '../static/logo.svg';

import { useHistory } from 'react-router-dom';
import {gql, useMutation} from "@apollo/client";

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


const LOGOUT = gql`
    mutation mutation {
        logout
    }
`;


export default function NavBar(props) {
	// let { token } = props;
	const classes = useStyles();
	const history = useHistory();
	const [ logout ] = useMutation(LOGOUT);

	const [
		redirectToLogin,
		setRedirectToLogin
	] = React.useState(false);


	/**
	 * TMP logout method deletes local storage
	 * token.
	 * */
	const handleLogout = async (e) => {
		e.preventDefault();
		try {
			await logout().then((res) => {
				if (res.data.logout)
					setRedirectToLogin(true);
			}).catch(err => {
				console.error(err);
			});
		} catch (err) {
			console.error('[>>] Logout failed', err);
		}

	};

	const returnHome = () => {
		history.push('/dashboard');
	};

	const profile = () => {
		//history.push('/profile');
		window.location = '/profile';
	};

	if (redirectToLogin)
		window.location = '/login';
		//return <Redirect to='/login' />;

	return (
		<div className={classes.root}>
			<AppBar alt="Navigation bar" className={classes.root} position="static">
				<Toolbar>
					<img src={Logo} onClick={() => returnHome()} className={classes.img} alt="logo"/>
					<Typography alt="CryptoDash" onClick={() => returnHome()} variant="h6" className={classes.title}>
						CryptoDash
					</Typography>
					<Button alt="profile" id="profile" onClick={profile} color="inherit">Profile</Button>
					<Button alt="Logout" id="logout" onClick={handleLogout} color="inherit">Logout</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}

NavBar.propTypes = {
	// token: PropTypes.string.isRequired,
};
