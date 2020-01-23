import React from 'react';

export default ({onClick, icon, name, isActive}) => {
	let className = "oekaki-tool";
	if (isActive) {
		className += " oekaki-tool-active";
	}

	return (
		<div onClick={onClick} className={className} title={name}>
			{name}
		</div>
	)
}