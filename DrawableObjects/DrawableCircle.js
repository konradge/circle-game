class DrawableCircle extends DrawableObject {
  constructor(x, y, radius, settings) {
    super(radius, radius, settings);
    this.position = new Vector(x, y);
    this.radius = radius;
    this.isCircle = true;
  }
}
