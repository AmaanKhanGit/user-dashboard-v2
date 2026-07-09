import { FaCirclePlus } from "react-icons/fa6";

const Action = ({ action }) => {
  const Icon = action.icon;
  return (
    <div className="flex w-40 cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border border-gray-200 p-3">
      <Icon className={`text-5xl ${action.color}`} />
      <h2>{action.text}</h2>
    </div>
  );
};

export default Action;
