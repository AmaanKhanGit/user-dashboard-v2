import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const getTasks = async (userId) => {
  const snapshot = await getDocs(collection(db, "users", userId, "tasks"));

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

export const getRecentNotes = async (userId) => {
  const q = query(
    collection(db, "users", userId, "notes"),
    orderBy("createdAt", "desc"),
    limit(4),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const getActivities = async (userId) => {
  const q = query(
    collection(db, "users", userId, "activities"),
    orderBy("timestamp", "desc"),
    limit(4),
  );
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
