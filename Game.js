class Game {
  player = new Player();
  paused = true;
  finished = false;
  levelNo = -1;
  points = 100;
  time = { min: Math.floor(gameTime / 60), sec: gameTime % 60 };
  countdownInterval;
  newRecord = null;

  constructor() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case pauseKey:
          this.paused = !this.paused;
          if (!this.paused) {
            this.render();
            this.startCountdown();
          } else {
            clearInterval(this.countdownInterval);
          }
          break;
        case "h":
          selectLevel(-1);
          this.player = new Player();
          this.finished = false;
          this.paused = true;
          this.time = { min: Math.floor(gameTime / 60), sec: gameTime % 60 };
          this.points = 100;
        default:
      }
    });
  }

  testCoins() {
    coins = coins.filter((c) => c.visible);
    if (coins.length <= 5) {
      console.log("New coin");
      coins.push(
        Coin.generateCoin(
          { min: 0, max: canvas.width },
          { min: 0, max: canvas.height },
          20,
          obstacles
        )
      );
    }
  }

  countdown() {
    if (this.time.sec == 0) {
      this.time.sec = 59;
      this.time.min--;
    } else {
      this.time.sec--;
    }

    if (this.time.min <= 0 && this.time.sec <= 0) {
      clearInterval(this.countdownInterval);
      this.finished = true;
      if (
        this.points > Number(localStorage.getItem(`level${this.levelNo}`) | 0)
      ) {
        this.newRecord = {
          lastRecord: localStorage.getItem(`level${this.levelNo}`),
        };
        localStorage.setItem(`level${this.levelNo}`, this.points.toString());
      } else {
        this.newRecord = null;
      }
    }
  }

  startCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
    this.countdownInterval = setInterval(this.countdown.bind(this), 1000);
  }

  start() {
    this.render();
  }

  render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "14px FontAwesome";
    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Punkte: ${this.points}`, canvas.width - 200, 32);
    ctx.fillText(
      `Restzeit: ${this.time.min}:${this.time.sec < 10 ? "0" : ""}${
        this.time.sec
      }`,
      canvas.width - 200,
      64
    );
    ctx.font = "20px Arial";
    if (this.finished) {
      ctx.fillText(`Level ${this.levelNo} beendet.`, 50, 50);
      ctx.font = "40px Arial";
      ctx.fillText(`${this.points} Punkte erreicht!`, 50, 100);
      ctx.font = "30px Arial";
      if (this.newRecord) {
        ctx.fillText("Du hast deinen bisherigen Rekord gebrochen!", 50, 150);
        ctx.font = "20px Arial";
        ctx.fillText(
          `Dein bisheriger Rekord: ${this.newRecord.lastRecord || 0}`,
          50,
          190
        );
      } else {
        ctx.font = "20px Arial";
        ctx.fillText(
          `Dein bisheriger Rekord: ${
            localStorage.getItem(`level${this.levelNo}`) || 0
          }`,
          50,
          190
        );
      }
      ctx.fillText("Drücke 'h', um ins Hauptmenü zu kommen.", 50, 220);
    } else if (this.paused) {
      let y = 50;
      ctx.fillText(`Über das Level ${this.levelNo}`, 50, y);
      ctx.font = "15px Arial";
      y += 30;
      levels[this.levelNo].description.split("\n").forEach((t, i) => {
        ctx.fillText(t, 50, y);
        y += 17;
      });

      y += 50;
      ctx.font = "25px Arial";
      ctx.fillText("Drücke 'h', um ins Hauptmenü zu kommen", 50, y);
      y += 30;
      ctx.fillText(`Drücke '${pauseKey}' um weiter zu spielen`, 50, y);
    } else {
      ctx.fillText(`Drücke '${pauseKey}' zum Pausieren`, 10, 20);
      this.player.draw([...corners, ...obstacles]);
      [...obstacles, ...corners].forEach((o) => o.draw(this.player));
      coins.forEach((c) => c.draw(this.player));
      requestAnimationFrame(this.render.bind(this));
    }
  }
}
