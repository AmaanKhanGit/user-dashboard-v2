import { useQuery } from "@tanstack/react-query";
import NotesCard from "./NotesCard";
import { getNotes } from "../../../services/queryService";
import { useUser } from "@clerk/react";

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
    queryKey: ["recent-notes"],
    queryFn: () => getNotes(user.id),
  });

  if (data) {
    console.log(data);
  }

  return (
    <section className="sections flex flex-col">
      <h2 className="section-heading">Recent Notes</h2>

      <div className="mt-8 flex flex-col gap-4">
        {data?.map((note) => (
          <NotesCard key={note.id} note={note} />
        ))}
      </div>
    </section>
  );
};

export default RecentNotes;
