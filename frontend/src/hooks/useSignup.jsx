import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

const useSignup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const validate = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error(
        "Please fill all fields."
      );
      return false;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error(
        "Passwords do not match."
      );
      return false;
    }

    if (
      formData.password.length < 8
    ) {
      toast.error(
        "Password should contain at least 8 characters."
      );
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res= await api.post(
  "/auth/register",
  formData
);

      toast.success(
        "Account created successfully!"
      );

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Signup Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return {
    formData,
    loading,
    handleSignup,
    handleChange,
  };
};

export default useSignup;