import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LineDatagram from "../components/LineDatagram";
import { useQuery, gql } from '@apollo/client';


const useStyles = makeStyles({
	root: {
		minWidth: 1200,
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


const INVESTMENT_HISTORY = gql`
    query {
        investment_history {
            month
            buy
            sell
        }
    }
`;


export default function LargeOutlinedCard(props) {
	const { CardTitle } = props;
	const classes = useStyles();
	let chartData;

	const { loading, error, data } = useQuery(INVESTMENT_HISTORY);

	if (loading) return <p>Loading...</p>;
	if (error || !data) {
		console.log(error);
		chartData = null;
	}


	if (data) {
		chartData = data.investment_history;
	}

	return (
		<Card className={classes.root} variant="outlined">
			<CardContent>
				<Typography variant="h5" component="h2" className={classes.title}>
					{CardTitle}
				</Typography>
				<LineDatagram data={chartData}/>
			</CardContent>
		</Card>
	);
}