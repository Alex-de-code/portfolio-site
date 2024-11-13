import { PALETTE } from "../constants";

export default function makeSection(k, posVec2, sectionName, onCollide) {
  const section = k.add([
    k.rect(200, 200, { radius: 10 }), // shape of section
    k.anchor("center"), // dra game obj from center
    k.area(), // hitbox to test collisions on
    k.pos(posVec2), // set position
    k.color(PALETTE.color1), // set color
    sectionName,
  ]);

  // child game obj, add method on a game obj will create the child obj positioned relative to parent obj, if parent is destroyed child is destroyed
  section.add([
    k.text(sectionName, { font: "ibm-bold", size: 64 }),
    k.color(PALETTE.color1),
    k.anchor("center"),
    k.pos(0, -150),
  ]);

  if (onCollide) {
    // check tag that game obj is having collision with
    const onCollideController = section.onCollide("player", () => {
      onCollide(section);
      onCollideController.cancel(); // only want collision to occur once, saves performance and doesn't allow for duplicate game obj for skills section
    });
  }
}
