import CameraController from "./reactComponents/cameraController";
import SocialModal from "./reactComponents/SocialModal";
import EmailModal from "./reactComponents/EmailModal";
import ProjectModal from "./reactComponents/ProjectModal";
import MusicPlayerController from "./reactComponents/musicPlayerController";

export default function ReactUI() {
  return (
    <>
      <p className="controls-message">Tap/Click around to move</p>
      {/* TODO: Bring the UI components here */}
      <CameraController />
      <MusicPlayerController />
      <SocialModal />
      <EmailModal />
      <ProjectModal />
    </>
  );
}
