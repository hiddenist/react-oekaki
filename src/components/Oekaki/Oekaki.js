import React, { Component } from 'react';
import OekakiPage from './OekakiPage';
import Brush from './Brush';
import './Oekaki.css';

export default class Oekaki extends Component {
  width;
  height;
  brush;
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

  render() {
    return (
      <div className="oekaki-container">
        <OekakiPage ref={el => (this.page = el)} oekaki={this} />
      </div>
    )
  }
};