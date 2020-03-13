import React, { Component } from 'react';
import OekakiPage from './OekakiPage';
import Brush from './Tools/Brush';
import Eraser from './Tools/Eraser';
import ToolIcon from './ToolIcon';
import './Oekaki.scss';
import { getEventPositions } from '../helpers';

export default class Oekaki extends Component {
  width;
  height;
  brush;
  workingCanvas;
  history = [];
  redoHistory = [];
  currentTool;
  flags = {
    "drawing": false
  };
  state = {
    layers: [],
    activeLayerIdx: null
  };

  constructor({width, height}) {
    super();
    this.width = width;
    this.height = height;
    this.tools = {
      brush: new Brush('#000000', 10, 100),
      eraser: new Eraser(10, 100)
    };
    console.log(this);
  }

  get tool() {
    return this.tools[this.currentTool];
  }

  componentDidMount() {
    this.setCurrentTool("brush");
  }

  logAction(action, state) {
    if (typeof state == "undefined") {
      state = {};
    }

    if (action in ["brush"]) {
      state.layer = this.page.activeLayerIdx;
    }

    state.action = action;
    this.history.push(state);
    this.redoHistory = [];
  }

  setCurrentTool(toolName) {
    if (toolName in this.tools) {
      this.currentTool = toolName;

      for (var curToolName in this.tools) {
        if (curToolName === toolName) {
          this.tools[curToolName].setActive(true);
        } else {
          this.tools[curToolName].setActive(false);
        }
      }
    }
  }

  startDrawing(e) {
    this.flags.drawing = true;
    this.draw(e);
    this.page.getActiveLayer().hide();
  }

  drag(e) {
    e.preventDefault();
    if (this.flags.drawing) {
      this.draw(e);
    }
  }

  draw(e) {
    let posish = getEventPositions(e, this.workingCanvas.canvas);
    let activeLayer = this.page.getActiveLayer();
    this.tool.addToPath(posish);

    this.workingCanvas.clear().copyLayer(activeLayer);

    this.tool.draw(this.workingCanvas.getContext());
  }

  stopDrawing(e) {
    e.preventDefault();
    if (this.flags.drawing) {
      let activeLayer = this.page.getActiveLayer();

      this.workingCanvas.commitToLayer(activeLayer);
      activeLayer.show();

      let stroke = this.tool.clearPath();
      this.logAction("brush", {
        stroke: stroke
      });

      this.flags.drawing = false;
    }
  }

  updateLayers(layers) {
    // Update the layers list in the toolbar
    this.setState({layers: layers});
  }

  render() {
    return (
      <div className="oekaki-container"
        onMouseMove={this.drag.bind(this)}
        onMouseUp={this.stopDrawing.bind(this)}
        onTouchMove={this.drag.bind(this)}
        onTouchEnd={this.stopDrawing.bind(this)}
      >
        <div className="oekaki-rows">
          <div className="oekaki-toolbar">
            {Object.entries(this.tools).map(
              ([toolKey, tool]) => {
                // maybe not necessary
                let toolOnClickClosure = (
                  key => (_ => this.setCurrentTool(key))
                )(toolKey);

                return (
                  <ToolIcon
                    onClick={toolOnClickClosure.bind(this)}
                    key={toolKey}
                    tool={tool} />
                )
              }
            )}

            <div className="oekaki-layers oekaki-panel">
              <div className="oekaki-panel-title">Layers</div>
              <div className="oekaki-panel-body">
                {this.state.layers.slice(0).reverse().map((layer, i) => {
                    let idx = this.state.layers.length - i - 1;
                    return (<div
                        key={idx}
                        onClick={() => this.page.setActiveLayer(idx)}
                        className={idx === this.state.activeLayerIdx? "oekaki-layer oekaki-layer-active" : "oekaki-layer"}>
                          {layer.name}
                        </div>)
                })}
                <div className="oekaki-layer-tools">
                  <div className="oekaki-layer-tool" onClick={() => {
                      let layerName = prompt("Enter Layer Name", "Layer " + this.state.layers.length);
                      if (layerName) {
                        this.page.addLayer(layerName);
                      }
                    }
                  } title="Add New">+</div>

                  { this.state.layers.length > 1 && !this.state.layers[this.state.activeLayerIdx].isBg && <div className="oekaki-layer-tool" onClick={() => {
                      if (window.confirm("Are you sure you want to remove the current layer?")) {
                        this.page.removeLayer(this.state.activeLayerIdx);
                      }
                    }
                  } title="Add New">-</div> }
                </div>
              </div>
            </div>
          </div>

          <OekakiPage ref={el => (this.page = el)} oekaki={this} />
        </div>
      </div>
    )
  }
};