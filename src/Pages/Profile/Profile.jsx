import DashboardLayout from "../../components/DashboardLayout";
import ProfileHero from "./components/ProfileHero";
import AboutMe from "./components/AboutMe";
import Skills from "./components/Skills";
import PersonalInfo from "./components/PersonalInfo";
import ProfileProvider from "../../Provider/ProfileProvider";

const Profile = () => {
  return (
    <ProfileProvider>
      <DashboardLayout className="flex flex-col gap-3 px-1 py-4 sm:px-4 lg:grid lg:grid-cols-2">
        <ProfileHero className="col-span-2" />
        <PersonalInfo className="row-span-2" />
        <AboutMe />
        <Skills />
      </DashboardLayout>
    </ProfileProvider>
  );
};

export default Profile;
