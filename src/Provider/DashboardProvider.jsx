import { createContext } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUser } from "@clerk/react";
import toast from "react-hot-toast";

export const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const { user } = useUser();

  const handleAddTask = async (values) => {
    try {
      await addDoc(collection(db, "users", user.id, "tasks"), {
        // ^ this will be my path
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

  const handleAddNote = async (values) => {
    try {
      await addDoc(collection(db, "users", user.id, "notes"), {
        title: values.name,
        content: values.content,
        createdAt: serverTimestamp(),
        completed: false,
      });

      toast.success("Note added successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        handleAddTask,
        handleAddNote,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardProvider;
