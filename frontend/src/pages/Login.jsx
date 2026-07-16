import LoginForm from "../components/LoginForm";
import {
  FaRobot,
  FaBolt,
  FaShieldAlt,
  FaFileAlt,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot />,
    title: "AI Detection",
  },
  {
    icon: <FaFileAlt />,
    title: "PDF Analysis",
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Reports",
  },
  {
    icon: <FaBolt />,
    title: "Lightning Fast",
  },
];

const Login = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#09090F]">

      <div className="absolute -top-52 -left-52 w-[450px] h-[450px] bg-purple-600/20 blur-[150px] rounded-full" />

      <div className="absolute -bottom-52 -right-52 w-[450px] h-[450px] bg-cyan-500/20 blur-[150px] rounded-full" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">

        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}

          <div className="hidden lg:block">

            <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#151523] border border-cyan-500/20 text-cyan-300 font-semibold">

              <FaRobot />

              AI Powered Platform

            </span>

            


            <h1 className="text-6xl font-black text-white leading-tight mt-8">

              Welcome Back

              <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">

                Continue Detecting

              </span>

              With Confidence.

            </h1>

            <p className="text-gray-400 text-xl leading-9 mt-8 max-w-xl">

              Login to continue using AI-powered plagiarism
              detection, PDF comparison and professional reports.

            </p>

            <div className="grid grid-cols-2 gap-5 mt-12">

              {features.map((feature) => (

                <div
                  key={feature.title}
                  className="
                    bg-[#151523]
                    border
                    border-[#2D2D44]
                    rounded-2xl
                    p-6
                    flex
                    items-center
                    gap-4
                    hover:border-cyan-400
                    transition
                  "
                >

                  <div className="text-cyan-400 text-2xl">

                    {feature.icon}

                  </div>

                  <span className="text-white font-semibold">

                    {feature.title}

                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}

          <div className="flex justify-center">

            <LoginForm />

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;