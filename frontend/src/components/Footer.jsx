import {
  FaGithub,
  FaLinkedin,
  FaArrowUp,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="footer"
      className="bg-[#06060A] border-t border-[#222236]"
    >
      <div className="max-w-7xl mx-auto px-8 py-20">

        {/* Top Section */}

        <div className="grid md:grid-cols-4 gap-14">

          {/* Brand */}

          <div>

            <h2
              className="
              text-4xl
              font-black
              bg-gradient-to-r
              from-cyan-400
              to-purple-500
              bg-clip-text
              text-transparent
              "
            >
              ZeroTrace
            </h2>

            <p className="text-gray-400 mt-6 leading-8">
              AI-powered plagiarism detection platform
              built for students, educators and professionals.
            </p>

          </div>

          {/* Product */}

          <div>

            <h3 className="text-white font-bold text-xl mb-6">
              Product
            </h3>

            <ul className="space-y-4">

              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-cyan-400 transition"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#how"
                  className="text-gray-400 hover:text-cyan-400 transition"
                >
                  Workflow
                </a>
              </li>

              <li>
                <a
                  href="#faq"
                  className="text-gray-400 hover:text-cyan-400 transition"
                >
                  FAQs
                </a>
              </li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-white font-bold text-xl mb-6">
              Resources
            </h3>

            <ul className="space-y-4">

              <li>
                <Link
                  to="/documentation"
                  className="text-gray-400 hover:text-cyan-400 transition"
                >
                  Documentation
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-cyan-400 transition"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-cyan-400 transition"
                >
                  Terms of Service
                </Link>
              </li>

            </ul>

          </div>

          {/* Connect */}

          <div>

            <h3 className="text-white font-bold text-xl mb-6">
              Connect
            </h3>

            <div className="flex gap-5 text-3xl">

              <a
                href="https://github.com/prajapati-mahi"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                <FaGithub />
              </a>

              <a
                href="https://linkedin.com/in/mahi-prajapati-35b05132b"
                target="_blank"
                rel="noreferrer"
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                <FaLinkedin />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div
          className="
          border-t
          border-[#222236]
          mt-16
          pt-8
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-6
          "
        >

          <p className="text-gray-500">
            © 2026 ZeroTrace. All rights reserved.
          </p>

          <button
            onClick={scrollTop}
            className="
            w-12
            h-12
            rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-purple-600
            flex
            items-center
            justify-center
            hover:scale-110
            transition
            "
          >
            <FaArrowUp className="text-white" />
          </button>

        </div>

      </div>
    </footer>
  );
};

export default Footer;