import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const slugify = (str) =>
  String(str)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const Term = () => {
  const sections = useMemo(
    () => [
      {
        title: "License",
        content:
          "Unless otherwise stated, we and/or our licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may access this from the website for your own personal use subjected to restrictions set in these terms and conditions.",
      },
      {
        title: "You must not",
        points: [
          "Republish material from this website",
          "Sell, rent or sub-license material from the website",
          "Reproduce, duplicate or copy material from this website",
          "Redistribute content from this website",
        ],
      },
      {
        title: "Hyperlinking to our Content",
        content:
          "The following organizations may link to our Website without prior written approval: Government agencies, Search engines, News organizations, Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses.",
      },
      {
        title: "iFrames",
        content:
          "Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.",
      },
      {
        title: "Content Liability",
        content:
          "We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.",
      },
      {
        title: "Reservation of Rights",
        content:
          "We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time.",
      },
      {
        title: "Removal of links from our website",
        content:
          "If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to do so or to respond to you directly.",
      },
      {
        title: "Disclaimer",
        content:
          "To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury, limit or exclude our or your liability for fraud or fraudulent misrepresentation, limit any of our or your liabilities in any way that is not permitted under applicable law, or exclude any of our or your liabilities that may not be excluded under applicable law.",
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

  // Mobile accordion: open first section by default
  const [openId, setOpenId] = useState(nav[0]?.id || "");

  return (
    <main className="min-h-screen bg-white py-12 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase text-black/50">
            UNDERSTANDING OUR
          </p>

          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-semibold text-black leading-[1.05]">
            Terms &amp; Conditions
          </h1>

          <p className="mt-5 text-sm sm:text-base text-black/70 max-w-3xl mx-auto leading-relaxed">
            By using this website, you are deemed to have read and agreed to the
            following terms and conditions.
          </p>
        </header>

        {/* Layout: sticky nav + content */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-14">
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
            {/* Intro block (readability container) */}
            <div className="border border-black/10 p-6 sm:p-7">
              <h2 className="text-lg sm:text-xl font-semibold text-black mb-4">
                Introduction
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-black/70 max-w-3xl">
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and any or all
                Agreements: “Customer”, “You” and “Your” refers to you, the
                person accessing this website and accepting the Company’s terms.
                “The Company”, “Ourselves”, “We” and “Us” refers to our Company.
                “Party”, “Parties”, or “Us”, refers to both the customer and
                ourselves. Any use of the above terminology or other words in
                the singular, plural, capitalization and/or he/she or they are
                taken as interchangeable and therefore as referring to the same.
              </p>
            </div>

            {/* Sections */}
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
                        <p className="text-sm sm:text-base leading-relaxed text-black/70 max-w-3xl">
                          {section.content}
                        </p>
                      )}

                      {section.points && (
                        <ul className="mt-4 space-y-2 text-sm sm:text-base text-black/70 max-w-3xl">
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

            {/* Last Updated */}
            <div className="mt-8 border-t border-black/10 pt-6 text-sm text-black/60">
              Last updated: February 10, 2026
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Term;
