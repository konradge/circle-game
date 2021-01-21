class Coin extends Collectibles {
  constructor(x, y, radius, obstacles) {
    super(x, y, radius, obstacles);
    this.settings.fill = true;
    this.settings.fillColor = "yellow";
  }

  onTouch(player) {
    super.onTouch(player);
    player.onCoinTouch();
  }
}
