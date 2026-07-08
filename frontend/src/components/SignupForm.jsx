import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import PasswordStrength from "./PasswordStrength";
import useSignup from "../hooks/useSignup";

const SignupForm = () => {
  const {
    formData,
    loading,
    handleChange,
    handleSignup,
  } = useSignup();

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

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
        Create Account
      </h1>

      <p className="text-gray-400 text-center mt-3 mb-10">
        Join ZeroTrace and start detecting plagiarism.
      </p>

      <form onSubmit={handleSignup}>

        <AuthInput
          label="Full Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          icon={<FaUser />}
        />

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
          placeholder="Create password"
          icon={<FaLock />}
          showPassword={showPassword}
          togglePassword={() =>
            setShowPassword(!showPassword)
          }
        />

        <PasswordStrength
          password={formData.password}
        />

        <AuthInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          icon={<FaLock />}
          showPassword={
            showConfirmPassword
          }
          togglePassword={() =>
            setShowConfirmPassword(
              !showConfirmPassword
            )
          }
        />

        <div className="mt-8">

          <AuthButton
            text="Create Account"
            loading={loading}
          />

        </div>

      </form>

      <p className="text-center text-gray-400 mt-8">

        Already have an account?{" "}

        <Link
          to="/login"
          className="text-cyan-400 hover:text-cyan-300"
        >
          Login
        </Link>

      </p>

    </div>
  );
};

export default SignupForm;