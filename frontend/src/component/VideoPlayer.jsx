// import { useRef, useState, useEffect } from "react";

// const VideoPlayer = ({ src, poster }) => {
//   const videoRef = useRef(null);
//   const containerRef = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showControls, setShowControls] = useState(true);
//   const [progress, setProgress] = useState(0);
//   const [volume, setVolume] = useState(1);

//   // ▶️ Play / Pause
//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   // ⏱️ Progress update
//   const handleTimeUpdate = () => {
//     const video = videoRef.current;
//     const percent = (video.currentTime / video.duration) * 100;
//     setProgress(percent || 0);
//   };

//   // ⏩ Seek
//   const handleSeek = (e) => {
//     const video = videoRef.current;
//     const rect = e.target.getBoundingClientRect();
//     const percent = (e.clientX - rect.left) / rect.width;
//     video.currentTime = percent * video.duration;
//   };

//   // 🔊 Volume
//   const handleVolume = (e) => {
//     const v = e.target.value;
//     videoRef.current.volume = v;
//     setVolume(v);
//   };

//   // 🖥️ Fullscreen
//   const handleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       containerRef.current.requestFullscreen();
//     } else {
//       document.exitFullscreen();
//     }
//   };

//   // 🎯 Auto-hide controls
//   useEffect(() => {
//     let timeout;
//     if (showControls) {
//       timeout = setTimeout(() => setShowControls(false), 3000);
//     }
//     return () => clearTimeout(timeout);
//   }, [showControls]);

//   return (
//     <div
//       ref={containerRef}
//       className="relative w-full max-w-5xl aspect-video bg-black group cursor-pointer"
//       onMouseMove={() => setShowControls(true)}
//       onClick={togglePlay}
//     >
//       {/* 🎥 Video */}
//       <video
//         ref={videoRef}
//         src={src}
//         poster={poster}
//         className="w-full h-full object-cover"
//         onTimeUpdate={handleTimeUpdate}
//       />

//       {/* 🎛 Controls */}
//       <div
//         className={`absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 via-transparent to-black/60 transition-opacity ${
//           showControls ? "opacity-100" : "opacity-0"
//         }`}
//       >
//         {/* TOP BAR */}
//         <div className="text-white text-sm font-semibold">
//           Now Playing
//         </div>

//         {/* CENTER PLAY BUTTON */}
//         {!isPlaying && (
//           <div className="flex justify-center items-center">
//             <button className="text-white text-6xl">▶</button>
//           </div>
//         )}

//         {/* BOTTOM CONTROLS */}
//         <div className="space-y-2">

//           {/* PROGRESS BAR */}
//           <div
//             className="w-full h-1 bg-gray-600 cursor-pointer"
//             onClick={handleSeek}
//           >
//             <div
//               className="h-full bg-red-600"
//               style={{ width: `${progress}%` }}
//             />
//           </div>

//           {/* CONTROL ROW */}
//           <div className="flex items-center justify-between text-white text-sm">

//             {/* LEFT */}
//             <div className="flex items-center gap-3">
//               <button onClick={togglePlay}>
//                 {isPlaying ? "⏸" : "▶"}
//               </button>

//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={volume}
//                 onChange={handleVolume}
//               />
//             </div>

//             {/* RIGHT */}
//             <button onClick={handleFullscreen}>⛶</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useRef, useState, useEffect } from "react";

const VideoPlayer = ({ videoKey, poster }) => {
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // ▶️ Play (YouTube autoplay trigger)
  const handlePlay = () => {
    setIsPlaying(true);
  };

  // 🖥️ Fullscreen
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // 🎯 Auto-hide controls
  useEffect(() => {
    let timeout;
    if (showControls) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [showControls]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl aspect-video bg-black group"
      onMouseMove={() => setShowControls(true)}
    >
        {console.log(poster)
        }
      {/* 🎥 Poster before play */}
      {!isPlaying && (
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={handlePlay}
        >
          <img
            src={poster}
            alt="poster"
            className="w-full h-full object-cover"
          />

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-6xl bg-black/60 p-6 rounded-full">
              ▶
            </div>
          </div>
        </div>
      )}

      {/* 🎥 YouTube iframe */}
      {isPlaying && videoKey && (
        <iframe
          key={videoKey}
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1&controls=1`}
          title="Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      )}

    </div>
  );
};

export default VideoPlayer;