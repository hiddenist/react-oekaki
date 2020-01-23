import React, { Component } from 'react';

export default class WorkingCanvas extends Component {
  constructor({ oekaki }) {
    super();
    this.oekaki = oekaki;
  }

  getContext() {
    return this.canvas.getContext('2d');
  }

  get canvas() {
    return this.refs.canvas;
  }

  startDrawing(e) {
    e.preventDefault();
    this.oekaki.startDrawing(e);
  }

  clear() {
    this.getContext().clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  commit(layer) {
    this.copyCanvasToContext(this.canvas, layer.canvas.getContext('2d'));
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
          onTouchStart={this.startDrawing.bind(this)}
        />
    )
  }
}