// import { useState } from "react";
// import { FaChevronDown } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";

// const faqs = [
//   {
//     question: "Which file formats are supported?",
//     answer:
//       "ZeroTrace currently supports PDF, DOCX and TXT documents for plagiarism detection.",
//   },
//   {
//     question: "Does ZeroTrace detect paraphrased content?",
//     answer:
//       "Yes. Our semantic analysis compares meaning instead of relying only on exact keyword matching, helping identify paraphrased text.",
//   },
//   {
//     question: "Are my uploaded documents secure?",
//     answer:
//       "Uploaded files are processed securely. Documents are used only for analysis and are not shared with third parties.",
//   },
//   {
//     question: "Can I download a plagiarism report?",
//     answer:
//       "Yes. After the analysis, ZeroTrace generates a detailed plagiarism report with similarity score and detected matches.",
//   },
//   {
//     question: "Is login required to use ZeroTrace?",
//     answer:
//       "Creating an account allows you to save reports, view your history, and access your personalized dashboard.",
//   },
// ];

// const FAQ = () => {
//   const [active, setActive] = useState(null);

//   return (
//     <section id="faq" className="bg-[#09090F] py-28">
//       <div className="max-w-5xl mx-auto px-6">

//         <div className="text-center mb-16">

//           <p className="uppercase tracking-[5px] text-cyan-400 font-semibold">
//             FAQ
//           </p>

//           <h2 className="text-5xl font-black text-white mt-4">
//             Frequently Asked Questions
//           </h2>

//           <p className="text-gray-400 mt-6 text-lg">
//             Everything you need to know about ZeroTrace.
//           </p>

//         </div>

//         <div className="space-y-5">

//           {faqs.map((item, index) => (

//             <div
//               key={index}
//               className="
//                 bg-[#151523]
//                 border
//                 border-[#2D2D44]
//                 rounded-2xl
//                 overflow-hidden
//                 transition
//                 hover:border-cyan-400
//               "
//             >

//               <button
//                 onClick={() =>
//                   setActive(active === index ? null : index)
//                 }
//                 className="
//                   w-full
//                   flex
//                   justify-between
//                   items-center
//                   px-8
//                   py-6
//                   text-left
//                 "
//               >

//                 <h3 className="text-xl font-semibold text-white">
//                   {item.question}
//                 </h3>

//                 <FaChevronDown
//                   className={`text-cyan-400 transition-transform duration-300 ${
//                     active === index ? "rotate-180" : ""
//                   }`}
//                 />

//               </button>

//               <AnimatePresence>

//                 {active === index && (

//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                   >

//                     <p className="px-8 pb-7 text-gray-400 leading-8">
//                       {item.answer}
//                     </p>

//                   </motion.div>

//                 )}

//               </AnimatePresence>

//             </div>

//           ))}

//         </div>

//       </div>
//     </section>
//   );
// };

// export default FAQ;

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    question: "Which file formats are supported?",
    answer:
      "ZeroTrace currently supports PDF, DOCX and TXT documents.",
  },
  {
    question: "Does ZeroTrace detect paraphrased content?",
    answer:
      "Yes. ZeroTrace uses semantic analysis to detect paraphrased text.",
  },
  {
    question: "Are uploaded documents secure?",
    answer:
      "Yes. Documents are processed securely and are not shared.",
  },
  {
    question: "Can I download reports?",
    answer:
      "Yes. Detailed PDF reports are generated after every scan.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState(null);

  return (
    <section className="bg-[#09090F] py-28">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[5px] text-cyan-400">
            FAQ
          </p>

          <h2 className="text-5xl font-black text-white mt-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (

            <div
              key={index}
              className="bg-[#151523] rounded-2xl border border-[#2d2d44]"
            >

              <button
                onClick={() =>
                  setActive(active === index ? null : index)
                }
                className="w-full flex justify-between px-8 py-6"
              >

                <span className="text-white font-semibold">
                  {faq.question}
                </span>

                <FaChevronDown
                  className={`transition ${
                    active === index
                      ? "rotate-180"
                      : ""
                  }`}
                />

              </button>

              {active === index && (

                <p className="px-8 pb-6 text-gray-400">
                  {faq.answer}
                </p>

              )}

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default FAQ;