import React from "react";

const CtaLetter = () => {
  const bulkMessage = encodeURIComponent(
    "Hello, I want to place a bulk order for Taj Boxes. Please share details."
  );

  return (
    <section className="w-full py-6 sm:py-10 lg:py-16">
      <div className="relative w-full min-h-[300px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[520px] overflow-hidden ">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1588498610686-2714130405b3?q=80&w=1170&auto=format&fit=crop"
          alt="Bulk Order Taj Box"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#1E2220]/65" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-8">
          <div className="max-w-[760px] text-center">

            {/* Heading */}
            <h2
              className="
              text-[#FAF9F6] font-light tracking-[-0.02em] leading-tight
              text-[24px]
              sm:text-[30px]
              md:text-[38px]
              lg:text-[46px]
            "
            >
              Planning A Bulk Order For
              <br />
              Weddings, Events Or Businesses?
            </h2>

            {/* Description */}
            <p
              className="
              mt-4 text-[#FAF9F6]/85
              text-[14px]
              sm:text-[15px]
              md:text-[16px]
              max-w-[520px]
              mx-auto
            "
            >
              Talk directly with us to discuss custom designs and bulk pricing.
            </p>

            {/* Buttons */}
            <div
              className="
              mt-8
              flex flex-col sm:flex-row
              items-center justify-center
              gap-4 sm:gap-6
            "
            >
              {/* Call */}
              <a
                href="tel:+919468480991"
                className="
                w-full sm:w-auto
                inline-flex items-center justify-center
                border border-[#FAF9F6]
                px-8 py-3
                min-w-[160px]
                text-[13px]
                uppercase tracking-[0.18em]
                text-[#1E2220]
                bg-[#FAF9F6]
                transition-all duration-300
                hover:bg-transparent hover:text-[#FAF9F6]
                "
              >
                Call
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/919468480991?text=${bulkMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                w-full sm:w-auto
                inline-flex items-center justify-center
                border border-[#FAF9F6]
                px-8 py-3
                min-w-[160px]
                text-[13px]
                uppercase tracking-[0.18em]
                text-[#FAF9F6]
                transition-all duration-300
                hover:bg-[#FAF9F6] hover:text-[#1E2220]
                "
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