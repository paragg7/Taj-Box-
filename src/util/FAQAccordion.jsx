import { useState } from "react";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Description",
      answer:
        "Here is the detailed description of the product. It can be several lines long and will smoothly expand when clicked.",
    },
    {
      question: "How can I reset my password?",
      answer:
        'To reset your password, go to the login page and click on "Forgot Password?" Follow the instructions to receive a password reset link in your email.',
    },
    {
      question: "How do I update my billing information?",
      answer:
        'To update your billing information, go to your account settings, choose "Billing," and update your payment method or billing address. Be sure to save your changes.',
    },
  ];

  const toggle = (index) => setActiveIndex(activeIndex === index ? null : index);

  return (
    <div className="flex flex-col divide-y divide-gray-200">
      {faqs.map((faq, index) => {
        const isActive = index === activeIndex;

        return (
          <div key={index} className="py-3">
            {/* Question row */}
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center text-left text-gray-900 text-sm sm:text-base font-medium focus:outline-none"
              aria-expanded={isActive}
              aria-controls={`faq-${index}`}
            >
              <span>{faq.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  isActive ? "rotate-180" : "rotate-0"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Answer */}
            <div
              id={`faq-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                isActive ? "max-h-96 mt-2 opacity-100" : "max-h-0 mt-0 opacity-0"
              }`}
            >
              <p className="text-gray-700 text-sm sm:text-base">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
