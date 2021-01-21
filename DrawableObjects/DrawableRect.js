class DrawableRect extends DrawableObject {
  constructor(x, y, width, height, settings) {
    super(width, height, settings);
    this.position = new Vector(x, y);
    this.centerPosition = new Vector(x + this.width / 2, y + this.height / 2);
  }
}
