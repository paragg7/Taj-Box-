import React, { useMemo, useState } from "react";
import { Mail, Phone, MapPin, Check } from "lucide-react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  const WEB3FORMS_KEY = "8c8549b6-28cd-4585-83d4-d41e1ef6b025";

  const services = useMemo(
    () => [
      "Create luxury wedding invitation & gifting boxes",
      "Customize size, material, inserts, and finishes",
      "Match your theme with premium prints and detailing",
      "Get made-to-order packaging delivered worldwide",
    ],
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", msg: "" });

    try {
      setLoading(true);

      const formData = new FormData(e.target);
      formData.append("access_key", WEB3FORMS_KEY);
      formData.append("subject", "New Contact Request — Taj Boxes");
      formData.append("from_name", "Taj Boxes Website");
      formData.append("replyto", formData.get("email") || "");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setStatus({
          type: "success",
          msg: "Message sent ✅ We’ll contact you soon.",
        });
        e.target.reset();
      } else {
        setStatus({
          type: "error",
          msg: data.message || "Failed to send. Try again.",
        });
      }
    } catch (err) {
      setStatus({ type: "error", msg: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <p className="text-xs sm:text-sm font-semibold text-black/50 tracking-[0.22em] uppercase mb-2 sm:mb-3">
            CONTACT
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black mb-3 sm:mb-4 leading-tight">
            Get in touch with us
          </h1>

          <p className="text-black/70 text-base sm:text-lg max-w-2xl mx-auto">
            Fill out the form and we’ll get back shortly.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          {/* Left: Form */}
          <div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Hidden spam protection */}
              <input type="checkbox" name="botcheck" className="hidden" />

              {/* Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.22em] text-black/60 uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    className="w-full h-12 px-4 border border-black/15 bg-white outline-none focus:border-black transition rounded-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-[0.22em] text-black/60 uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="w-full h-12 px-4 border border-black/15 bg-white outline-none focus:border-black transition rounded-sm"
                  />
                </div>

                {/* Phone (full width on sm+) */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-semibold tracking-[0.22em] text-black/60 uppercase mb-2">
                    Mobile number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 94684 80991"
                    inputMode="tel"
                    className="w-full h-12 px-4 border border-black/15 bg-white outline-none focus:border-black transition rounded-sm"
                  />
                </div>
              </div>

              {/* Message + counter */}
              <MessageField />

              {/* Status */}
              {status.msg ? (
                <div
                  className={`border px-4 py-3 text-sm ${
                    status.type === "success"
                      ? "border-black/15 bg-white text-black"
                      : "border-black/20 bg-white text-black"
                  }`}
                >
                  {status.msg}
                </div>
              ) : null}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-black text-white text-sm uppercase tracking-[0.22em] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Request"}
              </button>
            </form>

            {/* Contact shortcuts */}
            <div className="mt-8">
              <p className="text-xs font-semibold tracking-[0.22em] text-black/60 uppercase mb-4">
                Or reach us directly
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="mailto:tajboxes@gmail.com"
                  className="inline-flex items-center gap-3 px-4 py-3 border border-black/10 hover:border-black/25 transition"
                >
                  <Mail className="w-5 h-5 text-black/70" />
                  <span className="text-sm text-black break-all">
                    tajboxes@gmail.com
                  </span>
                </a>

                <a
                  href="tel:+919468480991"
                  className="inline-flex items-center gap-3 px-4 py-3 border border-black/10 hover:border-black/25 transition"
                >
                  <Phone className="w-5 h-5 text-black/70" />
                  <span className="text-sm text-black">+91 9468480991</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="space-y-10 sm:space-y-12">
            <div className="border border-black/10 p-6 sm:p-7">
              <h3 className="text-base sm:text-lg font-semibold text-black mb-5 sm:mb-6">
                With Taj Boxes you can
              </h3>

              <div className="space-y-4">
                {services.map((text, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-black flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-black" strokeWidth={3} />
                    </div>
                    <p className="text-sm sm:text-base text-black/70">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="border border-black/10 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-black" />
                  <h4 className="font-semibold text-black">India</h4>
                </div>
                <p className="text-black/70 text-sm leading-relaxed">
                  Made-to-order packaging
                  <br />
                  Delivering worldwide
                  <br />
                  (Studio location: India)
                </p>
              </div>

              <div className="border border-black/10 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-black" />
                  <h4 className="font-semibold text-black">Worldwide</h4>
                </div>
                <p className="text-black/70 text-sm leading-relaxed">
                  Shipping available internationally
                  <br />
                  Custom orders supported
                  <br />
                  Bulk orders welcomed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Message field with character counter (UX) */
const MessageField = () => {
  const [value, setValue] = useState("");
  const max = 500;

  return (
    <div>
      <div className="flex items-end justify-between mb-2">
        <label className="block text-[11px] font-semibold tracking-[0.22em] text-black/60 uppercase">
          Message
        </label>
        <div className="text-[11px] text-black/50">
          {value.length}/{max}
        </div>
      </div>

      <textarea
        name="message"
        rows={5}
        required
        maxLength={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tell us about your requirement..."
        className="w-full px-4 py-3 border border-black/15 bg-white outline-none focus:border-black transition rounded-sm resize-none"
      />
    </div>
  );
};

export default Contact;
