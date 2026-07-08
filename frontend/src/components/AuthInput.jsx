import { FaEye, FaEyeSlash } from "react-icons/fa";

const AuthInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  icon,
  error,
  showPassword,
  togglePassword,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-300 mb-2">
        {label}
      </label>

      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400">
          {icon}
        </div>

        <input
          type={
            type === "password"
              ? showPassword
                ? "text"
                : "password"
              : type
          }
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full
            pl-12
            ${type === "password" ? "pr-12" : "pr-4"}
            py-3
            rounded-xl
            bg-[#141425]
            border
            ${
              error
                ? "border-red-500"
                : "border-[#2D2D44]"
            }
            text-white
            placeholder:text-gray-500
            outline-none
            transition
            focus:border-cyan-400
            focus:ring-2
            focus:ring-cyan-500/20
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={togglePassword}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-cyan-400
            "
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="text-red-400 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthInput;