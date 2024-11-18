import { useEffect, useState } from "react";
// import { PALLETE } from "./constants";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";

export default function musicPlayerController() {
  // state for date/time
  const [dateState, setDateState] = useState(new Date());
  //for updating the clock
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <>
      <div className="bg-color7 absolute bottom-5 left-5 rounded-xl sm:w-1/2 lg:w-1/3 xl:w-1/4 p-1 lg:p-2">
        <div className="bg-color8 m-1 p-2 rounded-lg border-2 border-color5">
          <span className="grid grid-cols-2">
            <div className="col-span-1 mr-1 lg:text-nowrap flex justify-center items-center border-2 border-color5 bg-color9 rounded">
              <p className="">De-code Radio</p>
            </div>
            <div className="col-span-1 border-2 bg-black text-color3 border-color5 rounded-md">
              <div className=" flex justify-center">
                {" "}
                {dateState.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
            </div>
          </span>
          <div className=" bg-color1 rounded mt-1 px-1">
            <div className="overflow-hidden">
              <div className=" animate-marquee whitespace-nowrap">
                <span className=" text-color3">
                  Nothing but the absolute hits!!! Sponsored by Me.
                </span>
              </div>
            </div>
          </div>
          <span className="flex flex-row justify-evenly mt-1">
            <button className="bg-orange-400 p-1 rounded-sm border-2 border-color1 radio-controller-btn">
              <SkipBack />
            </button>
            <button className="bg-orange-400 p-1 rounded-sm border-2 border-color1 radio-controller-btn">
              <Play />
            </button>
            <button className="bg-orange-400 p-1 rounded-sm border-2 border-color1 radio-controller-btn">
              <Pause />
            </button>
            <button className="bg-orange-400 p-1 rounded-sm border-2 border-color1 radio-controller-btn">
              <SkipForward />
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
