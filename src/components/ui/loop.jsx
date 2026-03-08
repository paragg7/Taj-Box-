import React from "react";

export default function Loop() {
<<<<<<< HEAD
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
=======
  const items = ["MDF", "FILE", "DHOLLU", "HAMPER", "PLATTER", "SWEET", "CAKE"];

  return (
    <section className="w-full bg-black">
      <div className="relative w-full overflow-hidden py-3 sm:py-4 md:py-5 lg:py-4 border-y border-white/10">
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
                    text-white/90
                    text-[20px] xs:text-[24px] sm:text-[32px] md:text-[42px] lg:text-[54px]
                    font-semibold tracking-[0.08em]
                    transition-all duration-300
                    group-hover:text-white
>>>>>>> 8fa65e4 (Updated Taj Box project)
                  "
                >
                  {text}
                </span>

<<<<<<< HEAD
                <span className="text-white text-[14px] xs:text-[16px] sm:text-[20px] md:text-[24px]">
                  ✺
=======
                <span
                  className="
                    text-white/35
                    text-[10px] sm:text-[12px] md:text-[14px]
                    transition-all duration-300
                    group-hover:text-white/60
                  "
                >
                  ✦
>>>>>>> 8fa65e4 (Updated Taj Box project)
                </span>
              </div>
            ))}
          </div>

          {/* Copy B */}
          <div
<<<<<<< HEAD
            className="flex items-center pr-8 xs:pr-10 sm:pr-12 gap-5 xs:gap-6 sm:gap-10 md:gap-12"
=======
            className="flex items-center pr-10 sm:pr-12 md:pr-14 gap-6 sm:gap-8 md:gap-10"
>>>>>>> 8fa65e4 (Updated Taj Box project)
            aria-hidden="true"
          >
            {items.map((text, i) => (
              <div
                key={`b-${i}`}
<<<<<<< HEAD
                className="flex items-center group whitespace-nowrap gap-5 xs:gap-6 sm:gap-10 md:gap-12"
              >
                <span
                  className="
                    uppercase font-extrabold tracking-tight text-white leading-none
                    text-[26px] xs:text-[30px] sm:text-[44px] md:text-[58px] lg:text-[72px]
                    transition duration-300 group-hover:text-yellow-400
=======
                className="flex items-center whitespace-nowrap gap-6 sm:gap-8 md:gap-10 group"
              >
                <span
                  className="
                    uppercase leading-none
                    text-white/90
                    text-[20px] xs:text-[24px] sm:text-[32px] md:text-[42px] lg:text-[54px]
                    font-semibold tracking-[0.08em]
                    transition-all duration-300
                    group-hover:text-white
>>>>>>> 8fa65e4 (Updated Taj Box project)
                  "
                >
                  {text}
                </span>

<<<<<<< HEAD
                <span className="text-white text-[14px] xs:text-[16px] sm:text-[20px] md:text-[24px]">
                  ✺
=======
                <span
                  className="
                    text-white/35
                    text-[10px] sm:text-[12px] md:text-[14px]
                    transition-all duration-300
                    group-hover:text-white/60
                  "
                >
                  ✦
>>>>>>> 8fa65e4 (Updated Taj Box project)
                </span>
              </div>
            ))}
          </div>
        </div>
<<<<<<< HEAD

       
=======
>>>>>>> 8fa65e4 (Updated Taj Box project)
      </div>
    </section>
  );
}