import React from "react";

export default function Loop() {
  const items = ["Any box. Any design. Any size — made your way", "Any box. Any design. Any size — made your way."];

  return (
    <section className="w-full bg-[#1E2220]">
      <div className="relative w-full overflow-hidden py-2 sm:py-3 md:py-3 lg:py-3 ">
        {/* luxury overlay */}
        <div className="pointer-events-none absolute inset-0 " />
        <div className="pointer-events-none absolute inset-0 " />

        {/* Track */}
        <div className="flex w-max marquee [will-change:transform] select-none">
          {/* Copy A */}
          <div className="flex items-center pr-10 sm:pr-12 md:pr-14 gap-6 sm:gap-8 md:gap-10">
            {items.map((text, i) => (
              <div
                key={`a-${i}`}
                className="flex items-center whitespace-nowrap gap-6 sm:gap-8 md:gap-10 group"
              >
                <span
                  className="
                    uppercase leading-none
                    text-[#EAE8E2]/90
                    text-[20px] xs:text-[24px] sm:text-[32px] md:text-[42px] lg:text-[54px]
                    font-semibold tracking-[0.08em]
                    
                  "
                >
                  {text}
                </span>

                <span
                  className="
                    text-[#EAE8E2]/70
                    text-md sm:text-2xl md:text-4xl
                    
                    
                  "
                >
                  ✦
                </span>
              </div>
            ))}
          </div>

          {/* Copy B */}
          <div
            className="flex items-center pr-10 sm:pr-12 md:pr-14 gap-6 sm:gap-8 md:gap-10"
            aria-hidden="true"
          >
            {items.map((text, i) => (
              <div
                key={`b-${i}`}
                className="flex items-center whitespace-nowrap gap-6 sm:gap-8 md:gap-10 group"
              >
                <span
                  className="
                    uppercase leading-none
                    text-[#EAE8E2]/90
                    text-[20px] xs:text-[24px] sm:text-[32px] md:text-[42px] lg:text-[54px]
                    font-semibold tracking-[0.08em]
                   
                  "
                >
                  {text}
                </span>

                <span
                  className="
                    text-[#EAE8E2]/70
                    text-md sm:text-2xl md:text-4xl
                    
                  "
                >
                  ✦
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}