import { opacityTrickleDown } from "../utils";
import makeIcon from "./Icon";

export default function makeSkillIcon(k, parent, posVec2, imageData, subtitle) {
  const [icon, subtitleText] = makeIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle
  );
  // after creating a game obj can add more properties by using the "use" method on any game obj
  icon.use(
    k.area({ shape: new k.Rect(k.vec2(0), icon.width + 50, icon.height + 65) })
  );
  icon.use(k.body());
  icon.onCollide("player", (player) => {
    // allows us to add some force to obj, so it can be pushed around or slide
    icon.applyImpulse(player.direction.scale(500)); // obj gets pushed in direction of player
  });

  //add opacity modifier for child game obj
  opacityTrickleDown(parent, [subtitleText]);

  return icon;
}
