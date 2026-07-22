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
  await addDoc(collection(db, "users", userId, "activities"), {
    type: "note",
    title: "Added a new note",
    content: values.name,
    timestamp: serverTimestamp(),
  });
};

export const deleteNote = async ({ userId, noteId, title }) => {
  await deleteDoc(doc(db, "users", userId, "notes", noteId));
  await addDoc(collection(db, "users", userId, "activities"), {
    type: "note",
    title: "Deleted a note",
    content: title,
    timestamp: serverTimestamp(),
  });
};

export const editNote = async ({ userId, noteId, data }) => {
  await updateDoc(doc(db, "users", userId, "notes", noteId), {
    ...data,
  });
  await addDoc(collection(db, "users", userId, "activities"), {
    type: "note",
    title: "Edited a note",
    content: data.name,
    timestamp: serverTimestamp(),
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
  await addDoc(collection(db, "users", userId, "activities"), {
    type: "task",
    title: "Created a new task",
    content: values.name,
    timestamp: serverTimestamp(),
  });
};

// & notes

export const deleteTask = async ({ userId, taskId, title }) => {
  await deleteDoc(doc(db, "users", userId, "tasks", taskId));
  await addDoc(collection(db, "users", userId, "activities"), {
    type: "task",
    title: "Deleted a task",
    content: title,
    timestamp: serverTimestamp(),
  });
};

export const editTask = async ({ userId, taskId, data }) => {
  await updateDoc(doc(db, "users", userId, "tasks", taskId), {
    ...data,
  });
  await addDoc(collection(db, "users", userId, "activities"), {
    type: "task",
    title: "Edited a task",
    content: data.name,
    timestamp: serverTimestamp(),
  });
};

export const completeTask = async ({ userId, taskId, title }) => {
  await updateDoc(doc(db, "users", userId, "tasks", taskId), {
    completed: true,
    completedAt: serverTimestamp(),
  });

  await addDoc(collection(db, "users", userId, "activities"), {
    type: "task",
    title: "Completed task",
    content: title,
    timestamp: serverTimestamp(),
  });
};
