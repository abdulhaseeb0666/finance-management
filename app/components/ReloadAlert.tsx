"use client";

export function ReloadAlert() {
  return (
    <div className="fixed inset-0 z-9999 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      
      {/* Modal */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Changes Detected
        </h2>

        <p className="text-gray-600 mb-6">
          Please reload the page to view the latest updates.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}