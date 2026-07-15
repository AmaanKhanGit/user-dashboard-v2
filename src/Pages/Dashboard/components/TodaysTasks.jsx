import Button from "../../../components/Layout/Button";
import Task from "./Task";

const TodaysTasks = () => {
  const tasks = [
    {
      id: 101,
      title: "Create dashboard UI",
      dueDate: "Due: Today, 11:43 AM",
      status: "Success",
      preview: "Planning to create a portfolio with content management panel",
      colors: {
        priorityColor: "bg-red-50 text-red-600",
        statusColor: "bg-green-200 text-green-600",
      },
    },
    {
      id: 106,
      title: "Solve Leetcode Probelem",
      dueDate: "Due: Today, 09:10 PM",
      status: "Pending",
      preview: "Planning to create a portfolio with content management panel",
      colors: {
        priorityColor: "bg-amber-50 text-amber-600",
        statusColor: "bg-amber-200 text-amber-600",
      },
    },
    {
      id: 103,
      title: "Date a girl",
      dueDate: "Due: Never",
      status: "Never",
      preview: "Planning to create a portfolio with content management panel",
      colors: {
        priorityColor: "bg-red-50 text-red-600",
        statusColor: "bg-gray-200 text-gray-600",
      },
    },
  ];
  return (
    <section className="sections flex flex-col gap-3">
      <div className="flex justify-between">
        <h2 className="section-heading">Today's Tasks</h2>
        {/* <Button className="hollowBtn">View All</Button> */}
      </div>
      <div className="mt-3 flex flex-col gap-3">
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default TodaysTasks;
