import { db } from "../firebase/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

// & notes mutation

export const deleteNote = async ({ userId, noteId }) => {
  await deleteDoc(doc(db, "users", userId, "notes", noteId));
};

export const editNote = async ({ userId, noteId, data }) => {
  await updateDoc(doc(db, "users", userId, "notes", noteId), {
    ...data,
  });
};

// & tasks mutation

export const deleteTask = async ({ userId, taskId }) => {
  await deleteDoc(doc(db, "users", userId, "tasks", taskId));
};

export const editTask = async ({ userId, taskId, data }) => {
  await updateDoc(doc(db, "users", userId, "tasks", taskId), {
    ...data,
  });
};

export const completeTask = async ({ userId, taskId }) => {
  await updateDoc(doc(db, "users", userId, "tasks", taskId), {
    complete: true,
  });
};
