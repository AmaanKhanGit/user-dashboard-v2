import { useQuery } from "@tanstack/react-query";
import Button from "../../../components/Layout/Button";
import Task from "./Task";
import { getTasks } from "../../../services/queryService";
import { useUser } from "@clerk/react";
import EmptyWorkspace from "../../../Pages/Wrokspace/component/EmptyWorkspace";
import { Link } from "react-router-dom";

const TodaysTasks = () => {
  // const tasks = [
  //   {
  //     id: 101,
  //     title: "Create dashboard UI",
  //     dueDate: "Due: Today, 11:43 AM",
  //     status: "Success",
  //     preview: "Planning to create a portfolio with content management panel",
  //     colors: {
  //       priorityColor: "bg-red-50 text-red-600",
  //       statusColor: "bg-green-200 text-green-600",
  //     },
  //   },
  //   {
  //     id: 106,
  //     title: "Solve Leetcode Probelem",
  //     dueDate: "Due: Today, 09:10 PM",
  //     status: "Pending",
  //     preview: "Planning to create a portfolio with content management panel",
  //     colors: {
  //       priorityColor: "bg-amber-50 text-amber-600",
  //       statusColor: "bg-amber-200 text-amber-600",
  //     },
  //   },
  //   {
  //     id: 103,
  //     title: "Date a girl",
  //     dueDate: "Due: Never",
  //     status: "Never",
  //     preview: "Planning to create a portfolio with content management panel",
  //     colors: {
  //       priorityColor: "bg-red-50 text-red-600",
  //       statusColor: "bg-gray-200 text-gray-600",
  //     },
  //   },
  // ];

  const { user } = useUser();

  const { data, isError, error } = useQuery({
    queryKey: ["today-tasks"],
    queryFn: () => getTasks(user.id),
  });

  let todayTasks = [];

  if (data) {
    console.log(data);
    const today = new Date().toISOString().split("T")[0];

    todayTasks = data.filter(
      (task) => task.dueDate === today && !task.completed,
    );

    console.log(todayTasks);
  }

  if (isError) {
    console.log(error);
  }

  return (
    <section className="sections flex flex-col gap-3">
      <div className="flex justify-between">
        <h2 className="section-heading">Today's Tasks</h2>
        <Link to="/workspace">
          <Button className="hollowBtn">View All</Button>
        </Link>
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
