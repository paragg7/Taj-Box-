import React from "react";

export default function Loop() {
  const items = ["mdf", "file", "dhollu", "hamper", "platter", "sweet", "cake"];

  return (
    <section className="w-full bg-black">
      <div className="relative w-full overflow-hidden py-3 xs:py-4 sm:py-6 md:py-7 lg:py-8">
        {/* subtle glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)] pointer-events-none" />

        {/* Track */}
        <div
          className="
            flex w-max marquee
            [will-change:transform]
          "
        >
          {/* Copy A */}
          <div className="flex items-center pr-8 xs:pr-10 sm:pr-12 gap-5 xs:gap-6 sm:gap-10 md:gap-12">
            {items.map((text, i) => (
              <div
                key={`a-${i}`}
                className="flex items-center group whitespace-nowrap gap-5 xs:gap-6 sm:gap-10 md:gap-12"
              >
                <span
                  className="
                    uppercase font-extrabold tracking-tight text-white leading-none
                    text-[26px] xs:text-[30px] sm:text-[44px] md:text-[58px] lg:text-[72px]
                    transition duration-300 group-hover:text-yellow-400
                  "
                >
                  {text}
                </span>

                <span className="text-white text-[14px] xs:text-[16px] sm:text-[20px] md:text-[24px]">
                  ✺
                </span>
              </div>
            ))}
          </div>

          {/* Copy B */}
          <div
            className="flex items-center pr-8 xs:pr-10 sm:pr-12 gap-5 xs:gap-6 sm:gap-10 md:gap-12"
            aria-hidden="true"
          >
            {items.map((text, i) => (
              <div
                key={`b-${i}`}
                className="flex items-center group whitespace-nowrap gap-5 xs:gap-6 sm:gap-10 md:gap-12"
              >
                <span
                  className="
                    uppercase font-extrabold tracking-tight text-white leading-none
                    text-[26px] xs:text-[30px] sm:text-[44px] md:text-[58px] lg:text-[72px]
                    transition duration-300 group-hover:text-yellow-400
                  "
                >
                  {text}
                </span>

                <span className="text-white text-[14px] xs:text-[16px] sm:text-[20px] md:text-[24px]">
                  ✺
                </span>
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
}