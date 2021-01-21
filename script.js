const startGame = () => {};

document.addEventListener("mousemove", (e) => {
  const newX = e.clientX - canvas.offsetLeft;
  const newY = e.clientY - canvas.offsetTop;
  game.player.destination = new Vector(newX, newY);
});
