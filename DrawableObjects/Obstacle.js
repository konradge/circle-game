class Obstacle extends DrawableRect {
  draw(player) {
    super.draw();
    this.settings.fill = true;
    if (circleRectangleIntersection(player, this)) {
      if (Date.now() - player.lastTouch > 2000) {
        player.lastTouch = Date.now();
        player.onObstacleTouch();
      }
      this.settings.fillColor = "red";
    } else {
      this.settings.fillColor = "black";
    }
  }
}
