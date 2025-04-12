import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

// Register the GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * AnimatedTitle Component
 * 
 * This component renders a title that animates each word as it enters the viewport.
 * It splits the input title by `<br />` tags to support multiple lines and animates
 * each word with GSAP when the component scrolls into view.
 *
 * @param {string} title - The title text, which may include <br /> to define line breaks.
 * @param {string} containerClass - Additional CSS classes for the outer container.
 */
const AnimatedTitle = ({ title, containerClass }) => {
  // Ref for the container div to attach scroll trigger and animations
  const containerRef = useRef(null);

  useEffect(() => {
    // Setup GSAP animation context scoped to this component only
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,     // Animate when this element enters view
          start: "100 bottom",               // Start animation when 100px from the bottom
          end: "center bottom",              // End animation when center hits bottom
          toggleActions: "play none none reverse", // Animate in and reverse on scroll out
        },
      });

      // Animate all elements with the class `animated-word`
      // - Brings them in with staggered delay, from a 3D rotated and offset position
      titleAnimation.to(
        ".animated-word",
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)",
          ease: "power2.inOut",
          stagger: 0.02, // Delay between each word's animation
        },
        0
      );
    }, containerRef); // Bind to the container to scope animations safely

    return () => ctx.revert(); // Clean up animations when the component unmounts
  }, []);

  return (
    <div ref={containerRef} className={clsx("animated-title", containerClass)}>
      {/* Split the title string by <br /> to support multiline animated titles */}
      {title.split("<br />").map((line, index) => (
        <div
          key={index}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3"
        >
          {/* Split line into words and render each as a span with animation class */}
          {line.split(" ").map((word, idx) => (
            <span
              key={idx}
              className="animated-word"
              // Render HTML entities correctly (e.g., <b>, <i>, etc.)
              dangerouslySetInnerHTML={{ __html: word }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
