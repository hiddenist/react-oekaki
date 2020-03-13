import React, { Component } from 'react';

export default class ToolIcon extends Component {
	className;
	tool;
	state = {
		isActive: null,
		className: ''
	};

	constructor({onClick, tool, isActive}) {
		super();
		
		this.state.isActive = isActive;
		this.tool = tool;
		this.tool.setIconObject(this);
		this.onClick = onClick;
	}

	setActive(isActiveBool) {
		this.setState({
			isActive: isActiveBool
		});
	}

	render() {
		return (
			<div onClick={this.onClick} className={this.state.isActive? "oekaki-tool oekaki-tool-active" : "oekaki-tool"} title={this.tool.name}>
				{this.tool.name}
			</div>
		)
	}
}