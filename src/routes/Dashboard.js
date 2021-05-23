import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import DataCard from '../components/DataCard';
import DataSpan from '../components/DataSpan';

import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from "prop-types";
import NavBar from "../components/NavBar";


const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 4,
		flexGrow: 1,
	},
	control: {
		padding: theme.spacing(3),
	},
}));

export default function Dashboard(props) {
	//const [spacing] = React.useState(10);
	const classes = useStyles();
	// const { token } = props;
	//
	// // Get profile data here ?
	//
	// if (!token)
	// 	return <Redirect to="/login" />;

	return (
		<BrowserRouter>
			<NavBar />
			<div>
				<h2>Holdings Overview</h2>
			</div>

			<Grid container className={classes.root} spacing={5}>
				<Grid item xs spacing={3}>
					<Grid container justify="center" >
						<DataCard CardTitle={"Total Profit"}/>
					</Grid>
				</Grid>
				<Grid item xs spacing={3}>
					<Grid container justify="center" >
						<DataCard CardTitle={"Profile"} dataType={"profile"}/>
					</Grid>
				</Grid>
				<Grid item xs={12} spacing={3}>
					<Grid container justify="center">
						<DataSpan CardTitle={"Buys Vs Sells Overtime"}/>
					</Grid>
				</Grid>
			</Grid>
		</BrowserRouter>

	)
}

Dashboard.propTypes = {
	// token: PropTypes.string.isRequired
};