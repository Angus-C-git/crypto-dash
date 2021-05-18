import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LineDatagram from "../components/LineDatagram";


const useStyles = makeStyles({
	root: {
		minWidth: 1020,
		width: '85%',
		//maxWidth: 1600,
		backgroundColor: '#242c37',
		borderRadius: 25,
		marginLeft: '15%',
		marginRight: '15%',
	},
	title: {
		marginBottom: '2%',
	},
	breakDownButton: {
		color: '#fd4d4d',
	},
});

export default function LargeOutlinedCard(props) {
	const { CardTitle } = props;
	const classes = useStyles();

	// ::::::::::::::: DATA STRUCTURE :::::::::::::::
	const data = [
		{
			name: 'January',
			NetWorth: 0,
		},
		{
			name: 'February',
			NetWorth: 973,
		},
		{
			name: 'March',
			NetWorth: 775,
		},
		{
			name: 'April',
			NetWorth: 1000,
		},
		{
			name: 'May',
			NetWorth: 1500,
		},
	];

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography variant="h5" component="h2" className={classes.title}>
					{CardTitle}
				</Typography>
				<LineDatagram data={data}/>
			</CardContent>
		</Card>
	);
}