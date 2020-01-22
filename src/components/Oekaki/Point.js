function Point(x, y) {
	var that = this;

	if (typeof x == 'object') {
		y = x.y;
		x = x.x;
	}

	that.x = x;
	that.y = y;

	that.getDistance = function(point) {
		var diff = that.getDiff(point);
		return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
	};

	that.getMidpoint = function(point) {
		var diff = that.getDiff(point);
		var midpoint = new Point(that.x - diff.x / 2, that.y - diff.y / 2);
		return midpoint;
	};

	that.getAngle = function(point) {
		var diff = that.getDiff(point);
		return Math.atan2(diff.x, diff.y);
	};

	that.getDiff = function(point) {
		var diff = new Point(that.x - point.x, that.y - point.y);
		// log([that.x, that.y, point.x, point.y, diff.x, diff.y]);
		return diff;
	};

	that.toObject = function() {
		return {
			x: that.x,
			y: that.y
		};
	}

	return that;
};

export default Point;