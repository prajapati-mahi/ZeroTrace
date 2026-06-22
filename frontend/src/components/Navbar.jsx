const Navbar = () => {
  return (
    <div
      className="
      flex
      justify-between
      items-center
      py-6
      "
    >
      <div>
        <h1
          className="
          text-5xl
          font-extrabold
          bg-gradient-to-r
          from-purple-500
          to-cyan-400
          bg-clip-text
          text-transparent
          "
        >
          ZeroTrace AI
        </h1>

        <p className="text-zinc-400 mt-2">
          AI-Powered Plagiarism Detection
        </p>
      </div>
    </div>
  );
};

export default Navbar;