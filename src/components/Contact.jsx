import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

/**
 * ImageClipBox Component
 * A utility component for rendering an image with a custom clip path or styling.
 *
 * @param {string} src - The source path of the image.
 * @param {string} clipClass - The Tailwind or custom class defining clip paths or transforms.
 */
const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

/**
 * Contact Component
 * This section serves as a call-to-action for users to connect with Zentry.
 * It uses layered imagery with custom clip paths and a stylized animated title.
 */
const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      {/* Main wrapper with dark theme */}
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">

        {/* Left-side decorative images (visible only on larger screens) */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        {/* Right-side floating swordman visuals */}
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        {/* Central content: CTA, title, and button */}
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[10px] uppercase">
            Join Zentry
          </p>

          {/* Main animated title with stylized spans */}
          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />

          {/* Call to action button */}
          <Button title="contact us" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
