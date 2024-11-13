import { useAtom } from "jotai";
import { cameraZoomValueAtom } from "../store";
import { ZOOM_MAX_BOUND, ZOOM_MIN_BOUND } from "../constants";

export default function CameraController() {
  // state to get current zoome value of camera
  const [camZoomValue, setCamZoomValue] = useAtom(cameraZoomValueAtom); //instead of useState we use useAtom, want data accessible in react code and kaplay code

  return (
    <div className="camera-controller">
      {/*increment zoom*/}
      <button
        className="camera-controller-btn"
        onClick={() => {
          const newZoomValue = camZoomValue + 0.2;
          //check if newZoomValue is within range
          if (
            newZoomValue <= ZOOM_MAX_BOUND &&
            newZoomValue >= ZOOM_MIN_BOUND
          ) {
            setCamZoomValue(newZoomValue);
          }
        }}
      >
        +
      </button>
      {/*decrement zoom*/}
      <button
        className="camera-controller-btn"
        onClick={() => {
          const newZoomValue = camZoomValue - 0.2;
          //check if newZoomValue is within range
          if (
            newZoomValue <= ZOOM_MAX_BOUND &&
            newZoomValue >= ZOOM_MIN_BOUND
          ) {
            setCamZoomValue(newZoomValue);
          }
        }}
      >
        -
      </button>
    </div>
  );
}
