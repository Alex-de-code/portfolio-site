import { PALETTE } from "../constants";

export default function makeIcon(k, parent, posVec2, imageData, subtitle) {
  // create icon game obj
  const icon = parent.add([
    // use sprite component to display sprite
    k.sprite(imageData.name, {
      width: imageData.width,
      height: imageData.height,
    }),
    k.anchor("center"),
    k.pos(posVec2), // position relative to the parent
    k.opacity(0), // takes value btwn 0 & 1, 0 can't be seen, 1 is full opacity
    k.offscreen({ hide: true, distance: 300 }), // when obj is offscreen it will be hidden, this helps w/ performance
  ]);

  // child game obj of icon
  const subtitleText = icon.add([
    k.text(subtitle, { font: "ibm-bold", size: 32 }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.pos(0, 100), // position relative to the icon
    k.opacity(0), // need to add opacity component to every game obj if used and not just parent, b/c the opacity doesn't inherit
  ]);

  return [icon, subtitleText]; // this is necessary to create other components and differentiate btwn them
}
