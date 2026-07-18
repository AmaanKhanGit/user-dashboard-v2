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
    <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-2">
      <input
        className="mt-1.5 scale-125"
        type="checkbox"
        name="complete"
        id="complete"
        onClick={() => mutate({ userId: user.id, taskId: task.id })}
      />
      <div className="flex flex-1 justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold">{task.title}</h3>
          <p className="mt-4 line-clamp-3 border-l-4 border-purple-200 pl-3 text-sm leading-6 text-gray-600">
            {task.content}
          </p>
          <p className="text-xs font-medium text-gray-400">{task.dueDate}</p>
        </div>
      </div>
      {isPending && <ActionLoader />}
    </div>
  );
};

export default Task;
