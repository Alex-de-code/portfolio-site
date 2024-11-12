export default async function initGame() {
  const k = makeKaplayCtx(); // holds Kaplay Contexy
  k.loadSprite("player", "./sprites/player.png", {}); // loadSprite() is a f(x) kaplay offers, 1st parameter is used by specifying a key for a specific sprite, 2nd is that sprite's path, 3rd is data properties
}
