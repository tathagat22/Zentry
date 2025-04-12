import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Register GSAP's ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // Track the index of the currently displayed main video
  const [currentIndex, setCurrentIndex] = useState(1);

  // Determines whether the user has interacted with the mini video preview
  const [hasClicked, setHasClicked] = useState(false);

  // Show loading screen until videos are loaded
  const [isLoading, setIsLoading] = useState(true);

  // Counter to track how many videos have been fully loaded
  const [loadedVideos, setLoadedVideos] = useState(0);

  // Total number of looping videos available
  const totalVideos = 4;

  // Reference to the "next" video element (used for animation and playback control)
  const nextRef = useRef(null);

  /**
   * Called each time a video is successfully loaded.
   * Increments the loaded video counter.
   */
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  /**
   * Calculates the index for the upcoming video preview.
   * Loops back to 1 after reaching the last video.
   */
  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  /**
   * Triggered when the user clicks on the mini video preview.
   * Marks the video as clicked and updates the main video index.
   */
  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  /**
   * Once all but one video is loaded (assuming 3 videos), hide the loading screen.
   */
  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  /**
   * GSAP animation when a new video is triggered via mini preview click.
   * - Makes the next video visible and scales it up to full size.
   * - Simultaneously animates the current video in from scale 0.
   */
  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextRef.current.play(),
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true, // Cleans up old animations on re-run
    }
  );

  /**
   * GSAP scroll-triggered animation applied to the main video frame.
   * - Adds a polygon-based clip-path and rounded corners for a stylized mask effect.
   * - Transitions smoothly as the user scrolls.
   */
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true, // Animates based on scroll position
      },
    });
  });

  /**
   * Helper function to get the video source path based on the index.
   */
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* LOADING OVERLAY */}
      {isLoading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      {/* MAIN VIDEO FRAME */}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        {/* VIDEO CONTAINER */}
        <div>
          {/* MINIATURE VIDEO PREVIEW BUTTON */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          {/* NEXT VIDEO DISPLAY (used in animations) */}
          <video
            ref={nextRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          {/* BACKGROUND VIDEO - always playing in loop */}
          <video
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>

        {/* OVERLAY TEXT - FLOATING TITLE */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        {/* TEXT + CTA BUTTON BLOCK */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redfi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* GHOST HEADING BELOW VIDEO FRAME */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5  text-black-75">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
