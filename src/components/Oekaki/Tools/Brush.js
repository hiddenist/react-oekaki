import DrawingTool from './DrawingTool';

export default class Brush extends DrawingTool {
  color;
  size;
  opacity;

  constructor(color, size, opacity) {
    super();
    this.color = color;
    this.size = size;
    this.opacity = opacity;
  }

  setDrawStyle(context) {
    super.setDrawStyle(context);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = this.getColor();
    context.lineWidth = this.getSize();
    context.fillStyle = '';
    context.globalAlpha = this.getOpacity() / 100;
  }

  getStrokeInfo() {
    let strokeInfo = super.getStrokeInfo();
    strokeInfo.color = this.getColor();
    strokeInfo.size = this.getSize();
    strokeInfo.opacity = this.getOpacity();

    return strokeInfo;
  }

  setColor(newColor) {
    this.color = newColor;
    return this;
  }

  getColor() {
    return this.color;
  }

  setSize(newSize) {
    this.size = newSize;
    return this;
  }

  getSize() {
    return this.size;
  }

  setOpacity(newOpacity) {
    this.opacity = newOpacity;
    return this;
  }

  getOpacity() {
    return this.opacity;
  }
}