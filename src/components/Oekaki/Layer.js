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

  getContext() {
    return this.canvas.getContext('2d');
  }

  copyLayer(layer) {
    let context = this.getContext();
    context.drawImage(layer.canvas, 0, 0, layer.canvas.width, layer.canvas.height);
    return this;
  }

  clear() {
    this.getContext().clearRect(0, 0, this.canvas.width, this.canvas.height);
    return this;
  }

  hide() {
    this.canvas.style.display = 'none';
  }

  show() {
    this.canvas.style.display = '';
  }

  render() {
    return (
      <canvas ref="canvas"
        width={this.width}
        height={this.height}></canvas>
    )
  }
}