import { FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";

const Note = ({ title, content, createdAt }) => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

      <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-600">
        {content}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <FaCalendarAlt className="text-purple-600" />
          <span>Created: {createdAt}</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <FaEdit />
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
            <FaTrash />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Note;
