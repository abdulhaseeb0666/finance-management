const Navbar = () => {
  return (
<nav className="w-full bg-linear-to-r from-indigo-950 via-pink-950 to-purple-950 shadow-lg">
  <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

    {/* Logo / Website Name */}
    <div className="text-white ml-10 text-4xl font-bold cursor-pointer hover:scale-105 transition-transform">
      Monetra
    </div>

    {/* Links */}
    <div className="flex gap-6">
      <a
        href="/login"
        className="text-white text-2xl font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition"
      >
        Login
      </a>
      <a
        href="/signup"
        className="bg-white text-2xl text-indigo-600 font-semibold px-4 py-2 rounded-lg hover:bg-white/90 hover:text-indigo-700 transition"
      >
        Sign Up
      </a>
    </div>

  </div>
</nav>
  )
}

export default Navbar
