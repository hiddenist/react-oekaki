import React, { Component } from 'react';
import OekakiPage from './OekakiPage';
import Brush from './Tools/Brush';
import Eraser from './Tools/Eraser';
import ToolIcon from './ToolIcon';
import './Oekaki.css';
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

  constructor({width, height}) {
    super();
    this.width = width;
    this.height = height;
    this.tools = {
      brush: new Brush('#000000', 10, 100),
      eraser: new Eraser(10, 100)
    };
    this.currentTool = "brush";

    console.log(this);
  }

  get tool() {
    return this.tools[this.currentTool];
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
    console.log(toolName)
    if (toolName in this.tools) {
      this.currentTool = toolName;
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
                let onClickClosure = (
                  key => (_ => this.setCurrentTool(key))
                )(toolKey);

                return (
                  <ToolIcon
                    onClick={onClickClosure.bind(this)}
                    key={toolKey}
                    icon={tool.icon}
                    name={tool.name} />
                )
              }
            )}
          </div>

          <OekakiPage ref={el => (this.page = el)} oekaki={this} />
        </div>
      </div>
    )
  }
};