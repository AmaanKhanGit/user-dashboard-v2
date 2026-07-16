import {
  FaCalendarAlt,
  FaCheck,
  FaEdit,
  FaFlag,
  FaTrash,
} from "react-icons/fa";

const Task = ({ title, content, createdAt, dueDate, status }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
            {content}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status === "Completed"
              ? "bg-green-100 text-green-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {status}
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-purple-600" />
            <span>Created: {createdAt}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaFlag className="text-purple-600" />
            <span>Due: {dueDate}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-green-100 text-green-700">
            <FaCheck />
          </button>

          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <FaEdit />
          </button>

          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-red-100 text-red-600">
            <FaTrash />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Task;
