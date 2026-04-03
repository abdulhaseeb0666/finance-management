const Footer = () => {
  return (
    <footer className="bg-[#0B0F19] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Left: Creator Info */}
            <p className="text-gray-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} <b> Abdul Haseeb </b>. Created as a portfolio project.
            </p>

            {/* Right: Links */}
            <div className="flex gap-4">
            <a
                href="/login"
                className="text-indigo-400 hover:text-indigo-500 text-sm font-medium transition"
            >
                Login
            </a>
            <a
                href="/signup"
                className="text-indigo-400 hover:text-indigo-500 text-sm font-medium transition"
            >
                Sign Up
            </a>
            </div>

        </div>
    </footer>
  )
}

export default Footer
