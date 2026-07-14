import { useUser } from "@clerk/react";
import DashboardLayout from "../../components/DashboardLayout";
import DashboardHero from "./components/DashboardHero";
import ProductivityGraph from "./components/ProductivityGraph";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import StatusCards from "./components/StatusCards";
import TodaysTasks from "./components/TodaysTasks";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
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
        if (!hasProfileMetadata) {
          await user.updateMetadata({
            unsafeMetadata: metadata,
          });
        }
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
      <QuickActions />
    </DashboardLayout>
  );
};

export default Dashboard;
