import { MdAccessTime } from "react-icons/md";
import { CgNotes } from "react-icons/cg";

const NotesCard = ({ note }) => {
  const formattedDate = note.createdAt.toDate().toLocaleDateString();

  return (
    <article className="rounded-xl border border-purple-100 from-white to-purple-50 p-4 transition-all duration-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-100 p-2 text-purple-700">
            <CgNotes size={18} />
          </div>

          <h3 className="line-clamp-1 text-sm font-semibold text-gray-800">
            {note.title}
          </h3>
        </div>

        <span className="flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
          <MdAccessTime size={14} />
          {formattedDate}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 border-l-4 border-purple-200 pl-3 text-sm leading-6 text-gray-600">
        {note.content}
      </p>
    </article>
  );
};

export default NotesCard;
