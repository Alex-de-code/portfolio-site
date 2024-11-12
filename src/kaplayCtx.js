import kaplay from "kaplay";

// this kaplay f(x) creates the kaplay context
// it's the way we will use kaplay throughout project
// this will initialize the canvas
export default function makeKaplayCtx() {
  return kaplay({
    global: false, // can only use kaplay functions in the context of this function
    pixelDensity: 2, // to ensure display is sharp on multiple views
    touchToMouse: true, // so portfolio works on mobile as well
    debug: true, // will later set this to false in prod.
    debugKey: "f1",
    canvas: document.getElementById("game"),
  });
}
