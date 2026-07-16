import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Documentation = () => {
  return (
    <div className="bg-[#09090F] text-white min-h-screen">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 pt-40 pb-24">

        <h1 className="text-5xl font-black mb-8">
          Documentation
        </h1>

        <p className="text-gray-400 leading-8 text-lg">
          Welcome to the ZeroTrace documentation.
        </p>

        <div className="mt-10 space-y-8">

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Supported File Types
            </h2>

            <p className="text-gray-400">
              PDF, DOCX and TXT documents are currently supported.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Detection Method
            </h2>

            <p className="text-gray-400">
              ZeroTrace combines semantic similarity analysis with
              plagiarism detection techniques to identify copied,
              paraphrased and AI-generated content.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">
              Reports
            </h2>

            <p className="text-gray-400">
              Every scan generates a downloadable plagiarism report
              with similarity percentage and highlighted matches.
            </p>
          </div>

        </div>

      </section>

      <Footer />

    </div>
  );
};

export default Documentation;