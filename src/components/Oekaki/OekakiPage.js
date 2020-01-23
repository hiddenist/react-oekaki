import React, { Component } from 'react';
import WorkingLayer from './WorkingLayer';
import Layer from './Layer';

export default class OekakiPage extends Component {
  constructor({oekaki}) {
    super();
    this.oekaki = oekaki;
    this.layers = [];

    let bg = this.addLayer('Background');
    bg.isBg = true;
  }

  addLayer(name) {
    let layer = {
      name: name,
      isBg: false
    }

    this.layers.push(layer);
    this.setActiveLayer(this.layers.length - 1);

    return layer;
  }

  startDrawing(e) {
    e.preventDefault();
    this.oekaki.startDrawing(e);
  }

  getLayer = (i) => this.layers[i].layer;
  setActiveLayer = (i) => this.activeLayerIdx = i;
  getActiveLayer = () => this.getLayer(this.activeLayerIdx);

  render() {
    return (
      <div className="oekaki-page"

        onMouseDown={this.startDrawing.bind(this)}
        onTouchStart={this.startDrawing.bind(this)}
        style={{ width: this.oekaki.width + "px", height: this.oekaki.height + "px" }}>
        
        {this.layers && this.layers.map(
          (layer, idx) => {
            return (
              <Layer key={layer.name}
                isBg={layer.isBg}
                ref={el => (this.layers[idx].layer = el)}
                width={this.oekaki.width}
                height={this.oekaki.height} />
            )
          }
        )}
        
        <WorkingLayer ref={el => (this.oekaki.workingCanvas = el)} oekaki={this.oekaki} />
      </div>
    )
  }
};