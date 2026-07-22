import { useQuery } from "@tanstack/react-query";
import Button from "../../../components/Layout/Button";
import Task from "./Task";
import { getTasks } from "../../../services/queryService";
import { useUser } from "@clerk/react";
import EmptyWorkspace from "../../../Pages/Wrokspace/component/EmptyWorkspace";
import { Link } from "react-router-dom";
import { useMemo } from "react";

const TodaysTasks = () => {
  const { user } = useUser();

  const { data, isError, error } = useQuery({
    queryKey: ["today-tasks"],
    queryFn: () => getTasks(user.id),
  });

  const todayTasks = useMemo(() => {
    if (!data) return [];

    const today = new Date().toISOString().split("T")[0];

    return data
      .filter((task) => task.dueDate === today && !task.deleted)
      .slice(0, 4);
  }, [data]);

  if (isError) {
    console.log(error);
  }

  return (
    <section className="sections flex flex-col gap-3">
      <div className="flex justify-between">
        <h2 className="section-heading">Today's Tasks</h2>
      </div>

      {todayTasks.length === 0 ? (
        <div className="mt-3 flex h-full flex-col justify-center gap-3">
          <EmptyWorkspace
            title="No tasks for today"
            message="You're all caught up. Enjoy your day or add a new task."
          />
        </div>
      ) : (
        <div className="mt-3 flex h-full flex-col gap-3">
          {todayTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      )}
    </section>
  );
};

export default TodaysTasks;
