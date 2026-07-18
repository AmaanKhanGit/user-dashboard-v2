import { FaPlus } from "react-icons/fa";
import Button from "../../../components/Layout/Button";
import { useUser } from "@clerk/react";
import { useContext, useState } from "react";
import AddItemModal from "../modal/AddItemModal";
import { useMutation } from "@tanstack/react-query";
import {
  handleAddNote,
  handleAddTask,
} from "../../../services/mutationService";
import toast from "react-hot-toast";
import ActionLoader from "../../Wrokspace/component/ActionLoader";

const DashboardHero = ({ className }) => {
  const { user } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    type: "",
    title: "",
    isDueDate: false,
  });

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const quotes = [
    "Focus on progress, not perfection.",
    "Small steps every day.",
    "Stay consistent.",
    "Done is better than perfect.",
  ];

  const [randQuote] = useState(
    quotes[Math.floor(Math.random() * quotes.length)],
  );

  const addTaskMutation = useMutation({
    mutationKey: ["create-task"],
    mutationFn: handleAddTask,
    onSuccess: () => {
      toast.success("Task created successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const addNoteMutation = useMutation({
    mutationKey: ["add-note"],
    mutationFn: handleAddNote,
    onSuccess: () => {
      toast.success("Task created successfully");
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleTaskOpen = () => {
    setModalConfig({
      type: "task",
      title: "Create Task",
      isDueDate: true,
    });
    setOpen(true);
  };

  const handleNoteOpen = () => {
    setModalConfig({
      type: "note",
      title: "Add Note",
      isDueDate: false,
    });
    setOpen(true);
  };

  const mutationMap = {
    task: addTaskMutation,
    note: addNoteMutation,
  };

  return (
    <section
      className={`sections flex justify-between max-md:flex-col ${className}`}
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-3xl font-bold">
          <div>{greeting},</div>
          <div className="text-purple-700">{user.fullName}</div>
        </h1>
        <p className="text-lg text-gray-400">{today}</p>
        <p className="text-lg text-gray-400">{randQuote}</p>
        <div className="mt-5 flex gap-3">
          <Button
            onClick={handleTaskOpen}
            className="flex shrink-0 items-center justify-center gap-2"
          >
            <FaPlus /> Task
          </Button>
          <Button
            onClick={handleNoteOpen}
            className="hollowBtn flex shrink-0 items-center justify-center gap-2"
          >
            <FaPlus /> Note
          </Button>
        </div>
      </div>
      <div className="">
        <img
          className="h-64 object-contain"
          src="/dashboardHero.png"
          alt="dashboardHero"
        />
      </div>
      <AddItemModal
        open={isOpen}
        modalConfig={modalConfig}
        onSubmit={async (values, actions) => {
          await mutationMap[modalConfig.type].mutateAsync({
            values,
            userId: user.id,
          });

          actions.resetForm();
        }}
        onClose={() => setOpen(false)}
      />

      {(addTaskMutation.isPending || addNoteMutation.isPending) && (
        <ActionLoader />
      )}
    </section>
  );
};

export default DashboardHero;
