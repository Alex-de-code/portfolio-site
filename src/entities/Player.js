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

  return player;
}
