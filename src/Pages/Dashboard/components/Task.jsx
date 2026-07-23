const Task = ({ task }) => {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-3 dark:border-gray-800">
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

        <p className="mt-3 line-clamp-3 border-l-4 border-purple-200 pl-3 text-sm leading-6 text-gray-600 dark:border-purple-900 dark:text-gray-300">
          {task.content.replace(/\n/g, " ").trim() + "..."}
        </p>

        <p className="mt-2 text-xs font-medium text-gray-400 dark:text-gray-500">
          {task.dueDate}
        </p>
      </div>
    </div>
  );
};

export default Task;
