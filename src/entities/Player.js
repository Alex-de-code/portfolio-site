import { DIAGONAL_FACTOR } from "../constants";

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

    //if player isn't moving play idle animation
    if (
      player.direction.eq(k.vec2(0, 0)) &&
      !player.getCurAnim().name.includes("idle")
    ) {
      player.play(`${player.directionName}-idle`);
      return;
    }

    // else make player move depending on direction
    if (
      player.direction.x > 0 &&
      player.direction.y > -0.5 &&
      player.direction.y < 0.5
    ) {
      player.directionName = "walk-right";
    }

    if (
      player.direction.x < 0 &&
      player.direction.y > -0.5 &&
      player.direction.y < 0.5
    )
      player.directionName = "walk-left";

    if (player.direction.x < 0 && player.direction.y < -0.8)
      player.directionName = "walk-up";

    if (player.direction.x < 0 && player.direction.y > 0.8)
      player.directionName = "walk-down";

    if (
      player.direction.x < 0 &&
      player.direction.y > -0.8 &&
      player.direction.y < -0.5
    )
      player.directionName = "walk-left-up";

    if (
      player.direction.x < 0 &&
      player.direction.y > 0.5 &&
      player.direction.y < 0.8
    )
      player.directionName = "walk-left-down";

    if (
      player.direction.x > 0 &&
      player.direction.y < -0.5 &&
      player.direction.y > -0.8
    )
      player.directionName = "walk-right-up";

    if (
      player.direction.x > 0 &&
      player.direction.y > 0.5 &&
      player.direction.y < 0.8
    )
      player.directionName = "walk-right-down";

    // if current animation isn't equal to player direction, play animation with that name
    if (player.getCurAnim().name !== player.directionName) {
      player.play(player.directionName);
    }

    // handle diagonal speed, since in games diagonal movement you move faster
    if (player.direction.x && player.direction.y) {
      player.move(player.direction.scale(DIAGONAL_FACTOR * speed));
      return;
    }

    player.move(player.direction.scale(speed));
  });

  return player;
}
