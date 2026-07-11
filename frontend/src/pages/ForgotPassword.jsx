import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email) {

      toast.error("Please enter your email.");

      return;

    }

    try {

      setLoading(true);

      const res = await api.post(
        "/auth/forgot-password",
        {
          email,
        }
      );

      toast.success(
        res.data.message
      );

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-[#09090F] flex justify-center items-center px-5">

      <div className="bg-[#151523] w-full max-w-md rounded-3xl p-10 border border-[#2D2D44]">

        <h1 className="text-white text-4xl font-black">

          Forgot Password

        </h1>

        <p className="text-gray-400 mt-3">

          Enter your registered email.

        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>
              setEmail(
                e.target.value
              )
            }
            className="
            w-full
            bg-[#0F0F18]
            border
            border-[#2D2D44]
            rounded-xl
            px-5
            py-4
            text-white
            outline-none
            focus:border-cyan-400
            "
          />

          <button
            className="
            w-full
            bg-cyan-500
            hover:bg-cyan-600
            py-4
            rounded-xl
            font-bold
            transition
            "
          >

            {
              loading
              ? "Sending..."
              : "Send Reset Link"
            }

          </button>

        </form>

        <Link
          to="/login"
          className="
          block
          text-center
          mt-8
          text-cyan-400
          "
        >

          Back to Login

        </Link>

      </div>

    </div>

  );

};

export default ForgotPassword;