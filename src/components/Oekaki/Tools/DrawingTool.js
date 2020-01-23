import Point from './Point';

export default class DrawingTool {
  position = null;
  path = [];

  getPath() {
    return this.path;
  }

  clearPath() {
    var stroke = this.getStrokeInfo();
    this.path = [];
    return stroke;
  }

  getStrokeInfo() {
    return {
      path: this.getPath()
    };
  }

  beginPath(context, point) {
    context.moveTo(point.x, point.y);
    context.beginPath();
    return this;
  }

  pathSegment(context, fromPoint, toPoint) {
    var midpoint = fromPoint.getMidpoint(toPoint);
    context.quadraticCurveTo(fromPoint.x, fromPoint.y, midpoint.x, midpoint.y);
    return midpoint;
  }

  endPath(context) {
    context.stroke();
    context.closePath();
    return this;
  }

  setDrawStyle(context) {
    return this;
  }

  draw(context) {
    context.save();
    this.setDrawStyle(context);

    let path = this.getPath();
    if (path.length < 1) {
      return
    }

    let toPoint;
    let fromPoint = new Point(path[0]);

    this.beginPath(context, fromPoint);

    for (var i = 1; i < path.length; i++) {
      toPoint = new Point(path[i]);
      fromPoint = this.pathSegment(context, fromPoint, toPoint);
    }

    this.endPath(context);
    context.restore();

    return this;
  }

  isDot() {
    return this.path.length === 1;
  }

  addToPath(positions) {
    for (var i = 0; i < positions.length; ++i) {
      this.setPosition(positions[i].x, positions[i].y);
    }

    return this;
  }

  setPosition(x, y) {
    if (typeof x == 'object') {
      y = x.y;
      x = x.x;
    }
    
    this.position = {x: x, y: y};
    this.path.unshift(this.position);
    return this;
  }

  getPosition() {
    return {...this.position};
  }
}