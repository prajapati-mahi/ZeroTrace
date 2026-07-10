import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserCog,
  FaLock,
  FaMoon,
  FaTrash,
} from "react-icons/fa";

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#09090F] text-white p-10">

      <div className="max-w-5xl mx-auto">

        <Link
          to="/dashboard"
          className="text-cyan-400 flex items-center gap-2 mb-10"
        >
          <FaArrowLeft />
          Dashboard
        </Link>

        <h1 className="text-5xl font-black mb-12">

          Settings

        </h1>

        <div className="space-y-8">

          <div className="bg-[#151523] rounded-3xl p-8 border border-[#2D2D44]">

            <div className="flex items-center gap-4">

              <FaUserCog
                size={28}
                className="text-cyan-400"
              />

              <div>

                <h2 className="text-2xl font-bold">

                  Profile

                </h2>

                <p className="text-gray-400">

                  Manage account information

                </p>

              </div>

            </div>

          </div>

          <div className="bg-[#151523] rounded-3xl p-8 border border-[#2D2D44]">

            <div className="flex items-center gap-4">

              <FaLock
                size={28}
                className="text-purple-400"
              />

              <div>

                <h2 className="text-2xl font-bold">

                  Change Password

                </h2>

                <p className="text-gray-400">

                  Update your password

                </p>

              </div>

            </div>

          </div>

          <div className="bg-[#151523] rounded-3xl p-8 border border-[#2D2D44]">

            <div className="flex items-center gap-4">

              <FaMoon
                size={28}
                className="text-yellow-400"
              />

              <div>

                <h2 className="text-2xl font-bold">

                  Appearance

                </h2>

                <p className="text-gray-400">

                  Dark mode enabled

                </p>

              </div>

            </div>

          </div>

          <div className="bg-[#151523] rounded-3xl p-8 border border-red-500">

            <div className="flex items-center gap-4">

              <FaTrash
                size={28}
                className="text-red-500"
              />

              <div>

                <h2 className="text-2xl font-bold">

                  Delete Account

                </h2>

                <p className="text-gray-400">

                  Coming Soon

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Settings;