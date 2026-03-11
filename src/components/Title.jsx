import React from "react";
import { Link } from "react-router-dom";

const Title = ({ heading, link = "/shop" }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-8xl w-full px-4 xs:px-5 md:px-8">
        <div className="flex items-end justify-between min-h-[64px] md:min-h-[80px]  pb-4">
          
          {/* Left Title */}
          <div>
            <div className=" w-10  mb-3" />
            <h2 className="text-xl text-[#1E2220] xs:text-2xl md:text-3xl lg:text-4xl uppercase font-semibold tracking-wide">
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
              text-[#1E2220]
              transition
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#1E2220]/30
            "
          >
            View All
            <span className="block h-px bg-[#1E2220] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 mt-1" />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Title;
