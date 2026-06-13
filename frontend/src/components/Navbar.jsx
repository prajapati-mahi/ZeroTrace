function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6">
      <h1 className="text-2xl font-bold">
        ZeroTrace
      </h1>

      <div className="flex gap-6">
        <button>Login</button>
        <button>Signup</button>
      </div>
    </nav>
  );
}

export default Navbar;