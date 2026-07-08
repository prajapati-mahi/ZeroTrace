const PasswordStrength = ({ password }) => {
  const checks = [
    {
      label: "At least 8 characters",
      valid: password.length >= 8,
    },
    {
      label: "One uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "One lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "One number",
      valid: /\d/.test(password),
    },
    {
      label: "One special character",
      valid:
        /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const passed = checks.filter(
    (c) => c.valid
  ).length;

  const percentage =
    (passed / checks.length) * 100;

  const barColor =
    percentage <= 40
      ? "bg-red-500"
      : percentage <= 80
      ? "bg-yellow-400"
      : "bg-green-500";

  const label =
    percentage <= 40
      ? "Weak"
      : percentage <= 80
      ? "Medium"
      : "Strong";

  return (
    <div className="mt-5">

      <div className="flex justify-between mb-2">

        <span className="text-sm text-gray-400">
          Password Strength
        </span>

        <span
          className={`font-semibold text-sm ${
            percentage <= 40
              ? "text-red-400"
              : percentage <= 80
              ? "text-yellow-400"
              : "text-green-400"
          }`}
        >
          {label}
        </span>

      </div>

      <div className="h-2 rounded-full bg-[#2D2D44] overflow-hidden">

        <div
          className={`${barColor} h-full transition-all duration-500`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      <div className="mt-4 space-y-2">

        {checks.map((item) => (

          <div
            key={item.label}
            className="flex items-center gap-3"
          >

            <div
              className={`w-2.5 h-2.5 rounded-full ${
                item.valid
                  ? "bg-green-400"
                  : "bg-gray-500"
              }`}
            />

            <p
              className={`text-sm ${
                item.valid
                  ? "text-green-300"
                  : "text-gray-400"
              }`}
            >
              {item.label}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
};

export default PasswordStrength;