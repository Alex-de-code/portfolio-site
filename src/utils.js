export async function makeAppear(k, gameObj) {
  // get current opacity of game obj
  await k.tween(
    gameObj.opacity,
    1,
    0.5,
    (val) => {
      gameObj.opacity = val;
      //update opacity of all child objs
      for (const child of gameObj.children) {
        child.opacity = gameObj.opacity;
      }
    },
    k.easings.linear
  );
}

export function opacityTrickleDown(parent, indirectChildren) {
  parent.opacityTrickleDown = parent.onUpdate(() => {
    for (const indirectChild of indirectChildren) {
      indirectChild.opacity = parent.opacity;
    }
  });
}
