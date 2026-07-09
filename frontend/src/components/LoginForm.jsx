import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import useLogin from "../hooks/useLogin";

const LoginForm = () => {
  const {
    formData,
    loading,
    handleChange,
    handleLogin,
  } = useLogin();

  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div
      className="
      w-full
      max-w-md
      bg-[#151523]/90
      backdrop-blur-xl
      border
      border-[#2D2D44]
      rounded-3xl
      p-10
      shadow-[0_20px_80px_rgba(0,0,0,0.5)]
      "
    >
      <h1 className="text-4xl font-black text-white text-center">
        Welcome Back
      </h1>

      <p className="text-gray-400 text-center mt-3 mb-10">
        Login to continue using ZeroTrace.
      </p>

      <form onSubmit={handleLogin}>

        <AuthInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          icon={<FaEnvelope />}
        />

        <AuthInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          icon={<FaLock />}
          showPassword={showPassword}
          togglePassword={() =>
            setShowPassword(!showPassword)
          }
        />

        <div className="flex justify-end mb-6">

          <button
            type="button"
            className="
              text-cyan-400
              hover:text-cyan-300
              text-sm
            "
          >
            Forgot Password?
          </button>

        </div>

        <AuthButton
          text="Login"
          loading={loading}
        />

      </form>

      <p className="text-center text-gray-400 mt-8">

        Don't have an account?{" "}

        <Link
          to="/signup"
          className="text-cyan-400 hover:text-cyan-300"
        >
          Create One
        </Link>

      </p>

    </div>
  );
};

export default LoginForm;