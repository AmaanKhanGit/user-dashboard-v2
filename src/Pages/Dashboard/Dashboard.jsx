import { useUser } from "@clerk/react";
import DashboardLayout from "../../components/DashboardLayout";
import DashboardHero from "./components/DashboardHero";
import ProductivityGraph from "./components/ProductivityGraph";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import StatusCards from "./components/StatusCards";
import TodaysTasks from "./components/TodaysTasks";
import { useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    const profileFields = [
      "bio",
      "profession",
      "about",
      "location",
      "website",
      "linkedin",
      "instagram",
      "github",
    ];

    const hasProfileMetadata = profileFields.every(
      (field) => user.unsafeMetadata?.[field] !== undefined,
    );

    const setData = async () => {
      try {
        if (!hasProfileMetadata) {
          await user.updateMetadata({
            unsafeMetadata: {
              bio: "",
              profession: "",
              about: "",
              location: "",
              website: "",
              linkedin: "",
              instagram: "",
              github: "",
            },
          });
        }
      } catch (error) {
        console.error(error);
      }

      // await setDoc(doc(db, "users", user.id), {
      //   about: "",
      //   website: "",
      //   location: "",
      // });
    };

    setData();
  }, [isLoaded, user]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const docRef = doc(db, "users", user.id);

  //     const snapshot = await getDoc(docRef);

  //     if (snapshot.exists()) {
  //       console.log(snapshot.data());
  //     }
  //   };
  //   getData();
  // }, []);

  return (
    <DashboardLayout className="grid grid-cols-3 gap-3 p-4 max-lg:flex max-lg:flex-col">
      <DashboardHero className="col-span-2" />
      <RecentActivity className="" />
      <StatusCards className="col-span-3" />
      <ProductivityGraph />
      <TodaysTasks />
      <QuickActions />
    </DashboardLayout>
  );
};

export default Dashboard;
