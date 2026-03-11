import React from "react";

export default function Loop() {
  const items = ["Any box. Any design. Any size — made your way", "Any box. Any design. Any size — made your way."];

  return (
    <section className="w-full bg-[#161817]">
      <div className="relative w-full overflow-hidden py-2 sm:py-3 md:py-3 lg:py-3 border-y border-[#EAE8E2]/10">
        {/* luxury overlay */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03),transparent_20%,transparent_80%,rgba(255,255,255,0.03))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_65%)]" />

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