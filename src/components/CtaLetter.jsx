import React from "react";

const CtaLetter = () => {
  const bulkMessage = encodeURIComponent(
    "Hello, I want to place a bulk order for Taj Boxes. Please share details."
  );

  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="relative w-full h-[260px] sm:h-[320px] md:h-[420px] lg:h-[480px] overflow-hidden border border-[#EAE8E2]">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1588498610686-2714130405b3?q=80&w=1170&auto=format&fit=crop"
          alt="Bulk Order Taj Box"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1E2220]/60" />

        {/* Content */}
        <div className="relative z-10 flex h-full w-full items-center justify-center px-4">
          <div className="max-w-[760px] text-center">

            {/* Heading */}
            <h2
              className="text-[#FAF9F6] font-light tracking-[-0.025em] leading-[1.15]
              text-[22px]
              sm:text-[28px]
              md:text-[36px]
              lg:text-[44px]"
            >
              Planning A Bulk Order For
              <br />
              Weddings, Events Or Businesses?
            </h2>

            {/* Description */}
            <p
              className="mt-3 text-[#FAF9F6]/85
              text-[13px]
              sm:text-[14px]
              md:text-[15px]"
            >
              Talk directly with us to discuss custom designs and bulk pricing.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

              {/* Call */}
              <a
                href="tel:+919468480991"
                className="inline-flex items-center justify-center
                border border-[#FAF9F6]
                px-8 py-3
                min-w-[150px]
                text-[13px]
                uppercase tracking-[0.18em]
                text-[#1E2220]
                bg-[#FAF9F6]
                transition-colors duration-300
                hover:bg-transparent hover:text-[#FAF9F6]"
              >
                Call
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/919468480991?text=${bulkMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center
                border border-[#FAF9F6]
                px-8 py-3
                min-w-[150px]
                text-[13px]
                uppercase tracking-[0.18em]
                text-[#FAF9F6]
                transition-colors duration-300
                hover:bg-[#FAF9F6] hover:text-[#1E2220]"
              >
                WhatsApp
              </a>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CtaLetter;