import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="bg-[#09090F] text-white min-h-screen">

      <Navbar />

      <section className="max-w-6xl mx-auto px-6 pt-40 pb-24">

        <h1 className="text-5xl font-black mb-8">
          Privacy Policy
        </h1>

        <div className="space-y-8 text-gray-400 leading-8">

          <p>
            ZeroTrace values your privacy and protects every uploaded
            document.
          </p>

          <p>
            Uploaded files are used only for plagiarism analysis.
          </p>

          <p>
            Your files are never shared with third parties.
          </p>

          <p>
            Reports remain accessible only to your account.
          </p>

        </div>

      </section>

      <Footer />

    </div>
  );
};

export default Privacy;