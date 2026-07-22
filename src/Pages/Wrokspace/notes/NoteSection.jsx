import { useQuery } from "@tanstack/react-query";
import EmptyWorkspace from "../component/EmptyWorkspace";
import Note from "./Note";
import { getNotes } from "../../../services/queryService";
import { useUser } from "@clerk/react";
import WorkspaceLoading from "../component/WorkspaceLoading";

const NoteSection = ({ className }) => {
  const { user } = useUser();

  const {
    data: notes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note-query", user.id],
    queryFn: () => getNotes(user.id),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <section className={`flex flex-col rounded-xl p-5 shadow ${className}`}>
        <WorkspaceLoading />
      </section>
    );
  }

  if (isError) {
    return <p>Error</p>;
  }

  return (
    <section className={`flex flex-col rounded-xl p-5 shadow ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-gray-100">
          Notes
          <span className="ml-2 text-base font-normal text-slate-500 dark:text-gray-400">
            ({notes.length})
          </span>
        </h2>
      </div>
      {notes.length === 0 ? (
        <EmptyWorkspace
          title="No notes yet"
          message="Add your first note to save your thoughts."
        />
      ) : (
        <div className="flex flex-col gap-3 bg-white dark:bg-gray-900">
          {notes.map((note) => (
            <Note
              key={note.id}
              noteId={note.id}
              userId={user.id}
              title={note.title}
              content={note.content}
              createdAt={note.createdAt.toDate().toLocaleDateString("en-GB")}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default NoteSection;
