class Player extends DrawableCircle {
  lastTouch = Date.now();
  lastMouseTouch = Date.now();
  onObstacleTouch = () => game.points--;
  onCoinTouch = () => {
    game.points++;
    game.testCoins();
  };
  constructor() {
    super(canvas.width - 75, canvas.height - 75, 25, { fill: true });
    this.direction = new Vector(0, 0);
    this.destination = this.position;
  }

  updatePosition(dir) {
    this.position.add(dir);
  }

  draw(obstacles = [], objects = []) {
    super.draw(ctx);
    this.direction = new Vector(
      this.destination.x - this.position.x,
      this.destination.y - this.position.y
    );
    if (this.direction.length() < this.radius) {
      this.direction = new Vector(0);
      this.settings.fillColor = "red";
      if (Date.now() - this.lastMouseTouch > 2000) {
        this.lastMouseTouch = Date.now();
        game.points--;
      }
    } else {
      this.settings.fillColor = null;
    }

    obstacles.forEach((o) => {
      let intersects = false;
      if (o instanceof DrawableCircle) {
        intersects = circleCircleIntersection(this, o);
      } else {
        intersects = circleRectangleIntersection(this, o);
      }

      if (intersects) {
        const bounds = {
          maxX: this.position.x + this.radius,
          minX: this.position.x - this.radius,
          maxY: this.position.y + this.radius,
          minY: this.position.y - this.radius,
        };
        const otherBounds = {};
        if (o instanceof DrawableCircle) {
          otherBounds.maxX = o.position.x + o.radius;
          otherBounds.minX = o.position.x - o.radius;
          otherBounds.maxY = o.position.y + o.radius;
          otherBounds.minY = o.position.y - o.radius;
        } else {
          otherBounds.maxX = o.position.x + o.width;
          otherBounds.minX = o.position.x;
          otherBounds.maxY = o.position.y + o.height;
          otherBounds.minY = o.position.y;
        }
        while (intersects) {
          if (leftRight(bounds, otherBounds)) {
            //From Left -> Right
            this.position.add(new Vector(1, 0));
          }
          if (rightLeft(bounds, otherBounds)) {
            //From Right -> Left
            this.position.add(new Vector(-1, 0));
          }
          if (bottomTop(bounds, otherBounds)) {
            //From Bottom -> Top
            this.position.add(new Vector(0, 1));
          }
          if (topBottom(bounds, otherBounds)) {
            //From Top -> Bottom
            this.position.add(new Vector(0, -1));
          }
          if (o instanceof DrawableCircle) {
            intersects = circleCircleIntersection(this, o);
          } else {
            intersects = circleRectangleIntersection(this, o);
          }
        }
      }
    });

    this.direction.normalize();
    this.direction.multiply(playerSpeed);
    this.updatePosition(this.direction);
  }
}

const isBetween = (n, lower, upper) => {
  return n > lower && n < upper;
};
