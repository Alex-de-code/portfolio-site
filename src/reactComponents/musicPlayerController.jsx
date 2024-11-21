import { useEffect, useState, useRef } from "react";
// import { PALLETE } from "./constants";
import { SkipBack, SkipForward, Play, Pause } from "lucide-react";

// import { songsData } from "../../public/configs/songsData.json";

export default function musicPlayerController() {
  const [songs, setSongs] = useState([]); //state to store songs
  const [isPlaying, setIsPlaying] = useState(false); // player state
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex]; // Get the current song data
  const audioRef = useRef(null); // Ref for the audio element
  const [dateState, setDateState] = useState(new Date()); // state for date/time

  const PlayPause = () => {
    setIsPlaying(!isPlaying); // set isPlaying to opposite to flip play/pause
  };

  // Skip to the next song
  const skipForward = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length; // Loop back to the first song when reaching the end
    setCurrentSongIndex(nextIndex);
    // setIsPlaying(true);
    setIsPlaying(false); // Set isPlaying to false first to pause the song
    setTimeout(() => {
      setIsPlaying(true); // After the state updates, set isPlaying to true to play the new song
    }, 100); // Small delay to ensure that the new song is loaded before playing
  };

  // Skip to the previous song
  const skipBack = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Loop to the last song if at the beginning
    setCurrentSongIndex(prevIndex);
    // audioRef.current.curentTime = 0;
    // setIsPlaying(true);
    setIsPlaying(false); // Set isPlaying to false first to pause the song
    setTimeout(() => {
      setIsPlaying(true); // After the state updates, set isPlaying to true to play the new song
    }, 100); // Small delay to ensure that the new song is loaded before playing
  };

  //for updating the clock
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  // fetch all songs
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

  //play music
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  console.log(songs);
  console.log(currentSong);

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
          <div className=" bg-color1 rounded mt-1 px-1 max-w-full">
            <div className="overflow-hidden">
              <div className=" animate-marquee whitespace-nowrap">
                <span className=" text-color3">
                  {!isPlaying
                    ? "Your favorite songs. Back to back. All day long."
                    : `Now playing: ${currentSong.title}` || "Loading Songs..."}
                </span>
              </div>
            </div>
          </div>
          {/* <audio src={currentSong.src} ref={audioRef} /> */}
          {currentSong ? (
            <audio ref={audioRef} src={currentSong.src} />
          ) : (
            <div>Loading Songs...</div> // Show a loading message until the song is available
          )}
          <span className="flex flex-row justify-evenly mt-1">
            <button
              onClick={skipBack}
              className="bg-orange-400 p-1 rounded-sm border-2 border-color1 radio-controller-btn"
            >
              <SkipBack />
            </button>

            {isPlaying ? (
              <button
                onClick={PlayPause}
                className="bg-orange-400 p-1 rounded-sm border-2 border-color1 radio-controller-btn"
              >
                <Pause />
              </button>
            ) : (
              <button
                onClick={PlayPause}
                className="bg-orange-400 p-1 rounded-sm border-2 border-color1 radio-controller-btn"
              >
                <Play />
              </button>
            )}
            <button
              onClick={skipForward}
              className="bg-orange-400 p-1 rounded-sm border-2 border-color1 radio-controller-btn"
            >
              <SkipForward />
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
