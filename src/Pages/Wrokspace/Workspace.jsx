import DashboardLayout from "../../components/DashboardLayout";
import NoteSection from "./notes/NoteSection";
import TaskSection from "./tasks/TaskSection";

const Workspace = () => {
  return (
    <DashboardLayout className="grid grid-cols-1 place-content-start items-start gap-3 px-1 py-4 lg:grid-cols-2">
      <TaskSection className="bg-white" />
      <NoteSection className="bg-white" />
    </DashboardLayout>
  );
};

export default Workspace;
