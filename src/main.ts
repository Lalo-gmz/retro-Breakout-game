import kaplay from "kaplay";

const k = kaplay({
  global: false,
  width: 800,
  height: 600,
  background: [0, 100, 0, 1]
});

const effects = {
  crt: () => ({
      "u_flatness": 3,
  })
}

k.loadShaderURL("crt", null, '/shaders/ctr.frag');
k.loadSound("hit", "/sounds/hit8bits.mp3");
k.loadSound("bg", "/sounds/bg8bits.mp3");
k.loadFont("font", "/fonts/arcade.ttf");


const PADDLE_SPEED = 400;
const BALL_SPEED = 200;
let score = 0

function spawnBricks( cols: number, rows: number ){
  for (let i = 0; i < cols ; i++){
    for (let j = 0; j < rows; j++){
      k.add([
        k.color(k.rgb(255, 255, 255)),
        k.rect(100, 20),
        k.pos(100 + i * 120, 100 + j * 40),
        k.area(),
        k.health(2),
        "brick"
      ]);
    }
  }
}



k.play("bg", {
  loop: true
});

k.scene("game", () => {
  score = 0;

  spawnBricks(5, 4);


  const scoreText = k.add([ 
    k.text("Score: " + score,  { size: 32, font: "font" }), 
    k.pos(10, 10) 
  ]);

  const ball = k.add([
    k.rect(20, 20),
    k.pos(k.width()/2, k.height()/2),
    {
      dx: -1,
      dy: -1
    },
    k.area(),
    "ball"
  ]);

  ball.onUpdate(() => {
    if (ball.pos.y < 0 ){
      ball.dy = 1;
    }
    if (ball.pos.x > k.width() - ball.width || ball.pos.x < 0 ) {
      ball.dx *= -1;
    }
    if (ball.pos.y > k.height() - ball.height) {
      k.go("gameover");
    }
    ball.move(ball.dx * BALL_SPEED, ball.dy * BALL_SPEED);
  })

  const player1 = k.add([
    k.rect(100, 20),
    k.pos(k.width()/2, k.height() - 40),
    k.anchor("center"),
    k.area(),
    "player"
  ]);

  k.onCollide("ball", "player", (ball) => {
    if (k.isKeyDown("left")){
      ball.dx = -1;
    }else if (k.isKeyDown("right")){
      ball.dx = 1;
    }
    ball.dy *= -1;
  })

  ball.onCollide( () => {
    k.play("hit");
  });

  k.onCollide("ball", "brick", (ball, brick) => {
    ball.dy *= -1;
    brick.color = k.rgb(164, 164, 164);
    brick.hurt(1);
    if (brick.hp() > 0) return;
    brick.destroy();
    score++;
    scoreText.text = "Score: " + score;
    if (score === 20)
      k.go("gameover");
    
  })


  k.onKeyDown("left", () => {
    if (player1.pos.x < 0 ) return;
    player1.move(-PADDLE_SPEED, 0);
  });
  k.onKeyDown("right", () => {
    if (player1.pos.x > k.width()) return;
    player1.move(PADDLE_SPEED, 0);
  });

  k.onUpdate( () => {
    k.usePostEffect("crt", effects.crt);
  });


});


k.scene("gameover", () => {
  k.add([
    k.text("Game Over", { size: 48, font: "font" }),
    k.pos(k.width()/2, k.height()/2 - 60),
    k.anchor("center")
  ]);

  k.add([
    k.text("Score: " + score, { size: 32, font: "font" }),
    k.pos(k.width()/2, k.height()/2),
    k.anchor("center")
  ]);

  k.add([
    k.text("Press space to restart", { size: 24, font: "font" }),
    k.pos(k.width()/2, k.height()/2 + 40),
    k.anchor("center")
  ]);

  k.onKeyDown("space", () => {
    k.go("game");
  });
});


k.go("game");