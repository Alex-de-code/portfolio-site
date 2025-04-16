import makeSection from "./components/Section";
import makeKaplayCtx from "./kaplayCtx";
import { PALETTE } from "./constants";
import makePlayer from "./entities/Player";
import { cameraZoomValueAtom, store } from "./store";
import makeEmailIcon from "./components/EmailIcon";
import makeSocialIcon from "./components/SocialIcon";
import makeSkillIcon from "./components/SkillIcon";
import { makeAppear } from "./utils";
import makeWorkExperienceCard from "./components/WorkExperienceCard";
import makeProjectCard from "./components/ProjectCard";

export default async function initGame() {
  const generalData = await (await fetch("./configs/generalData.json")).json(); // fetch data from json file in configs & store to variable
  const socialsData = await (await fetch("./configs/socialsData.json")).json(); // fetch socials data
  const skillsData = await (await fetch("./configs/skillsData.json")).json(); // fetch skills data
  const projectsData = await (
    await fetch("./configs/projectsData.json")
  ).json(); // fetch project data

  const experiencesData = await (
    await fetch("./configs/experiencesData.json")
  ).json(); // fetch experiences data

  const k = makeKaplayCtx(); // holds Kaplay Contexy
  // loadSprite() is a f(x) kaplay offers, 1st parameter is used by specifying a key for a specific sprite, 2nd is that sprite's path, 3rd is data properties
  k.loadSprite("player", "./sprites/player.png", {
    sliceX: 4, // # of rows, this helps us cut up the frames to prepare for animations
    sliceY: 8, // # of columns
    anims: {
      "walk-down-idle": 0, // animation always starts at 0
      "walk-down": { from: 0, to: 3, loop: true }, // "from" key is the frame that starts animation, "to" key is the end frame
      "walk-left-down": { from: 4, to: 7, loop: true }, // we have animations looping by default while the condition is met
      "walk-left-down-idle": 4,
      "walk-left": { from: 8, to: 11, loop: true },
      "walk-left-idle": 8,
      "walk-left-up": { from: 12, to: 15, loop: true },
      "walk-left-up-idle": 12,
      "walk-up": { from: 16, to: 19, loop: true },
      "walk-up-idle": 16,
      "walk-right-up": { from: 20, to: 23, loop: true },
      "walk-right-up-idle": 20,
      "walk-right": { from: 24, to: 27, loop: true },
      "walk-right-idle": 24,
      "walk-right-down": { from: 28, to: 31, loop: true },
      "walk-right-down-idle": 28,
    }, //allows us to specify animations
  });

  k.loadFont("ibm-regular", "./fonts/IBMPlexSans-Regular.ttf");
  k.loadFont("ibm-bold", "./fonts/IBMPlexSans-Bold.ttf");
  k.loadSprite("github-logo", "./logos/github-logo.png");
  k.loadSprite("linkedin-logo", "./logos/linkedin-logo.png");
  //   k.loadSprite("youtube-logo", "./logos/youtube-logo.png");
  //   k.loadSprite("x-logo", "./logos/x-logo.png");
  //   k.loadSprite("substack-logo", "./logos/substack-logo.png");
  k.loadSprite("javascript-logo", "./logos/js-logo.png");
  //   k.loadSprite("typescript-logo", "./logos/ts-logo.png");
  k.loadSprite("react-logo", "./logos/react-logo.png");
  k.loadSprite("nextjs-logo", "./logos/nextjs-logo.png");
  k.loadSprite("nodejs-logo", "./logos/nodejs-logo.png");
  k.loadSprite("postgres-logo", "./logos/postgres-logo.png");
  k.loadSprite("html-logo", "./logos/html-logo.png");
  k.loadSprite("css-logo", "./logos/css-logo.png");
  k.loadSprite("tailwind-logo", "./logos/tailwind-logo.png");
  k.loadSprite("python-logo", "./logos/python-logo.png");
  k.loadSprite("email-logo", "./logos/email-logo.png");
  // k.loadSprite("sonic-js", "./projects/sonic-js.png");
  // k.loadSprite("kirby-ts", "./projects/kirby-ts.png");
  k.loadSprite("admindashboard", "./projects/admindashboard.png");
  k.loadSprite("taleblazers", "./projects/taleblazers.png");
  k.loadSprite("head2head", "./projects/head2head.png");
  // k.loadSprite("platformer-js", "./projects/platformer-js.png");
  k.loadShaderURL("tiledPattern", null, "./shaders/tiledPattern.frag");

  //TODO : Import Shader
  k.loadShaderURL("tiledPattern", null, "/shaders/tiledPattern.frag"); //depending on type of shader this dictates the # of aprams

  const setInitCamZoomValue = () => {
    // camera zoom check depending on screen size
    if (k.width() < 1000) {
      store.set(cameraZoomValueAtom, 0.5);
      k.camScale(k.vec2(0.5));
      return;
    }
    store.set(cameraZoomValueAtom, 0.5);
    k.camScale(k.vec2(0.8));
  };

  setInitCamZoomValue(); // call camera zoom fx

  //runs a loop on every frame, kind of like useEffect
  k.onUpdate(() => {
    const cameraZoomValue = store.get(cameraZoomValueAtom);
    if (cameraZoomValue !== k.camScale().x) k.camScale(k.vec2(cameraZoomValue));
  });

  // game object, an obj displayed on the screen
  const tiledBackground = k.add([
    k.uvquad(k.width(), k.height()), //uvquad = surface we want to display the shader on, k.width & k.height give us height & width of canvas
    k.shader("tiledPattern", () => ({
      u_time: k.time() / 20,
      u_color1: k.Color.fromHex(PALETTE.color2),
      u_color2: k.Color.fromHex(PALETTE.color6),
      u_speed: k.vec2(1, -1), // speed in y & x direction
      u_aspect: k.width() / k.height(), // aspect ratio
      u_size: 5, // size of each of our squares
    })), // displays shader onto screen
    k.pos(0), // place game obj in top-left corner, we use positional component here so that we can update position of game obj after
    k.fixed(), // make sure game object isn't affected by camera, ideal for bg and ui elements
  ]); //this is method to create game obj, then we pass an array of components

  k.onResize(() => {
    tiledBackground.width = k.width();
    tiledBackground.height = k.height();
    tiledBackground.uniform.u_aspect = k.width() / k.height();
  });

  // create About Section
  makeSection(
    k,
    k.vec2(k.center().x, k.center().y - 400),
    generalData.section1Name,
    (parent) => {
      const container = parent.add([k.pos(-805, -700), k.opacity(0)]);

      container.add([
        k.text(generalData.header.title, { font: "ibm-bold", size: 88 }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(395, 0),
        k.opacity(0),
      ]);

      container.add([
        k.text(generalData.header.subtitle, { font: "ibm-bold", size: 48 }),
        k.color(k.Color.fromHex(PALETTE.color1)),
        k.pos(485, 100),
        k.opacity(0),
      ]);

      const socialContainer = container.add([k.pos(130, 0), k.opacity(0)]);

      for (const socialData of socialsData) {
        if (socialData.name === "Email") {
          makeEmailIcon(
            k,
            socialContainer,
            k.vec2(socialData.pos.x, socialData.pos.y),
            socialData.imageData,
            socialData.name,
            socialData.address
          );

          continue;
        }
        makeSocialIcon(
          k,
          socialContainer,
          k.vec2(socialData.pos.x, socialData.pos.y),
          socialData.imageData,
          socialData.name,
          socialData.link,
          socialData.description
        );
      }

      makeAppear(k, container);
      makeAppear(k, socialContainer);
    }
  );

  // create Skills Section
  makeSection(
    k,
    k.vec2(k.center().x - 400, k.center().y),
    generalData.section2Name,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(-300, 0)]);

      for (const skillData of skillsData) {
        makeSkillIcon(
          k,
          container,
          k.vec2(skillData.pos.x, skillData.pos.y),
          skillData.logoData,
          skillData.name
        );
      }

      makeAppear(k, container);
    }
  );

  // create Experience Section
  makeSection(
    k,
    k.vec2(k.center().x + 400, k.center().y),
    generalData.section3Name,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0)]);

      for (const experienceData of experiencesData) {
        makeWorkExperienceCard(
          k,
          container,
          k.vec2(experienceData.pos.x, experienceData.pos.y),
          experienceData.cardHeight,
          experienceData.roleData
        );
      }
      makeAppear(k, container);
    }
  );

  // create Projects Section
  makeSection(
    k,
    k.vec2(k.center().x, k.center().y + 400),
    generalData.section4Name,
    (parent) => {
      const container = parent.add([k.opacity(0), k.pos(0, 0)]);

      for (const project of projectsData) {
        makeProjectCard(
          k,
          container,
          k.vec2(project.pos.x, project.pos.y),
          project.data,
          project.thumbnail
        );
      }
      makeAppear(k, container);
    }
  );

  makePlayer(k, k.vec2(k.center()), 700); // 1st param = context, 2nd param = create structure that will define position w/ x & y coordinates, k.center allows us to get current center of canvas, 3rd param = player speed
}
