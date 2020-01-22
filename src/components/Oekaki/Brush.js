import Point from './Point';

function Brush(color, size, opacity) {
	var brush = this,
		altColor = null,
		position = null,
		isPrimColor = true,
		path = [];

	brush.draw = function(context) {
		var strokeInfo = brush.getStrokeInfo();
		return brush.drawPath(context, strokeInfo);
	};

	brush.drawPath = function(context, strokeInfo) {
		context.lineCap = 'round';
		context.lineJoin = 'round';
		context.strokeStyle = strokeInfo.color;
		context.lineWidth = strokeInfo.size;
		context.fillStyle = '';
		context.globalAlpha = strokeInfo.opacity / 100;

		if (strokeInfo.path.length > 1) {
			let toPoint;
			let fromPoint = new Point(strokeInfo.path[0]);

			context.moveTo(fromPoint.x, fromPoint.y);
			context.beginPath();

			for (var i = 1; i < strokeInfo.path.length; i++) {
				toPoint = new Point(strokeInfo.path[i])
				var midpoint = fromPoint.getMidpoint(toPoint);
				context.quadraticCurveTo(fromPoint.x, fromPoint.y, midpoint.x, midpoint.y);
				fromPoint = midpoint;
			}

			context.stroke();
			context.closePath();
		}
		return brush;
	}

	brush.getStrokeInfo = function() {
		return {
			path: path,
			color: brush.getColor(),
			size: brush.getSize(),
			opacity: brush.getOpacity()
		};
	};

	brush.isDot = function() {
		return path.length === 1;
	};

	brush.clearPath = function() {
		var stroke = brush.getStrokeInfo();
		path = [];
		return stroke;
	};

	brush.setColors = function(primColor, altColor) {
		return brush.setColor(primColor).setAltColor(altColor);
	};

	brush.setColor = function(newColor) {
		color = newColor;
		return brush;
	};

	brush.getPrimColor = function() {
		return color;
	};

	brush.getColor = function() {
		return brush.isPrimColor()? brush.getPrimColor() : brush.getAltColor() ;
	};

	brush.setPrimColorFlag = function(bool) {
		isPrimColor = bool;
		return brush;
	};

	brush.isPrimColor = function(bool) {
		return isPrimColor;
	};

	brush.setAltColor = function(newColor) {
		altColor = newColor;
		return brush;
	};

	brush.getAltColor = function() {
		return altColor;
	};

	brush.swapColors = function() {
		var temp = color;
		color = altColor;
		altColor = temp;
		return brush;
	};

	brush.setSize = function(newSize) {
		size = newSize;
		return brush;
	};

	brush.getSize = function() {
		return size;
	};

	brush.setOpacity = function(newOpacity) {
		opacity = newOpacity;
		return brush;
	};

	brush.getOpacity = function() {
		return opacity;
	};
	
	brush.addToPath = function(positions) {
		for (var i = 0; i < positions.length; ++i) {
			brush.setPosition(positions[i].x, positions[i].y);
		}

		return brush;
	};

	brush.setPosition = function(x, y) {
		if (typeof x == 'object') {
			y = x.y;
			x = x.x;
		}
		
		position = {x: x, y: y};
		path.unshift(position);
		return brush;
	};

	brush.getPosition = function() {
		return {...position};
	};

	return brush;
};

export default Brush;