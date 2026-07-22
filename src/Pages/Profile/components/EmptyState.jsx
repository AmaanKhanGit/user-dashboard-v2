import { Plus } from "lucide-react";

const EmptyState = ({ title, desc, setOpen }) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-4 dark:border-gray-700 dark:bg-gray-900">
      <div>
        <p className="font-medium text-gray-700 dark:text-gray-200">{title}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-purple-600 bg-white px-4 py-2 text-purple-600 transition hover:bg-purple-100 dark:bg-gray-900 dark:text-purple-300 dark:hover:bg-purple-950/40"
      >
        <Plus size={18} />
        Add
      </button>
    </div>
  );
};

export default EmptyState;
