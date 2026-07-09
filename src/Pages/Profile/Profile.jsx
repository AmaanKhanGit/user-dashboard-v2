import DashboardLayout from "../../components/DashboardLayout";
import ProfileCards from "./components/ProfileCards";
import ProfileHero from "./components/ProfileHero";
import { FaGithub, FaInstagram, FaRegUser } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FiLink } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { FaGlobeAfrica, FaLinkedin } from "react-icons/fa";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";

const Profile = () => {
  const profileContent = [
    {
      title: "About Me",
      about:
        "Passionated Frontend Developer who loves to build responsive and user-friendly web application. I enjoy turning ideas into real product using modern technologies.",
    },
    {
      title: "Skills",
      skills: [
        "React",
        "Next.js",
        "Tailwind CSs",
        "javaScripts",
        "TypeScript",
        "Git",
        "Redux",
        "Firebase",
      ],
    },
    {
      title: "Personal Information",
      details: [
        {
          icon: FaRegUser,
          title: "Full Name",
          desc: "John Doe",
        },
        {
          icon: IoMailOutline,
          title: "Email",
          desc: "john@example.com",
        },
        {
          icon: BsTelephone,
          title: "Phone",
          desc: "+91 123 456",
        },

        {
          icon: FiLink,
          title: "Website",
          desc: "https://johndoe.dev",
        },
        {
          icon: IoLocationOutline,
          title: "Location",
          desc: "New Delhi, India",
        },
        ,
        {
          icon: SlCalender,
          title: "Joined",
          desc: "July 2026",
        },
      ],
    },
    {
      socialLinks: "Social Links",
      links: [
        { name: "GitHUb", icon: FaGithub },
        { name: "LinkedIn", icon: FaLinkedin },
        { name: "Portfolio", icon: FaGlobeAfrica },
        { name: "Instagram", icon: FaInstagram },
      ],
      security: "Security",
      password: "********",
    },
  ];
  return (
    <DashboardLayout className="flex flex-col gap-3 px-4 py-4 lg:grid lg:grid-cols-2">
      <ProfileHero className="col-span-2" />

      {/*//& Maximum component reuse ahead 😄 */}
      {/* //& DRY mode: ON 😅 */}
      {profileContent.map((content) => (
        <ProfileCards key={content.title} content={content} />
      ))}
    </DashboardLayout>
  );
};

export default Profile;
