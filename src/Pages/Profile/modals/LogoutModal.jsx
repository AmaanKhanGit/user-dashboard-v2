import React from "react";

const LogoutModal = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-5">
          <h2 className="text-xl font-semibold text-gray-900">
            Log Out
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Are you sure you want to log out of your account?
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-4 rounded-xl border border-purple-100 bg-purple-50 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H9m4 8H7a2 2 0 01-2-2V6a2 2 0 012-2h6"
                />
              </svg>
            </div>

            <div>
              <h3 className="font-medium text-gray-900">
                Confirm Logout
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You'll need to sign in again to access your dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-purple-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;