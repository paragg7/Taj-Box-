import React from "react";
import { Link } from "react-router-dom";

const Title = ({ heading, link = "/shop" }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-8xl w-full px-4 xs:px-5 md:px-8">
        <div className="flex items-end justify-between min-h-[64px] md:min-h-[80px]  pb-4">
          
          {/* Left Title */}
          <div>
            <div className="h-[2px] w-10 bg-black mb-3" />
            <h2 className="text-xl xs:text-2xl md:text-3xl lg:text-4xl uppercase font-semibold tracking-wide">
              {heading}
            </h2>
          </div>

          {/* Right Button */}
          <Link
            to={link}
            className="
              group
              relative
              text-xs xs:text-sm
              uppercase
              tracking-widest
              text-black
              transition
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-black/30
            "
          >
            View All
            <span className="block h-px bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 mt-1" />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Title;
