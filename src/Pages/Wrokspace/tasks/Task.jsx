import {
  deleteTask,
  editTask,
  completeTask,
} from "../../../services/mutationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import {
  FaCalendarAlt,
  FaCheck,
  FaEdit,
  FaFlag,
  FaTrash,
} from "react-icons/fa";
import EditItemModal from "../modal/EditItemModal";
import { useState } from "react";
import ActionLoader from "../component/ActionLoader";

const Task = ({
  title,
  content,
  createdAt,
  dueDate,
  status,
  taskId,
  userId,
}) => {
  const [isOpen, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationKey: ["delete-task"],
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task-query"],
      });
      toast.success("Task Deleted Successfully");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Unable to delete task");
    },
  });

  const editMutation = useMutation({
    mutationKey: ["edit-task"],
    mutationFn: editTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task-query"],
      });
      toast.success("Task Edited Succssfully!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const completeMutation = useMutation({
    mutationKey: ["complete-task"],
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task-query"],
      });
      toast.success("Congratulations to complete this task!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

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
          <button
            onClick={() => completeMutation.mutate({ userId, taskId })}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-green-100 text-green-700"
          >
            <FaCheck />
          </button>

          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-purple-100 text-purple-700"
          >
            <FaEdit />
          </button>

          <button
            disabled={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate({ userId, taskId })}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-red-100 text-red-600 ${deleteMutation.isPending && "cursor-not-allowed"}`}
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
          isDueDate: true,
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

      {(editMutation.isPending ||
        deleteMutation.isPending ||
        completeMutation.isPending) && <ActionLoader />}
    </article>
  );
};

export default Task;
