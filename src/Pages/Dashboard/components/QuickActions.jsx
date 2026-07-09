import Action from "./Action";
import Button from "../../../components/Layout/Button";
import { CgNotes } from "react-icons/cg";
import { FaCirclePlus } from "react-icons/fa6";
import { AiOutlineUser } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";

const QuickActions = () => {
  const actions = [
    {
      icon: FaCirclePlus,
      text: "Create Task",
      color: "text-purple-700",
    },
    {
      icon: CgNotes,
      text: "Add Note",
      color: "text-orange-700",
    },
    {
      icon: AiOutlineUser,
      text: "Edit Profile",
      color: "text-blue-700",
    },
    {
      icon: SlCalender,
      text: "View Calender",
      color: "text-green-700",
    },
  ];

  return (
    <section className="sections flex flex-col">
      <h2 className="section-heading">Quick Actions</h2>
      <div className="mt-11 grid grid-cols-2 place-items-center gap-4">
        {actions.map((action) => (
          <Action key={action.text} action={action} />
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
