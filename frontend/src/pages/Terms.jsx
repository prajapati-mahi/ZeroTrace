import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Terms = () => {
  return (
    <div className="bg-[#09090F] text-white min-h-screen">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 pt-40 pb-24">

        <h1 className="text-5xl font-black mb-8">
          Terms of Service
        </h1>

        <div className="space-y-8 text-gray-400 leading-8">

          <p>
            By using ZeroTrace, you agree to use the platform
            responsibly.
          </p>

          <p>
            Users must upload only documents they own or are authorized
            to analyze.
          </p>

          <p>
            ZeroTrace provides plagiarism detection results for
            informational purposes.
          </p>

          <p>
            The platform reserves the right to improve and update
            services without prior notice.
          </p>

        </div>

      </section>

      <Footer />

    </div>
  );
};

export default Terms;