function circleCircleIntersection(circle1, circle2) {
  return (
    circle1.position.distance(circle2.position) <
    circle1.radius + circle2.radius
  );
}

function circleRectangleIntersection(circ, rect) {
  const distX = Math.abs(circ.position.x - rect.centerPosition.x);
  const distY = Math.abs(circ.position.y - rect.centerPosition.y);
  if (distX > rect.width / 2 + circ.radius) {
    return false;
  }
  if (distY > rect.height / 2 + circ.radius) {
    return false;
  }
  if (distX <= rect.width / 2) {
    return true;
  }
  if (distY <= rect.height / 2) {
    return true;
  }
}

function randInt(min, max) {
  return Math.random() * (max - min) + min;
}

function topBottom(bounds, otherBounds) {
  return bounds.maxY > otherBounds.minY && bounds.minY < otherBounds.minY;
}

function bottomTop(bounds, otherBounds) {
  return bounds.minY < otherBounds.maxY && bounds.maxY > otherBounds.maxY;
}

function rightLeft(bounds, otherBounds) {
  return bounds.maxX > otherBounds.minX && bounds.minX < otherBounds.minX;
}

function leftRight(bounds, otherBounds) {
  return bounds.minX < otherBounds.maxX && bounds.maxX > otherBounds.maxX;
}

function isCircleInsideRectangle(circle, rectangle) {
  return (
    circle.position.x - circle.radius > rectangle.position.x &&
    circle.position.x + circle.radius <
      rectangle.position.x + rectangle.width &&
    circle.position.y - circle.radius > rectangle.position.y &&
    circle.position.y + circle.radius < rectangle.position.y + rectangle.height
  );
}

function generateObstacle(onTouch) {
  const y = randInt(30, canvas.height - 30);
  const height = randInt(20, 100);
  const width = randInt(20, 100);
  let x = randInt(30, canvas.width - 30);
  if (y + height > canvas.height - 150) {
    x = randInt(30, canvas.width - 150 - width);
  }

  return new Obstacle(x, y, width, height, { fill: true, onTouch });
}
