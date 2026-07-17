import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getTasks = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "tasks"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getCompletedTasks = async (userId) => {
  const q = query(
    collection(db, "users", userId, "tasks"),
    where("status", "==", "Completed"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getNotes = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "notes"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
