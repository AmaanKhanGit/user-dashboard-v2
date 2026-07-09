import Button from "../../../components/Layout/Button";
import { CgLogIn, CgNotes } from "react-icons/cg";
import { AiOutlineCheck, AiOutlineUser } from "react-icons/ai";
const RecentActivity = ({ className }) => {
  const variants = {
    purpleVar: "bg-purple-100 text-purple-800",
    greenVar: "bg-green-100 text-green-800",
    redVar: "bg-red-100 text-red-800",
    blueVar: "bg-blue-100 text-blue-800",
  };
  const activities = [
    {
      icon: AiOutlineUser,
      title: "Updated Profile",
      description: "You updated your profile information",
      time: "2m ago",
      varient: variants.purpleVar,
    },
    {
      icon: AiOutlineCheck,
      title: "Completed Task",
      description: "Design new dashboard UI",
      time: "1h ago",
      varient: variants.greenVar,
    },
    {
      icon: CgNotes,
      title: "Created Note",
      description: "Meeting notes - Project Alpha",
      time: "3m ago",
      varient: variants.redVar,
    },
    {
      icon: CgLogIn,
      title: "Logged In",
      description: "You logged in succesfully",
      time: "10h ago",
      varient: variants.blueVar,
    },
  ];

  return (
    <section className={`sections flex flex-col gap-5 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="section-heading">Recent Activity</h3>
        <Button className="hollowBtn px-3 py-1">View all</Button>
      </div>
      <div className="flex flex-col gap-10">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div
              key={activity.title}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2 text-xl ${activity.varient}`}>
                  <Icon />
                </div>
                <div className="flex flex-col items-start">
                  <h2 className="text-sm">{activity.title}</h2>
                  <p className="text-[13px] font-medium text-gray-400">
                    {activity.description}
                  </p>
                </div>
              </div>

              <p className="shrink-0 text-sm text-gray-500">{activity.time}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentActivity;
