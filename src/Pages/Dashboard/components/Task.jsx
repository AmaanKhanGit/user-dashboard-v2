const Task = ({ task }) => {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-3">
      <input
        className="mt-1.5 scale-125"
        type="checkbox"
        name=""
        id=""
        disabled
      />
      <div className="flex flex-1 justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-bold">{task.title}</h3>
          <p
            className={`self-start rounded px-1.5 py-1 text-sm font-medium ${task.colors.priorityColor}`}
          >
            {task.priority}
          </p>
          <p className="text-xs font-medium text-gray-400">{task.dueDate}</p>
        </div>
        <p className={`tag self-center rounded ${task.colors.statusColor}`}>
          {task.status}
        </p>
      </div>
    </div>
  );
};

export default Task;
