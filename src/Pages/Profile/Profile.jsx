import DashboardLayout from "../../components/DashboardLayout";
import ProfileHero from "./components/ProfileHero";
import { useUser } from "@clerk/react";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import PersonalInfo from "./components/PersonalInfo";

const Profile = () => {
  const { user } = useUser();

  // useEffect(() => {
  //   const userRef = collection(db, "users_collection_786");

  //   const unsubscribe = onSnapshot(userRef, (snapshot) => {
  //     const users = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     console.log(users);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <DashboardLayout className="flex flex-col gap-3 px-4 py-4 lg:grid lg:grid-cols-2">
      <ProfileHero className="col-span-2" />
      <AboutMe />
      <PersonalInfo className="row-span-2" />
      <Skills />
    </DashboardLayout>
  );
};

export default Profile;
