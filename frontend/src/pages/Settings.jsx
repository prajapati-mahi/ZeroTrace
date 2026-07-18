import { Link } from "react-router-dom";

import {
  FaArrowLeft,
  FaUserCog,
  FaLock,
  FaMoon,
  FaTrash,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";

const Settings = () => {
  return (
    <div className="min-h-screen bg-[#09090F] text-white px-8 py-10">

      <div className="max-w-6xl mx-auto">

        <Link
          to="/dashboard"
          className="
            inline-flex
            items-center
            gap-3
            text-cyan-400
            hover:text-cyan-300
            transition
            mb-10
          "
        >
          <FaArrowLeft />

          Dashboard
        </Link>

        <h1 className="text-5xl font-black">
          Settings
        </h1>

        <p className="text-gray-400 mt-4 mb-12 text-lg">
          Manage your account, security and application preferences.
        </p>

        <div className="space-y-6"> 
          <div className="space-y-6">

  {/* Profile */}

  <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-8 hover:border-cyan-400 transition cursor-pointer">

    <div className="flex justify-between items-center">

      <div className="flex items-center gap-5">

        <FaUserCog className="text-cyan-400" size={28} />

        <div>

          <h2 className="text-2xl font-bold">
            Profile
          </h2>

          <p className="text-gray-400 mt-2">
            View and manage your profile information.
          </p>

        </div>

      </div>

      <FaChevronRight className="text-gray-500" />

    </div>

  </div>

  {/* Password */}

  <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-8 hover:border-purple-400 transition cursor-pointer">

    <div className="flex justify-between items-center">

      <div className="flex items-center gap-5">

        <FaLock className="text-purple-400" size={28} />

        <div>

          <h2 className="text-2xl font-bold">
            Change Password
          </h2>

          <p className="text-gray-400 mt-2">
            Update your account password securely.
          </p>

        </div>

      </div>

      <FaChevronRight className="text-gray-500" />

    </div>

  </div>

  {/* Appearance */}

  <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-8 hover:border-yellow-400 transition cursor-pointer">

    <div className="flex justify-between items-center">

      <div className="flex items-center gap-5">

        <FaMoon className="text-yellow-400" size={28} />

        <div>

          <h2 className="text-2xl font-bold">
            Appearance
          </h2>

          <p className="text-gray-400 mt-2">
            Dark mode is currently enabled.
          </p>

        </div>

      </div>

      <FaChevronRight className="text-gray-500" />

    </div>

  </div>

  {/* Logout */}

  <div className="bg-[#151523] border border-[#2D2D44] rounded-3xl p-8 hover:border-cyan-400 transition cursor-pointer">

    <div className="flex justify-between items-center">

      <div className="flex items-center gap-5">

        <FaSignOutAlt className="text-cyan-400" size={28} />

        <div>

          <h2 className="text-2xl font-bold">
            Logout
          </h2>

          <p className="text-gray-400 mt-2">
            Sign out from your ZeroTrace account.
          </p>

        </div>

      </div>

      <FaChevronRight className="text-gray-500" />

    </div>

  </div>

  {/* Danger Zone */}

  <div className="bg-[#151523] border border-red-500 rounded-3xl p-8 hover:bg-red-500/5 transition cursor-pointer">

    <div className="flex justify-between items-center">

      <div className="flex items-center gap-5">

        <FaTrash className="text-red-500" size={28} />

        <div>

          <h2 className="text-2xl font-bold text-red-400">
            Delete Account
          </h2>

          <p className="text-gray-400 mt-2">
            Permanently remove your account. This action cannot be undone.
          </p>

        </div>

      </div>

      <FaChevronRight className="text-red-500" />

    </div>

  </div>

</div>
       </div>

        {/* Footer */}

        <div
          className="
            mt-16
            border-t
            border-[#2D2D44]
            pt-8
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-4
          "
        >

          <div>

            <h3 className="text-xl font-bold">
              ZeroTrace
            </h3>

            <p className="text-gray-400 mt-2">
              AI Powered Plagiarism Detection Platform
            </p>

          </div>

          <div className="text-right">

            <p className="text-gray-500">
              Version 1.0.0
            </p>

            <p className="text-gray-500 mt-1">
              © 2026 ZeroTrace. All rights reserved.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Settings;