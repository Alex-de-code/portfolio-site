import { useEffect, useState, useRef } from "react";
// import { PALLETE } from "./constants";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";

// import { songsData } from "../../public/configs/songsData.json";

export default function musicPlayerController() {
  const [songs, setSongs] = useState([]); //state to store songs
  const [isPlaying, setIsPlaying] = useState(false); // player state
  // const [currentSong, setCurrentSong] = useState(songs[1]);

  // async function fetchSongsData() {
  //   const response = await fetch("./configs/songsData.json");
  //   const songsData = await response.json();
  //   return songsData;
  // }

  // state for date/time
  const [dateState, setDateState] = useState(new Date());
  //for updating the clock
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  useEffect(() => {
    const fetchSongsData = async () => {
      try {
        const response = await fetch("./configs/songsData.json");
        if (!response.ok) {
          throw new Error("Failed to fetch songs data");
        }
        const data = await response.json();
        setSongs(data); // Update state w/ fetched data
      } catch (error) {
        console.error("Error fetching songs data:", error);
      }
    };
    fetchSongsData(); // call f(x)
  }, []);

  console.log(songs);

  return (
    <>
      <div className="bg-color7 absolute bottom-5 left-5 rounded-xl sm:w-1/2 lg:w-1/3 xl:w-1/4 p-1 lg:p-2">
        <div className="bg-color8 m-1 p-2 rounded-lg border-2 border-color5">
          <span className="grid grid-cols-2">
            <div className="col-span-1 mr-1 lg:text-nowrap flex justify-center items-center border-2 border-color5 bg-color9 rounded">
              <p className="">Decode Radio</p>
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
                  Your favorite songs. Back to back. All day long.
                </span>
              </div>
            </div>
          </div>
          {/* <audio src="demo.mp3"></audio> */}
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
