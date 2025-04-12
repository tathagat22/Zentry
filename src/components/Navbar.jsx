import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

// Navigation items to be rendered in the menu
const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

/**
 * NavBar Component
 *
 * This is a responsive, scroll-aware navigation bar with GSAP animations,
 * audio toggle functionality, and navigation link rendering. It hides or
 * shows based on scroll direction and supports a floating animation effect.
 */
const NavBar = () => {
  // State to manage audio play/pause and animation indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // References for DOM elements: audio tag and nav container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  // Get current vertical scroll position using react-use
  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true); // Controls navbar visibility
  const [lastScrollY, setLastScrollY] = useState(0);       // Tracks last scroll position

  /**
   * Toggles both audio playback and the animated visual indicator.
   */
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  /**
   * Plays or pauses audio based on isAudioPlaying state.
   */
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  /**
   * Handles scroll-based visibility behavior for the nav bar.
   * - Shows nav on scroll up
   * - Hides nav on scroll down
   * - Applies floating effect when scrolled
   */
  useEffect(() => {
    if (currentScrollY === 0) {
      // At the very top — always show nav without floating effect
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down — hide nav and apply floating style
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up — show nav and keep floating style
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  /**
   * GSAP animation to slide the nav bar in/out when its visibility changes.
   */
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,         // Slide up when hidden
      opacity: isNavVisible ? 1 : 0,      // Fade out when hidden
      duration: 0.2,                      // Smooth transition
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">

          {/* === Left: Logo + Products Button === */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* === Right: Nav Links + Audio Toggle === */}
          <div className="flex h-full items-center">

            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Audio Toggle Button with animated bars */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive, // Toggles animated effect
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`, // Stagger animation
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
