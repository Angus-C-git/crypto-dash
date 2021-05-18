import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



export default function LineDatagram(props) {

	return (
		// <ResponsiveContainer width="100%" height="100%">
		<LineChart
			width={1000}
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
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type="monotone" dataKey="NetWorth" stroke="#8884d8" activeDot={{ r: 8 }} />
		</LineChart>
		// </ResponsiveContainer>
	);
}
