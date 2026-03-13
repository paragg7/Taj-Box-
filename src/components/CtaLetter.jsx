import React from "react";

const CtaLetter = () => {
  const bulkMessage = encodeURIComponent(
    "Hello, I want to place a bulk order for Taj Boxes. Please share details."
  );

  return (
    <section className="w-full max-w-8xl px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10 lg:py-16">
      <div className="relative min-h-[320px] sm:min-h-[400px] md:min-h-[460px] lg:min-h-[520px] overflow-hidden  bg-[#1E2220]">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1506755594592-349d12a7c52a?q=80&w=1266&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Bulk Order Taj Box"
          className="absolute inset-0 h-full w-full object-cover scale-[1.04]"
        />

        {/* Refined overlay treatment */}
        <div className="absolute inset-0 bg-[#1E2220]/58" />
       <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,34,32,0.82),rgba(30,34,32,0.55),rgba(30,34,32,0.72))]" />
        {/* subtle frame */}
        <div className="absolute inset-[10px] sm:inset-[24px] md:inset-[28px] border border-[#FAF9F6]/12 pointer-events-none" />

       {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 sm:px-8 md:px-10">
          <div className="max-w-[860px] text-center">
            

            <h2 className="font-playfair text-[#FAF9F6] tracking-[-0.03em] leading-[1.02] text-[24px] sm:text-[34px] md:text-[42px] lg:text-[54px]">
              Planning A Bulk Order For
              <br className="hidden sm:block" />
              Weddings, Events Or Businesses?
            </h2>

            <p className="mt-5 sm:mt-6 mx-auto max-w-[600px] text-[14px] sm:text-[11px] md:text-[16px] leading-[1.9] text-[#FAF9F6]/82">
              Talk directly with us to discuss custom designs and bulk pricing.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <a
                href="tel:+919468480991"
                className="inline-flex font-semibold w-full sm:w-auto min-w-[200px] items-center justify-center border border-[#FAF9F6] bg-[#FAF9F6] px-8 py-3.5 text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-[#1E2220] transition-all duration-300 hover:bg-transparent hover:text-[#FAF9F6]"
              >
                Call
              </a>

              <a
                href={`https://wa.me/919468480991?text=${bulkMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full sm:w-auto font-semibold min-w-[200px] items-center justify-center border border-[#FAF9F6]/90 bg-transparent px-8 py-3.5 text-[12px] sm:text-[13px] uppercase tracking-[0.2em] text-[#FAF9F6] transition-all duration-300 hover:bg-[#FAF9F6] hover:text-[#1E2220]"
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