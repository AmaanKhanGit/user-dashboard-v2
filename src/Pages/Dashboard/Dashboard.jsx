import { useUser } from "@clerk/react";
import DashboardLayout from "../../components/DashboardLayout";
import DashboardHero from "./components/DashboardHero";
import ProductivityGraph from "./components/ProductivityGraph";
import RecentActivity from "./components/RecentActivity";
import StatusCards from "./components/StatusCards";
import TodaysTasks from "./components/TodaysTasks";
import { useEffect } from "react";
import RecentNotes from "./components/RecentNotes";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user || user.unsafeMetadata.firstLogin) return;

    const defaults = {
      bio: "",
      profession: "",
      about: "",
      location: "",
      website: "",
      linkedin: "",
      instagram: "",
      github: "",
      skills: [],
    };

    const metadata = {
      ...defaults,
      ...user.unsafeMetadata,
    };

    const setData = async () => {
      try {
        await user.updateMetadata({
          unsafeMetadata: { metadata, firstLogin: true },
        });
      } catch (error) {
        console.error(error);
      }
    };

    setData();
  }, [isLoaded, user]);

  return (
    <DashboardLayout className="grid grid-cols-3 gap-3 p-4 max-lg:flex max-lg:flex-col">
      <DashboardHero className="col-span-2" />
      <RecentActivity className="" />
      <StatusCards className="col-span-3" />
      <ProductivityGraph />
      <TodaysTasks />
      <RecentNotes />
    </DashboardLayout>
  );
};

export default Dashboard;
