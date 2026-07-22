import { deleteNote, editNote } from "../../../services/mutationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FaCalendarAlt, FaEdit, FaTrash } from "react-icons/fa";
import EditItemModal from "../modal/EditItemModal";
import toast from "react-hot-toast";
import ActionLoader from "../component/ActionLoader";

const Note = ({ title, content, createdAt, noteId, userId }) => {
  const [isOpen, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["delete-note"],
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["note-query"],
      });
      toast.success("Note Deleted Succssfully!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const editMutation = useMutation({
    mutationKey: ["edit-note"],
    mutationFn: editNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["note-query"],
      });
      toast.success("Note Edited Succssfully!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

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
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-purple-100 text-purple-700"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => deleteMutation.mutate({ userId, noteId, title })}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-red-100 text-red-600"
          >
            {deleteMutation.isPending ? <CgSpinner /> : <FaTrash />}
          </button>
        </div>
      </div>
      <EditItemModal
        open={isOpen}
        modalConfig={{
          type: "note",
          title: "Edit Note",
          isDueDate: false,
          onSubmit: (values) =>
            editMutation.mutateAsync({
              userId,
              noteId,
              data: values,
            }),
          name: title,
          content: content,
        }}
        onClose={() => setOpen(false)}
      />

      {(editMutation.isPending || deleteMutation.isPending) && <ActionLoader />}
    </article>
  );
};

export default Note;
