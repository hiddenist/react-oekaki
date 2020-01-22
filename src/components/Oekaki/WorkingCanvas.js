import React, { Component } from 'react';
import { getEventPositions } from '../helpers';

export default class WorkingCanvas extends Component {
  constructor({ oekaki }) {
    super();
    this.oekaki = oekaki;
  }

  startDrawing(e) {
    e.preventDefault();
    let posish = getEventPositions(e, this.refs.canvas);
    this.oekaki.brush.addToPath(posish);
    this.oekaki.flags.drawing = true;
  }

  drawMove(e) {
    e.preventDefault();
    if (this.oekaki.flags.drawing) {
      this.draw(e);
    }
  }

  draw(e) {
    let posish = getEventPositions(e, this.refs.canvas);
    this.oekaki.brush.addToPath(posish);
    this.clear();
    this.oekaki.brush.draw(this.refs.canvas.getContext('2d'));
  }

  clear() {
    this.refs.canvas.getContext('2d').clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  }

  stopDrawing(e) {
    e.preventDefault();
    if (this.oekaki.flags.drawing) {
      if (this.oekaki.brush.isDot()) {
        this.draw(e);
      }

      this.commit();

      let stroke = this.oekaki.brush.clearPath();
      this.oekaki.logAction("brush", {
        stroke: stroke
      });

      this.oekaki.flags.drawing = false;
    }
  }

  commit() {
    let layer = this.oekaki.page.getActiveLayer();
    this.copyCanvasToContext(this.refs.canvas, layer.canvas.getContext('2d'));
    this.clear();
  }

  copyCanvasToContext(canvas, copyToContext) {
    copyToContext.drawImage(canvas, 0, 0, canvas.width, canvas.height);
  }

  render() {
    return (
      <canvas
          className="oekaki-working-canvas"
          ref="canvas"

          width={this.oekaki.width}
          height={this.oekaki.height}

          onMouseDown={this.startDrawing.bind(this)}
          onMouseMove={this.drawMove.bind(this)}
          onMouseUp={this.stopDrawing.bind(this)}

          onTouchStart={this.startDrawing.bind(this)}
          onTouchMove={this.drawMove.bind(this)}
          onTouchEnd={this.stopDrawing.bind(this)}
        />
    )
  }
}