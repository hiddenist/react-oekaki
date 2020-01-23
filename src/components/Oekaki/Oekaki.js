import React, { Component } from 'react';
import OekakiPage from './OekakiPage';
import Brush from './Brush';
import './Oekaki.css';
import { getEventPositions } from '../helpers';

export default class Oekaki extends Component {
  width;
  height;
  brush;
  workingCanvas;
  history = [];
  redoHistory = [];
  flags = {
    "drawing": false
  };

  constructor({width, height}) {
    super();
    this.width = width;
    this.height = height;
    this.brush = new Brush();
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

  startDrawing(e) {
    this.flags.drawing = true;
    this.draw(e);
  }

  drawMove(e) {
    e.preventDefault();
    if (this.flags.drawing) {
      this.draw(e);
    }
  }

  draw(e) {
    let posish = getEventPositions(e, this.workingCanvas.canvas);
    this.brush.addToPath(posish);
    this.workingCanvas.clear();
    this.brush.draw(this.workingCanvas.getContext());
  }
  
  stopDrawing(e) {
    e.preventDefault();
    if (this.flags.drawing) {
      if (this.brush.isDot()) {
        this.draw(e);
      }

      this.workingCanvas.commit(this.page.getActiveLayer());

      let stroke = this.brush.clearPath();
      this.logAction("brush", {
        stroke: stroke
      });

      this.flags.drawing = false;
    }
  }


  render() {
    return (
      <div className="oekaki-container"
        onMouseMove={this.drawMove.bind(this)}
        onMouseUp={this.stopDrawing.bind(this)}
        onTouchMove={this.drawMove.bind(this)}
        onTouchEnd={this.stopDrawing.bind(this)}
      >
        <OekakiPage ref={el => (this.page = el)} oekaki={this} />
      </div>
    )
  }
};