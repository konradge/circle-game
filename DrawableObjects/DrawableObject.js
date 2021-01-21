class DrawableObject {
  constructor(width, height, settings = {}) {
    this.width = width;
    this.height = height;
    this.settings = settings;
  }

  draw() {
    ctx.beginPath();
    if (this.isCircle) {
      ctx.arc(
        this.position.x,
        this.position.y,
        this.width,
        0,
        Math.PI * 2,
        false
      );
    } else {
      ctx.rect(this.position.x, this.position.y, this.width, this.height);
    }
    ctx.strokeStyle = this.settings.strokeColor || "black";
    ctx.stroke();
    if (this.settings.fill) {
      ctx.fillStyle = this.settings.fillColor || "black";
      ctx.fill();
    }
    ctx.closePath();

    //Is at canvas edge
    //if (this.pos.x + this.radius * 2) //this.pos.add(this.velocity);
  }

  intersects(object) {
    if (object instanceof DrawableCircle && this instanceof DrawableCircle) {
      //Circle - Circle
    } else if (object instanceof DrawableRect && this instanceof DrawableRect)
      ctx.beginPath();
    ctx.moveTo(0, bounds.maxX);
    ctx.line;
    ctx.closePath();

    if (
      (bounds.minX > otherBounds.minX && bounds.minX < otherBounds.maxX) ||
      (bounds.maxX > otherBounds.minX && bounds.maxX < otherBounds.maxX)
    ) {
      if (
        (bounds.minY > otherBounds.minY && bounds.minY < otherBounds.maxY) ||
        (bounds.maxY > otherBounds.minY && bounds.maxY < otherBounds.maxY)
      ) {
        return true;
      }
    }
  }
}
