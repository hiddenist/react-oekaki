import React from 'react';
import Layer from './Layer';

export default class WorkingCanvas extends Layer {
  constructor({ oekaki }) {
    super({width: oekaki.width, height: oekaki.height});
    this.oekaki = oekaki;
  }

  commitToLayer(layer) {
    layer.clear();
    layer.copyLayer(this);
    this.clear();
    return this;
  }

  render() {
    let canvas = super.render();
    return React.cloneElement(canvas, { className: 'oekaki-working-canvas' });
  }
}