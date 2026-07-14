import DashboardLayout from "../../components/DashboardLayout";
import ProfileHero from "./components/ProfileHero";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import PersonalInfo from "./components/PersonalInfo";

const Profile = () => {
  return (
    <DashboardLayout className="flex flex-col gap-3 px-4 py-4 lg:grid lg:grid-cols-2">
      <ProfileHero className="col-span-2" />
      <PersonalInfo className="row-span-2" />
      <AboutMe />
      <Skills />
    </DashboardLayout>
  );
};

export default Profile;
