import DashboardLayout from "../../components/DashboardLayout";
import DashboardHero from "./components/DashboardHero";
import ProductivityGraph from "./components/ProductivityGraph";
import QuickActions from "./components/QuickActions";
import RecentActivity from "./components/RecentActivity";
import StatusCards from "./components/StatusCards";
import TodaysTasks from "./components/TodaysTasks";
import useAuth from "../../hooks/useAuth";
const Dashboard = () => {
  const { user } = useAuth();
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
