class Collectibles extends DrawableCircle {
  visible = true;

  static generateCoin(xRange, yRange, radius, obstacles) {
    let position;
    do {
      position = new Vector(
        randInt(xRange.min, xRange.max),
        randInt(yRange.min, yRange.max)
      );
    } while (
      !obstacles.every(
        (o) => !circleRectangleIntersection({ position, radius }, o)
      )
    );
    return new Coin(position.x, position.y, radius);
  }

  onTouch(player) {
    this.visible = false;
  }

  draw(player) {
    if (this.visible) {
      super.draw();
    }
    if (circleCircleIntersection(this, player) && this.visible) {
      this.onTouch(player);
    }
  }
}
