import Brush from './Brush';

export default class Eraser extends Brush {
  icon = "eraser";
  name = "Eraser";

  constructor(size, opacity) {
    super(size, opacity, 'transparent');

    this.size = size;
    this.opacity = opacity;
  }

  getStrokeInfo() {
    let strokeInfo = super.getStrokeInfo();
    delete strokeInfo.color;
    return strokeInfo;
  }

  setDrawStyle(context) {
    super.setDrawStyle(context);
    context.globalCompositeOperation = 'destination-out';
  }
}