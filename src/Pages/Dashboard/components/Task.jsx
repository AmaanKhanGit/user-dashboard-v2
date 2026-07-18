import { useUser } from "@clerk/react";
import { completeTask } from "../../../services/mutationService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import ActionLoader from "../../..//Pages/Wrokspace/component/ActionLoader";

const Task = ({ task }) => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["completed-task"],
    mutationFn: completeTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["today-tasks"],
      });
      toast.success("Congratulations to complete this task!");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-3">
      <input
        className="mt-1.5 scale-125 accent-green-600"
        type="checkbox"
        name="complete"
        id={`complete-${task.id}`}
        checked={task.completed}
        onChange={() => mutate({ userId: user.id, taskId: task.id })}
        disabled={isPending || task.completed}
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold">{task.title}</h3>

          <span
            className={`rounded-full px-2 py-0.5 text-xs font-medium ${
              task.completed
                ? "bg-green-200 text-green-600"
                : "bg-red-200 text-red-600"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <p className="mt-3 line-clamp-3 border-l-4 border-purple-200 pl-3 text-sm leading-6 text-gray-600">
          {task.content}
        </p>

        <p className="mt-2 text-xs font-medium text-gray-400">{task.dueDate}</p>
      </div>
    </div>
  );
};

export default Task;
