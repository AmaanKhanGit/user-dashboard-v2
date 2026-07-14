import { X } from "lucide-react";

const EditModal = ({ open, setOpen, title, children, width = "max-w-2xl" }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* Overlay */}
      <div className="absolute inset-0" onClick={() => setOpen(false)} />

      {/* Modal */}
      <div
        className={`relative z-10 w-full ${width} rounded-2xl border border-gray-200 bg-white shadow-xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default EditModal;
