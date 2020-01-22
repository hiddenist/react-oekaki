import React, { Component } from 'react';

export default class Layer extends Component {
	constructor({ width, height }) {
		super();
		this.width = width;
		this.height = height;
	}

	get canvas() {
		return this.refs.canvas;
	}

	render() {
		return (
			<canvas ref="canvas"
				width={this.width}
				height={this.height}></canvas>
		)
	}
}