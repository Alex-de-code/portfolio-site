import { useEffect, useState } from "react";

export default function musicPlayerController() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <>
      <div className="bg-red-400 absolute bottom-5 left-5 rounded-xl md:w-1/5 lg:h-1/6 p-1 lg:p-3">
        <div className="bg-yellow-300 m-1 p-2 rounded-lg">
          <span className="grid grid-cols-2">
            <div className="col-span-1 mr-1 lg:text-nowrap flex justify-center items-center bg-yellow-800 rounded">
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
          <div className=" bg-blue-400 rounded mt-1 px-1">
            <div className="overflow-hidden">
              <div className=" animate-marquee whitespace-nowrap">
                <span className=" text-white">
                  Your scrolling radio text goes here. This is a ticker!
                </span>
              </div>
            </div>
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
