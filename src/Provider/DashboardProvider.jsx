import { createContext } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUser } from "@clerk/react";
import toast from "react-hot-toast";

export const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const { user } = useUser();

  // & tasks

  const handleAddTask = async (values) => {
    try {
      await addDoc(collection(db, "users", user.id, "tasks"), {
        title: values.name,
        content: values.content,
        dueDate: values.dueDate,
        createdAt: serverTimestamp(),
        completed: false,
      });

      toast.success("Task added successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handkeUpdateTask = async (values) => {};

  const handkeDeleteTask = async (values) => {};
  // & notes

  const handleAddNote = async (values) => {
    try {
      await addDoc(collection(db, "users", user.id, "notes"), {
        title: values.name,
        content: values.content,
        createdAt: serverTimestamp(),
      });

      toast.success("Note added successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handkeUpdateNote = async (values) => {};

  const handkeDeleteNote = async (values) => {};

  return (
    <DashboardContext.Provider
      value={{
        handleAddTask,
        handleAddNote,
        handkeUpdateTask,
        handkeDeleteTask,
        handkeUpdateNote,
        handkeDeleteNote,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
