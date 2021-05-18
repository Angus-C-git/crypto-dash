
import React, {Component} from 'react';

import {RadialChart, Hint} from 'react-vis';

export default class SimpleRadialChart extends Component {
	state = {
		value: false,
	};


	render() {
		const {value} = this.state;
		let data_label = '';		// TODO: Tooltips

		return (
			<RadialChart
				className={'donut-chart-example'}
				colorType="literal"
				innerRadius={40}
				radius={50}
				getAngle={d => d.theta}
				data={[
					{theta: 2, label: 'investment', className: 'custom-class', color: '#fd4d4d'},
					{theta: 6, label: 'gain', color: '#0b0e11'}
				]}
				onValueMouseOver={(v) => {
					this.setState({value: v});
					// data_label = v.label
				}}
				onSeriesMouseOut={() => this.setState({value: false})}
				width={150}
				height={150}
				padAngle={0.15}
			>
				{value !== false && <Hint value={data_label} />}
			</RadialChart>
		);
	}
}