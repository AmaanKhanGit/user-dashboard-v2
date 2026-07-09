import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Layout/Button";
import { CgNotes } from "react-icons/cg";
const DashboardHero = ({ className }) => {
  return (
    <section
      className={`sections flex justify-between max-md:flex-col ${className}`}
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">
          <div>Good Morning,</div>
          <div className="text-purple-700">Username</div>
        </h1>
        <p className="text-lg text-gray-400">Jun 02, 2026 Saturday</p>
        <p className="text-lg text-gray-400">
          Focus on progress not perfection <br /> Yor're doing great!
        </p>
        <div className="flex gap-3">
          <Button className="flex shrink-0 items-center justify-center gap-2">
            <FaPlus /> Create Task
          </Button>
          <Button className="hollowBtn flex shrink-0 items-center justify-center gap-2">
            <CgNotes /> View Tasks
          </Button>
        </div>
      </div>
      <div className="">
        <img className="w-full" src="/dashboardHero.png" alt="dashboardHero" />
      </div>
    </section>
  );
};

export default DashboardHero;
