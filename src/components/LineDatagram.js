import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



export default function LineDatagram(props) {

	return (
		<LineChart
			width={1100}
			height={300}
			data={props.data}
			margin={{
				top: 10,
				right: 35,
				left: 10,
				bottom: 5,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="month" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type="monotone" dataKey="buy" stroke="#8884d8" activeDot={{ r: 8 }} />
			<Line type="monotone" dataKey="sell" stroke="#82ca9d" />
		</LineChart>
	);
}
