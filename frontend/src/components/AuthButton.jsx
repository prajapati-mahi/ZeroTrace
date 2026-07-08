import { FaSpinner } from "react-icons/fa";

const AuthButton = ({
  text,
  loading,
  type = "submit",
}) => {
  return (
    <button
      type={type}
      disabled={loading}
      className="
        w-full
        py-3
        rounded-xl
        font-semibold
        text-white
        bg-gradient-to-r
        from-[#6C63FF]
        to-[#00D4FF]
        hover:scale-[1.02]
        active:scale-95
        transition
        disabled:opacity-60
        flex
        justify-center
        items-center
        gap-3
      "
    >
      {loading ? (
        <>
          <FaSpinner className="animate-spin" />
          Creating Account...
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default AuthButton;