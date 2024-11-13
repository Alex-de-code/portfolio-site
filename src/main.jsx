import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import initGame from "./initGame";
import ReactUI from "./ReactUI";
import { Provider } from "jotai";
import { store } from "./store";

const ui = document.getElementById("ui"); // references ui div
const root = createRoot(ui);
root.render(
  <StrictMode>
    {/*need to pass in the store we want to use*/}
    <Provider store={store}>
      <ReactUI />
    </Provider>
  </StrictMode>
);

initGame(); // calls createKaplayctx
