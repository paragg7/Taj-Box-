import React, { useState } from "react";

const Badge = ({ children }) => {
  return (
    <span className="inline-flex items-center px-2.5 py-1 text-[10px] xs:text-[11px] font-semibold uppercase tracking-wider rounded-sm border bg-white/90 text-gray-900 border-black/10">
      {children}
    </span>
  );
};

const Products = ({
  image1,
  image2,
  name,
  price,
  oldPrice,
  isBestSeller,
  isNew,
  colors = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className={[
          "relative overflow-hidden",
          "aspect-[3/4]",
          "bg-[#e8e6e1]",
          "border border-black/10",
          "mb-3",
        ].join(" ")}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          {isNew && <Badge>New</Badge>}
          {isBestSeller && <Badge>Best Seller</Badge>}
        </div>

        {/* Subtle View Label */}
        <div className="absolute bottom-3 left-3 z-10 opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <span className="bg-white/80 text-gray-900 text-[11px] font-semibold tracking-wide px-3 py-1.5 border border-black/10 rounded-sm">
            View
          </span>
        </div>

        {/* Crossfade Images */}
        <img
          src={image1}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
          loading="lazy"
        />

        <img
          src={image2 || image1}
          alt={name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex justify-between items-start gap-3">
          <h3 className="text-xs xs:text-sm font-normal uppercase text-gray-900 flex-1 leading-snug line-clamp-2">
            {name}
          </h3>

          <div className="text-right whitespace-nowrap">
            <span className="text-xs xs:text-sm font-bold text-gray-900">
              <p>From ₹{price}</p>
            </span>

            
          </div>
        </div>

        {colors?.length > 0 && (
          <div className="flex items-center gap-1.5">
            {colors.map((color, index) => (
              <button
                key={index}
                type="button"
                className="w-4 h-4 rounded-full border border-black/10 hover:border-black/30 transition-colors"
                style={{ backgroundColor: color }}
                aria-label={`Color option ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
