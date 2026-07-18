import { db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

// & ==========notes mutation==========

export const handleAddNote = async ({ values, userId }) => {
  await addDoc(collection(db, "users", userId, "notes"), {
    title: values.name,
    content: values.content,
    createdAt: serverTimestamp(),
  });
};

export const deleteNote = async ({ userId, noteId }) => {
  await deleteDoc(doc(db, "users", userId, "notes", noteId));
};

export const editNote = async ({ userId, noteId, data }) => {
  await updateDoc(doc(db, "users", userId, "notes", noteId), {
    ...data,
  });
};

// & ==========tasks mutation==========

export const handleAddTask = async ({ values, userId }) => {
  await addDoc(collection(db, "users", userId, "tasks"), {
    title: values.name,
    content: values.content,
    dueDate: values.dueDate,
    createdAt: serverTimestamp(),
    completed: false,
  });
};

// & notes

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
    completed: true,
  });
};
