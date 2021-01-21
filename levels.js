let obstacles = [];
let coins = [];
const description = document.getElementById("description");
const levelSelector = document.getElementById("levelSelector");

const defaults = {
  obstacleCount: 10,
  coinCount: 10,
};

const levels = [
  {
    title: "Lerne die Steuerung kennen",
    description: `Du steuerst den kleinen Kreis (deine Spielfigur). Bewege die Maus zu einem Ort,
     und die Spielfigur wird sich zu diesem Ort bewegen. Aber passe auf: Der Kreis darf deine Maus nicht
     berühren, ansonsten wird dir ein Punkt abgezogen.
     Das Spiel läuft eine Minute. Versuche in der Zeit, so wenige Punkte wie möglich zu verlieren.`,
  },
  {
    title: "Achtung Hindernisse",
    description: `Es kann auf dem Spielfeld immer wieder Hindernisse geben, 
    welche du nicht durchdringen kannst. Sie werden als schwarze Rechtecke dargestellt.
    Diese solltest du nicht berühren, ansonsten wird Dir ein Punkt abgezogen. 
    Außerdem wird Dir ein Punkt abgezogen, wenn du den Spielfeldrand berührst.`,
  },
  {
    title: "Münzen!!!",
    description: `Oft sind auf dem Spielfeld Münzen verteilt. Wenn du sie einsammelst,
    erhältst du Pluspunkte. Also versuche alle einzusammeln. Wenn du schnell bist, und
    nur noch weniger als 5 Münzen auf dem Spielfeld sind, erscheinen neue Münzen`,
  },
];

const selectLevel = (levelNo) => {
  if (levelNo == -1) {
    description.style = canvas.style = "visibility:hidden";
    levelSelector.style = "";
    console.log(description);
    levelSelector.innerHTML = "";
    levels.forEach((level, index) => {
      let div = document.createElement("div");
      div.style = "margin-left:20px; margin-top:20px;";
      div.innerHTML = `
      <button onclick = "selectLevel(${index})">Level ${index}</button>
      ${
        localStorage.getItem(`level${index}`)
          ? `<div>Rekord: ${localStorage.getItem(`level${index}`)} Punkte</div>`
          : ""
      }
      <div>${level.title}</div>
      `;
      levelSelector.appendChild(div);
      if (true) {
        const divider = document.createElement("hr");
        divider.style =
          "border: solid 1px grey; margin-top: 10px;margin-top: 10px;";
        levelSelector.appendChild(divider);
      }
    });
    console.log(levelSelector);
  } else {
    canvas.style = "";
    description.style = "";
    console.log(description);
    levelSelector.style = "visibility:hidden; height:0";
  }
  switch (levelNo) {
    case 0:
      coins = [];
      obstacles = [];
      //Keine Objekte
      break;
    case 1:
      obstacles = Array.from(
        new Array(levels[levelNo].obstacleCount || defaults.obstacleCount)
      ).map((_, i) => {
        return generateObstacle(() => game.points--);
      });
      coins = [];
      break;
    case 2:
      obstacles = Array.from(
        new Array(levels[levelNo].obstacleCount || defaults.obstacleCount)
      ).map((_, i) => {
        return generateObstacle(() => game.points--);
      });
      coins = Array.from(
        new Array(levels[levelNo].coinCount || defaults.coinCount)
      ).map(() => {
        return Coin.generateCoin(
          { min: 0, max: canvas.width },
          { min: 0, max: canvas.height },
          20,
          obstacles
        );
      });
      break;
    default:
      break;
  }
  if (levelNo >= 0) {
    game.levelNo = levelNo;
    description.innerHTML = levels[levelNo].description;
    game.start();
  }
};
