import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Mail, Phone } from "lucide-react";

const slugify = (str) =>
  String(str)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const Shipping = () => {
  const sections = useMemo(
    () => [
      {
        title: "Processing Time",
        content:
          "All orders are processed within 1–3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you via email or telephone.",
      },
      {
        title: "Shipping Rates & Delivery Estimates",
        content:
          "Shipping charges for your order will be calculated and displayed at checkout. We offer the following shipping options:",
        points: [
          "Standard Shipping (3–5 business days): ₹99",
          "Express Shipping (1–2 business days): ₹199",
          "Next Day Delivery (1 business day): ₹299",
          "Free Shipping on orders above ₹999",
        ],
      },
      {
        title: "Shipment Confirmation & Order Tracking",
        content:
          "You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours. You can track your order status by visiting our Track Order page or using the tracking link provided in the shipment confirmation email.",
      },
      {
        title: "Customs, Duties and Taxes",
        content:
          "We are not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.). Customs policies vary widely by country; please contact your local customs office for further information.",
      },
      {
        title: "Damages",
        content:
          "We are not liable for any products damaged or lost during shipping. If you received your order damaged, please contact the shipment carrier to file a claim. Please save all packaging materials and damaged goods before filing a claim. If you have any questions or concerns about your shipment, please contact our customer service team.",
      },
      {
        title: "International Shipping",
        content:
          "We currently ship to: India, United States, United Kingdom, Canada, Australia, and European Union countries. International shipping times vary by location and typically range from 7–21 business days. International orders may be subject to import duties and taxes, which are the responsibility of the recipient.",
      },
      {
        title: "Delivery Issues",
        content:
          "If your order has not arrived within the expected delivery time, please check your tracking information first. If tracking shows delivered but you haven't received your package, please check with neighbors or your building management. Contact us within 48 hours if the package cannot be located. We will work with the carrier to resolve the issue or arrange a replacement shipment.",
      },
      {
        title: "Address Changes",
        content:
          "If you need to change your shipping address after placing an order, please contact us immediately. We cannot guarantee address changes once the order has been processed and shipped. If the package is returned to us due to an incorrect address provided by the customer, we will issue a refund minus the original shipping cost and a 10% restocking fee.",
      },
      {
        title: "PO Box Addresses",
        content:
          "We can ship to PO Box addresses using Standard Shipping only. Express and Next Day Delivery options are not available for PO Box addresses. Please allow additional time for delivery to PO Box addresses as they may take 1–2 business days longer than standard delivery times.",
      },
      {
        title: "Order Cancellations",
        content:
          "You may cancel your order within 2 hours of placing it by contacting our customer service team. Once an order has been processed and shipped, it cannot be cancelled. In this case, you will need to wait to receive the order and follow our return policy to return the items.",
      },
      {
        title: "Returns & Exchanges",
        content:
          "For information about returns and exchanges, please refer to our Return Policy page. All return shipping costs are the responsibility of the customer unless the item received was defective or incorrect. We recommend using a trackable shipping service or purchasing shipping insurance for returns as we cannot guarantee that we will receive your returned item.",
      },
    ],
    []
  );

  const nav = useMemo(
    () =>
      sections.map((s) => ({
        ...s,
        id: slugify(s.title),
      })),
    [sections]
  );

  // Mobile accordion state: open first section by default
  const [openId, setOpenId] = useState(nav[0]?.id || "");

  return (
    <main className="min-h-screen py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-black/50 mb-3">
            OUR COMMITMENT TO
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-black leading-[1.05]">
            Shipping Policy
          </h1>

          <p className="mt-5 text-sm sm:text-base text-black/70 max-w-3xl mx-auto leading-relaxed">
            This Shipping Policy outlines delivery timelines, shipping options,
            and responsibilities related to orders placed on our website.
          </p>
        </header>

        {/* Quick facts row (premium UX) */}
        <div className="border border-black/10">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <div className="p-5 sm:p-6 border-b sm:border-b-0 sm:border-r border-black/10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/50">
                Processing
              </div>
              <div className="mt-2 text-sm sm:text-base text-black">
                1–3 business days
              </div>
            </div>
            <div className="p-5 sm:p-6 border-b sm:border-b-0 sm:border-r border-black/10">
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/50">
                Delivery (India)
              </div>
              <div className="mt-2 text-sm sm:text-base text-black">
                1–5 business days
              </div>
            </div>
            <div className="p-5 sm:p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/50">
                Free Shipping
              </div>
              <div className="mt-2 text-sm sm:text-base text-black">
                Orders above ₹999
              </div>
            </div>
          </div>
        </div>

        {/* Layout: sidebar nav + content */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
          {/* Desktop sticky nav */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 border border-black/10 p-5">
              <div className="text-[11px] uppercase tracking-[0.22em] text-black/50 mb-4">
                On this page
              </div>

              <nav className="space-y-2">
                {nav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-black/70 hover:text-black transition"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <section className="min-w-0">
            {/* Intro */}
            <div className="border border-black/10 p-6 sm:p-7">
              <h2 className="text-lg sm:text-xl font-semibold text-black mb-4">
                Please review our shipping details below
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-black/70 max-w-3xl">
                We aim to make your experience seamless from order placement to
                delivery. Our shipping partners are selected for reliability and
                care. Review the policy below for timelines, tracking, and
                support.
              </p>
            </div>

            {/* Mobile: accordions | Desktop: sections */}
            <div className="mt-10 space-y-6">
              {nav.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  {/* Mobile accordion header */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenId((prev) => (prev === section.id ? "" : section.id))
                    }
                    className="lg:hidden w-full flex items-center justify-between border border-black/10 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-black">
                      {section.title}
                    </span>
                    {openId === section.id ? (
                      <ChevronUp className="w-4 h-4 text-black/60" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-black/60" />
                    )}
                  </button>

                  {/* Content wrapper */}
                  <div
                    className={`border border-black/10 lg:border-0 ${
                      openId === section.id ? "block" : "hidden"
                    } lg:block`}
                  >
                    <div className="px-5 py-5 lg:px-0 lg:py-0">
                      {/* Desktop heading */}
                      <h3 className="hidden lg:block text-lg sm:text-xl font-semibold text-black mb-3">
                        {section.title}
                      </h3>

                      {section.content && (
                        <p className="text-sm sm:text-base leading-relaxed text-black/70">
                          {section.content}
                        </p>
                      )}

                      {section.points && (
                        <ul className="mt-4 space-y-2 text-sm sm:text-base text-black/70">
                          {section.points.map((point, idx) => (
                            <li key={idx} className="flex gap-3">
                              <span className="mt-[9px] h-[3px] w-[3px] bg-black/60 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Desktop divider */}
                  <div className="hidden lg:block h-px bg-black/10 my-8" />
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-10 border border-black/10 p-6 sm:p-7">
              <h3 className="text-lg sm:text-xl font-semibold text-black mb-3">
                Questions about shipping?
              </h3>

              <p className="text-sm sm:text-base text-black/70 mb-5 max-w-3xl leading-relaxed">
                If you need help with shipping, delivery, or tracking, contact
                us and we’ll assist you.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="mailto:support@example.com"
                  className="inline-flex items-center gap-3 px-4 py-3 border border-black/10 hover:border-black/25 transition"
                >
                  <Mail className="w-5 h-5 text-black/70" />
                  <span className="text-sm text-black break-all">
                    support@example.com
                  </span>
                </a>

                <a
                  href="tel:+911234567890"
                  className="inline-flex items-center gap-3 px-4 py-3 border border-black/10 hover:border-black/25 transition"
                >
                  <Phone className="w-5 h-5 text-black/70" />
                  <span className="text-sm text-black">+91 1234567890</span>
                </a>
              </div>

              <div className="mt-4 text-sm text-black/60 leading-relaxed">
                Hours: Monday–Friday, 9:00 AM – 6:00 PM IST
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-6 text-sm text-black/60 border-t border-black/10 pt-6">
              Last updated: February 10, 2026
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Shipping;
