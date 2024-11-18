import { useEffect, useState } from "react";

export default function musicPlayerController() {
  //   const date = new Date();
  //   const offsetInHours = date.getTimezoneOffset() / 60;
  //   const currentTime = date.toLocaleTimeString();
  //   const timeZone = () => {
  //     offsetInHours > 0
  //       ? "UTC+" + offsetInHours
  //       : "UTC-" + Math.abs(offsetInHours);
  //     return `${currentTime} (${timeZone})`;
  //   };

  //   const getCurrentTime = () => {
  //     const now = new Date();
  //     const hours = now.getHours();
  //     const minutes = now.getMinutes();
  //     const seconds = now.getSeconds();
  //     return `${hours}:${minutes}:${seconds}`;
  //   };

  //   console.log(getCurrentTime());
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <>
      <div className="bg-red-400 absolute bottom-5 left-5 rounded-xl md:w-1/5 lg:h-1/6 p-1 lg:p-3">
        <div className="bg-yellow-300 m-1 p-2 rounded-lg">
          <span className="grid grid-cols-2">
            <div className="col-span-1 mr-1 lg:text-nowrap flex justify-center items-center">
              De-code Radio
            </div>
            <div className="col-span-1 border-2 bg-black text-white border-green-500 rounded-md">
              {/*TODO: write a function that calculates time and puts it in the proper time zone for clock*/}
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
          <div className="w-full bg-blue-400 rounded mt-1 p-1">
            <div>Song Name</div>
            <div>song timer </div>
          </div>
          <span className="flex flex-row justify-around mt-1">
            <button className="bg-orange-500 hover:bg-blue-500">Rewind</button>
            <button className="bg-orange-500">PLay/Pause</button>
            <button className="bg-orange-500">Fastforward</button>
          </span>
        </div>
      </div>
    </>
  );
}
