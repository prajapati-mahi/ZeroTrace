import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";
import {useAuth,} from "../context/AuthContext";

const useLogin = () => {
    const { login } = useAuth();
  const navigate = useNavigate();


  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password
    ) {
      toast.error(
        "Please fill all fields."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
  "/auth/login",
  formData
);

      login(
  res.data.token,
  res.data.user
);

      toast.success(
        "Login Successful!"
      );

      navigate("/dashboard", {
  replace: true,
});

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
          "Login Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return {
    formData,
    loading,
    handleLogin,
    handleChange,
  };
};

export default useLogin;