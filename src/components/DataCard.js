import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Logo from "../static/arrow-right.svg";
import PieDatagram from './PieDatagram';


import { useQuery, gql } from '@apollo/client';

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


const WALLET = gql`
    query {
        wallet {
            total
            holdings {
                name
                value
            }
        }
    }
`;

const POSTURE = gql`
    query {
		posture {
			profit
			invest
			worth
		}
	} 
`;



export default function DataCard(props) {
	const classes = useStyles();
	let total;
	let chartData;

	let QUERY = (props.dataType === 'profile') ? WALLET : POSTURE;

	const { loading, error, data } = useQuery(QUERY);

	if (loading) return <p>Loading...</p>;
	if (error) {
		console.log(error);
		return <p>Error :(</p>;
	}

	// TMP
	if (!data.posture && !data.wallet && !data.transaction_history)
		return window.location = '/login';

	if (data && props.dataType !== 'profile') {
		total = data.posture.profit;
		chartData = [
			{
				name: "Investment",
				value: data.posture.invest
			},
			{
				name: "Worth",
				value: data.posture.worth
			}
		];
	} else {
		total = data.wallet.total;
		chartData = data.wallet.holdings;
	}

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography variant="h5" component="h2">
					{props.CardTitle}
				</Typography>

				<PieDatagram data={chartData}/>

				<Typography className={classes.data} color="textSecondary">
					${total}
				</Typography>
			</CardContent>
			<CardActions>
				<Button className={classes.breakDownButton} size="medium">See Breakdown <img src={Logo} onClick={() => console.log('BREAKDOWN')} className={classes.img} alt="arrow"/></Button>
			</CardActions>
		</Card>
	);
}