import Button from "../../../components/Layout/Button";
import { CgLogIn, CgNotes } from "react-icons/cg";
import { AiOutlineCheck, AiOutlineUser } from "react-icons/ai";
import { FaClipboardList, FaTrashAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../../../services/queryService";
import { useUser } from "@clerk/react";
import WorkspaceLoading from "../../../Pages/Wrokspace/component/WorkspaceLoading";
import { getRelativeTime } from "../../../services/services";
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
      icon: FaClipboardList,
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
  ];

  const { user } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["recent-activity", user?.id],
    queryFn: () => getActivities(user.id),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <section
        className={`sections flex flex-col items-center justify-center gap-4`}
      >
        <WorkspaceLoading />
      </section>
    );
  }
  return (
    <section className={`sections flex flex-col gap-5 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="section-heading">Recent Activity</h3>
      </div>
      <div className="flex flex-col gap-10">
        {data?.length === 0 ? (
          <div className="mt-3 flex h-full flex-col justify-center gap-3">
            <EmptyWorkspace
              title="No recent activities"
              message="You just logged in"
            />
          </div>
        ) : (
          data?.map((activity) => {
            const Icon =
              activity.type === "note"
                ? CgNotes
                : activity.type === "task"
                  ? FaClipboardList
                  : activity.type === "deletion"
                    ? FaTrashAlt
                    : AiOutlineUser;

            return (
              <div
                key={activity.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 text-xl ${activity.type === "note" ? "bg-blue-100 text-blue-800 dark:bg-blue-950/50 dark:text-blue-300" : activity.type === "task" ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300" : activity.type === "deletion" ? "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300" : "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300"}`}
                  >
                    <Icon />
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm">{activity.title}</h2>
                    <p className="text-[13px] font-medium text-gray-400 dark:text-gray-500">
                      {activity.content}
                    </p>
                  </div>
                </div>

                <p className="shrink-0 text-sm text-gray-500 dark:text-gray-400">
                  {getRelativeTime(activity.timestamp)}
                </p>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default RecentActivity;
