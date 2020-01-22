function getEventPosition(e, elem, zoom) {
	var events = getEventPositions(e, elem, zoom);
	return events[0];
}

function getEventPositions(e, elem, zoom) {
	var events = [];

	if (!zoom) {
		zoom = 1;
	}

	var getPosition = function(elem, clientX, clientY) {
		var rect = elem.getBoundingClientRect();

		var x = clientX - rect.x,
			y = clientY - rect.y;
		
		return { x: x * 1/zoom, y: y * 1/zoom };
	}

	if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
		var touch = e.touches[0] || e.changedTouches[0];

		if (!elem) {
			elem = touch.target;
		}
		
		events.push(getPosition(elem, touch.clientX, touch.clientY));
	} else {
		events.push(getPosition(elem, e.clientX, e.clientY));
	}

	return events;
}

export default null;
export { getEventPosition, getEventPositions };