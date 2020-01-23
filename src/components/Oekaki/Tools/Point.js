export default class Point {
  constructor(x, y) {
    if (typeof x == 'object') {
      y = x.y;
      x = x.x;
    }

    this.x = x;
    this.y = y;
  }

  getDistance(point) {
    var diff = this.getDiff(point);
    return Math.sqrt(Math.pow(diff.x, 2) + Math.pow(diff.y, 2));
  };

  getMidpoint(point) {
    var diff = this.getDiff(point);
    var midpoint = new Point(this.x - diff.x / 2, this.y - diff.y / 2);
    return midpoint;
  };

  getAngle(point) {
    var diff = this.getDiff(point);
    return Math.atan2(diff.x, diff.y);
  };

  getDiff(point) {
    var diff = new Point(this.x - point.x, this.y - point.y);
    // log([this.x, this.y, point.x, point.y, diff.x, diff.y]);
    return diff;
  };

  toObject() {
    return {
      x: this.x,
      y: this.y
    };
  }
}