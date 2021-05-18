import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Logo from "../static/arrow-right.svg";
import PieDatagram from './PieDatagram';

const useStyles = makeStyles({
	root: {
		minWidth: 465,
		backgroundColor: '#242c37',
		borderRadius: 25,
		marginLeft: '10%',
		marginRight: '10%',
	},
	data: {
		fontSize: 25,
		marginTop: '4%',
		// marginLeft: '2%',
		fontWeight: 'bold',
		color: '#dee3ea',
	},
	breakDownButton: {
		color: '#fd4d4d',
	},
	img: {
		width: '20px',
		height: '20px',
		padding: '5px',
		cursor: 'pointer',
	},
});

export default function DataCard(props) {
	// const {CardTitle} = props;
	const classes = useStyles();
	const profit = 200.48;			// TODO: Pull from function

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography variant="h5" component="h2">
					{props.CardTitle}
				</Typography>

				<PieDatagram dataType={props.dataType}/>

				<Typography className={classes.data} color="textSecondary">
					${profit}
				</Typography>
			</CardContent>
			<CardActions>
				<Button className={classes.breakDownButton} size="medium">See Breakdown <img src={Logo} onClick={() => console.log('BREAKDOWN')} className={classes.img} alt="arrow"/></Button>
			</CardActions>
		</Card>
	);
}