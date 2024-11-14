import { PALETTE } from "../constants";
import { opacityTrickleDown } from "../utils";

export default function makeWorkExperienceCard(
  k,
  parent,
  posVec2,
  height, // will dictate how much text we want to show
  roleData
) {
  const card = parent.add([
    k.rect(800, height, { radius: 8 }), // radius is an optional 3rd param
    k.area(),
    k.outline(4, k.Color.fromHex(PALETTE.color1)),
    k.pos(posVec2),
    k.color(k.Color.fromHex(PALETTE.color2)),
    k.opacity(0),
    k.offscreen({ hide: true, distance: 300 }),
  ]);

  // child of card obj
  const title = card.add([
    k.text(roleData.title, { font: "ibm-bold", size: 32 }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.pos(20, 20),
    k.opacity(0),
  ]);

  const history = card.add([
    k.text(
      `${roleData.company.name} -- ${roleData.company.startDate}-${roleData.company.endDate}`,
      {
        font: "ibm-regular",
        size: 20,
      }
    ),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.pos(20, 60),
    k.opacity(0),
  ]);

  const description = card.add([
    k.text(roleData.description, { font: "ibm-regular", size: 25, width: 750 }),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.pos(20, 110),
    k.opacity(0),
  ]);

  opacityTrickleDown(parent, [title, history, description]); // for changing opacity for indirect children of parent obj

  return card;
}
