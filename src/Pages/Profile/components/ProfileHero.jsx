import { useState } from "react";

import { CalendarDays, MapPin } from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaGlobeAfrica,
  FaLinkedin,
} from "react-icons/fa";
import { useUser } from "@clerk/react";
import EditModal from "./EditModal";
import EditPersonalInfo from "../modals/EditPersonalInfo";
import ProfileCompletionBar from "./ProfileCompletionBar";

const ProfileHero = ({ className }) => {
  const { user } = useUser();
  const [isOpen, setOpen] = useState(false);

  const allSocialLinks = [
    { icon: FaGithub, link: user.unsafeMetadata.github },
    { icon: FaLinkedin, link: user.unsafeMetadata.linkedin },
    { icon: FaGlobeAfrica, link: user.unsafeMetadata.website },
    { icon: FaInstagram, link: user.unsafeMetadata.instagram },
  ];

  const socialLinks = allSocialLinks.filter(
    (item) => typeof item.link === "string" && item.link.trim() !== "",
  );

  const joinedDate = new Date(user.createdAt).toDateString();

  return (
    <div
      className={`grid gap-10 bg-transparent py-6 lg:grid-cols-[1fr_320px] lg:px-10 ${className}`}
    >
      {/* Left */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <img
            className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 object-cover shadow-sm"
            src={user.imageUrl}
            alt="profile"
          />

          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-gray-900">
              {user.fullName}
            </h2>

            <p className="text-lg font-medium text-gray-700">
              {user.unsafeMetadata.profession || ""}
            </p>

            <p className="text-base text-gray-500">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="max-w-2xl text-lg font-semibold text-gray-700">
            {user.unsafeMetadata.bio || "No bio added"}
          </p>

          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{user.unsafeMetadata.location || "where do you live"}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              <span>Joined at {joinedDate}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.link}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon size={22} />
              </a>
            );
          })}

          {socialLinks.length < allSocialLinks.length && (
            <button
              onClick={() => setOpen(true)}
              className="cursor-pointer font-medium text-violet-600"
            >
              + Add Links
            </button>
          )}
        </div>
      </div>

      {/* Right */}

      <ProfileCompletionBar setOpen={setOpen} />

      <EditModal open={isOpen} setOpen={setOpen} title="Personal Inforamation">
        <EditPersonalInfo setOpen={setOpen} />
      </EditModal>
    </div>
  );
};

export default ProfileHero;
