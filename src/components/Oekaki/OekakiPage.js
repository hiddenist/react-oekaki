import React, { Component } from 'react';
import WorkingCanvas from './WorkingCanvas';
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
    this.activeLayerIdx = this.layers.length - 1;

    return layer;
  }

  getLayer = (i) => this.layers[i].layer;
  setActiveLayer = (i) => this.activeLayerIdx = i;
  getActiveLayer = () => this.getLayer(this.activeLayerIdx);

  render() {
    return (
      <div className="oekaki-page" style={{ width: this.oekaki.width + "px", height: this.oekaki.height + "px" }}>
        
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
        
        <WorkingCanvas ref="workingCanvas" oekaki={this.oekaki} />
      </div>
    )
  }
};