class Edge extends Obstacle {
  constructor(x, y, w, h, settings = {}) {
    settings.fill = true;
    settings.fillColor = "red";
    super(x, y, w, h, settings);
  }
  draw(player) {
    if (circleRectangleIntersection(player, this)) {
      super.draw(player);
    }
  }
}
