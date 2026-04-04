import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-gray-800 text-white px-6 py-16">
      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-linear-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-gray-400 mt-4 text-lg">
          Have questions, feedback, or business inquiries? We’d love to hear from you.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>

          <div className="flex items-center gap-4 text-gray-300">
            <Mail className="text-indigo-400" />
            <span>support@monetra.com</span>
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <Phone className="text-pink-400" />
            <span>+92 300 1234567</span>
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <MapPin className="text-purple-400" />
            <span>California , USA</span>
          </div>

          {/* Extra UI */}
          <div className="mt-8 p-5 rounded-xl bg-linear-to-r from-indigo-500/10 via-pink-500/10 to-purple-500/10 border border-white/10">
            <p className="text-sm text-gray-400">
              We typically respond within 24 hours. For urgent queries, feel free to call us directly.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-lg space-y-6">
          <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Message</label>
            <textarea
              rows={5}
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-indigo-500 via-pink-500 to-purple-500 font-semibold hover:scale-105 transition-transform"
          >
            <Send size={18} />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
