import React from "react";

const storyImages = [
  {
    src: "/44.png",
    alt: "Hero 1",
  },
  {
    src: "/42.jpg",
    alt: "Hero 2",
  },
  {
    src: "/43.png",
    alt: "Hero 3",
  },
  {
    src: "/41.jpg",
    alt: "Hero 4",
  },
  {
    src: "/45.jpg",
    alt: "Hero 5",
  },
];

const OurStory = () => {
  return (
    <section className="w-full  px-3 sm:px-4 md:px-6 lg:px-8 ">
      <div className="w-full ">
        {/* Top content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 lg:gap-20 bg-[#EAE8E2] px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-10 md:py-14 lg:py-16">
          {/* Left heading */}
          <div className="flex items-start">
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] leading-[0.95] font-playfair text-[#1E2220] tracking-[-0.02em]">
              Brand Story
            </h2>
          </div>

          {/* Right text */}
          <div className="max-w-full md:max-w-[520px] md:ml-auto space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.8] md:leading-[1.9] text-[#1E2220]">
              At Taj Box, we believe packaging should feel memorable, not
              ordinary. Every box is designed to add elegance, warmth, and
              purpose to the moment it becomes part of.
            </p>

            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.8] md:leading-[1.9] text-[#1E2220]">
              Our mission is to create handcrafted boxes that blend timeless
              craftsmanship with modern refinement. From wedding invitations to
              festive gifting and premium keepsakes, each piece is made to leave
              a lasting impression.
            </p>

            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.8] md:leading-[1.9] text-[#1E2220]">
              We care deeply about the little details — the finish, the feel,
              the proportions, and the experience of opening something truly
              special. Because for us, great design is not just seen, it is
              felt.
            </p>
          </div>
        </div>

        {/* Bottom image strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 border-t border-[#EAE8E2]">
          {storyImages.map((image, index) => (
            <div
              key={index}
              className={`
        group overflow-hidden border-r border-[#EAE8E2] last:border-r-0
        ${index >= 2 ? "hidden sm:block" : ""}
        ${index >= 4 ? "sm:hidden lg:block" : ""}
      `}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-[180px] sm:h-[220px] md:h-[240px] lg:h-[260px] w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurStory;
