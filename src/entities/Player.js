export default function makePlayer(k, posVec2, speed) {
  // holds reference to the player
  const player = k.add([
    k.sprite("player", { anim: "walk-down-idle" }),
    k.scale(8), // scale up the player
    k.anchor("center"), // player is drawn from center
    k.area({ shape: new k.Rect(k.vec2(0), 5, 0) }), // hitbox for player
    k.body(), // allows physics to affect player
    k.pos(posVec2),
    "player", // tag is a way to verify game obj
    //here we can pass an obj to specify custom props for this game obj, this removes the need to create classes in an obj oriented way
    {
      direction: k.vec2(0, 0), // direction prop
      directionName: "walk-down", // current player direction
    },
  ]);

  // TODO: player controls, etc...
  let isMouseDown = false;
  const game = document.getElementById("game");
  // event listeners for mouse on desktop + mobile
  game.addEventListener("focusout", () => {
    isMouseDown = false;
  });

  game.addEventListener("mousedown", () => {
    isMouseDown = true;
  });

  game.addEventListener("mouseup", () => {
    isMouseDown = false;
  });

  game.addEventListener("touchstart", () => {
    isMouseDown = true;
  });

  game.addEventListener("touchend", () => {
    isMouseDown = false;
  });

  // camera logic to track player
  player.onUpdate(() => {
    if (!k.camPos().eq(player.pos)) {
      // check if camera position
      k.tween(
        // tween gradually changes a value to destination value
        k.camPos(),
        player.pos,
        0.2, // handles how many seconds the pauses between pos
        (newPos) => k.camPos(newPos),
        k.easings.linear // easing fx
      );
    }
    player.direction = k.vec2(0, 0); // every frame loop we set direction prop of player game obj to a vec2
    const worldMousePos = k.toWorld(k.mousePos()); // need camera mouse pos in game world instead of screen mouse pos

    if (isMouseDown) {
      // we subtract player pos from world mouse pos to calculate direction the player needs to have to go towards mouse pos, then we normalize vec2 with unitto keep values between -1 & 1 to scale vec2 according to speed
      player.direction = worldMousePos.sub(player.pos).unit();
    }

    // TODO: implement animations

    player.move(player.direction.scale(speed));
  });

  return player;
}
