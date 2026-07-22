import { useUser } from "@clerk/react";
import EmptyWorkspace from "../component/EmptyWorkspace";
import Task from "./Task";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../../services/queryService";
import WorkspaceLoading from "../component/WorkspaceLoading";

const TaskSection = ({ className }) => {
  const { user } = useUser();

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["task-query", user.id],
    queryFn: () => getTasks(user.id),
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
        <h2 className="text-xl font-semibold text-slate-900">
          Tasks
          <span className="ml-2 text-base font-normal text-slate-500">
            ({tasks.length})
          </span>
        </h2>
      </div>
      {tasks.length === 0 ? (
        <EmptyWorkspace
          title="No tasks yet"
          message="Create your first task to stay organized and productive."
        />
      ) : (
        <div className="flex flex-col gap-3 bg-white">
          {tasks
            .filter((task) => !task.deleted)
            .map((task) => (
              <Task
                key={task.id}
                taskId={task.id}
                userId={user.id}
                title={task.title}
                content={task.content}
                createdAt={task.createdAt.toDate().toLocaleDateString("en-GB")}
                dueDate={task.dueDate}
                status={task.completed ? "Completed" : "Pending"}
              />
            ))}
        </div>
      )}
    </section>
  );
};

export default TaskSection;
