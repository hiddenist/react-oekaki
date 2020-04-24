import React, { Component } from 'react';
import WorkingLayer from './WorkingLayer';
import Layer from './Layer';

export default class OekakiPage extends Component {
  constructor({oekaki}) {
    super();
    this.oekaki = oekaki;
    this.layers = [];

    let bg = this.newLayer('Background');
    bg.isBg = true;
  }

  componentDidMount() {
    this.updateLayers();
  }

  newLayer(name) {
    let layer = {
      name: name,
      isBg: false,
      layer: null
    }

    this.layers.push(layer);
    this.setActiveLayer(this.layers.length - 1);

    return layer;
  }

  startDrawing(e) {
    e.preventDefault();
    this.oekaki.startDrawing(e);
  }

  updateLayers() {
    this.forceUpdate();
    this.oekaki.updateLayers(this.layers);
  }

  addLayer(name) {
    this.newLayer(name);
    this.updateLayers();
  }

  removeLayer(i) {
    var layer = this.getLayer(i);

    if (layer.isBg || this.layers.length === 1) {
      // Can't remove bg layer
      return false;
    }

    this.layers.splice(i, 1);
    this.updateLayers();

    if (i === this.activeLayerIdx) {
      // set a new active layer
      this.setActiveLayer(i < 1? i + 1 : i - 1);
    }
  }

  getLayer = (i) => this.layers[i].layer;
  setActiveLayer(i) {
    this.activeLayerIdx = i;
    this.oekaki.setState({
      activeLayerIdx: i
    });
  }
  getActiveLayer = () => this.getLayer(this.activeLayerIdx);

  setLayerPosition(oldPos, newPos) {
    let layer = this.getLayer(oldPos);
    this.layers.splice(oldPos, 1);
    this.layers.splice(newPos, 0, layer);
    this.updateLayers();
  }

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
                  ref={el => {
                      if (this.layers[idx]) {
                        this.layers[idx].layer = el;
                      }
                    }
                  }
                  width={this.oekaki.width}
                  height={this.oekaki.height}
                  name={layer.name}
                />
              )
            }
        )}
        
        <WorkingLayer ref={el => (this.oekaki.workingCanvas = el)}
                  width={this.oekaki.width}
                  height={this.oekaki.height} />
      </div>
    )
  }
};