import { useQuery } from "@tanstack/react-query";
import NotesCard from "./NotesCard";
import { getRecentNotes } from "../../../services/queryService";
import { useUser } from "@clerk/react";
import EmptyWorkspace from "../../../Pages/Wrokspace/component/EmptyWorkspace";

// const notes = [
//   {
//     id: 1,
//     title: "Project Dashboard UI",
//     updatedAt: "2 hours ago",
//     preview:
//       "Completed the dashboard layout and added responsive sidebar with improved spacing for mobile devices.",
//   },
//   {
//     id: 2,
//     title: "Meeting Notes",
//     updatedAt: "Yesterday",
//     preview:
//       "Discussed authentication flow using Clerk, Firebase integration, and upcoming deployment checklist.",
//   },
//   {
//     id: 3,
//     title: "Daily Journal",
//     updatedAt: "3 days ago",
//     preview:
//       "Today I finished the profile page and started working on reusable modal components for tasks and notes.",
//   },
// ];

const RecentNotes = () => {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ["recent-notes", user?.id],
    queryFn: () => getRecentNotes(user.id),
    enabled: !!user?.id,
    staleTime: 60_000,
  });

  return (
    <section className="sections flex flex-col">
      <div className="flex justify-between">
        <h2 className="section-heading">Recent Notes</h2>
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {data?.length === 0 ? (
          <div className="mt-3 flex h-full flex-col justify-center gap-3">
            <EmptyWorkspace
              title="No recent notes"
              message="You're haven't added any note yet."
            />
          </div>
        ) : (
          data?.map((note) => <NotesCard key={note.id} note={note} />)
        )}
      </div>
    </section>
  );
};

export default RecentNotes;
