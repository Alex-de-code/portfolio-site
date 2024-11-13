import {
  isSocialModalVisibleAtom,
  store,
  selectedLinkAtom,
  selectedLinkDescriptionAtom,
} from "../store";
import makeIcon from "./Icon";
import { PALETTE } from "../constants";
import { opacityTrickleDown } from "../utils";

// acts as a constructor
export default function makeSocialIcon(
  k,
  parent,
  posVec2,
  imageData,
  subtitle,
  link,
  description
) {
  const [socialIcon, subtitleText] = makeIcon(
    k,
    parent,
    posVec2,
    imageData,
    subtitle
  );
  //child game obj of socialIcon, these will be our switches that activate modal to populate with data from the store
  const linkSwitch = socialIcon.add([
    k.circle(30),
    k.color(k.Color.fromHex(PALETTE.color1)),
    k.anchor("center"),
    k.area(),
    k.pos(0, 150),
    k.opacity(0),
  ]);

  linkSwitch.onCollide("player", () => {
    store.set(isSocialModalVisibleAtom, true); // this is how we set in Vanilla JS to Jotai store, sends data signal to open the modal
    store.set(selectedLinkAtom, link);
    store.set(selectedLinkDescriptionAtom, description);
  });

  // TODO: opacity modifier for child game obj

  opacityTrickleDown(parent, [subtitleText, linkSwitch]);

  return socialIcon;
}
