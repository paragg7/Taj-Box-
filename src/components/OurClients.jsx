import React from "react";

const clients = [
  { name: "Royal Weddings" },
  { name: "Luxe Gifting Co." },
  { name: "The Invitation House" },
  { name: "Festive Finds" },
  { name: "Heritage Events" },
  { name: "Elite Hampers" },
  { name: "Golden Leaf Studio" },
  { name: "Velvet Celebrations" },
];

const OurClients = () => {
  return (
    <section className="w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full border border-[#EAE8E2] bg-[#FAF9F6]">
        
        {/* Top content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 lg:gap-20 bg-[#EAE8E2] px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-10 md:py-14 lg:py-16">
          
          {/* Left heading */}
          <div className="flex items-start">
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] lg:text-[44px] leading-[0.95] font-playfair text-[#1E2220] tracking-[-0.02em]">
              Our Clients
            </h2>
          </div>

          {/* Right text */}
          <div className="max-w-full md:max-w-[520px] md:ml-auto space-y-4 sm:space-y-5 md:space-y-6">
            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.8] md:leading-[1.9] text-[#1E2220]">
              We are proud to work with brands, event planners, and creative
              studios that value thoughtful presentation and refined detail.
            </p>

            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.8] md:leading-[1.9] text-[#1E2220]">
              From weddings and festive gifting to premium packaging projects,
              our clients trust Taj Box to bring elegance and craftsmanship into
              every experience.
            </p>

            <p className="text-[13px] sm:text-[14px] md:text-[15px] leading-[1.8] md:leading-[1.9] text-[#1E2220]">
              Each collaboration reflects our shared belief that beautiful
              packaging creates a stronger, more memorable connection.
            </p>
          </div>
        </div>

        {/* Bottom clients grid */}
        <div className="border-t border-[#EAE8E2]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center border-r border-b border-[#EAE8E2] last:border-r-0 px-6 sm:px-8 py-10 sm:py-12 md:py-14"
              >
                <span className="text-[15px] sm:text-[16px] md:text-[18px] font-medium tracking-[-0.02em] text-[#1E2220] text-center">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurClients;