import { useState } from "react";

import {
  CalendarDays,
  Camera,
  MoreVertical,
  Trash2,
  MapPin,
} from "lucide-react";
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
import toast from "react-hot-toast";

const ProfileHero = ({ className }) => {
  const { user } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be under 2 MB.");
      return;
    }
    // Upload logic here

    try {
      await user.setProfileImage({ file });
      await user.reload();
    } catch (error) {
      toast.error(error);
    } finally {
      setIsMenuOpen(false);
    }

    console.log(file);

    e.target.value = "";
  };

  const handleRemoveImage = async () => {
    try {
      await user.setProfileImage({ file: null });
      await user.reload();
    } catch (error) {
      toast.error(error);
    } finally {
      setIsMenuOpen(false);
    }
  };

  return (
    <div
      className={`grid gap-10 bg-transparent py-6 lg:grid-cols-[1fr_320px] lg:px-10 ${className}`}
    >
      {/* Left */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <div className="relative h-32 w-32">
            <img
              className="h-full w-full rounded-full border-4 border-white object-cover shadow-sm"
              width="128"
              height="128"
              src={user.imageUrl}
              alt="Profile"
            />

            {/* More Actions */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="absolute top-1 right-1 rounded-full bg-white p-1.5 text-gray-600 shadow transition hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <MoreVertical size={16} />
            </button>

            {/* Dropdown */}
            {isMenuOpen && (
              <div className="absolute top-10 right-0 z-10 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-800 dark:bg-gray-900">
                <label
                  htmlFor="profile-image"
                  className="flex cursor-pointer items-center gap-3 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  <Camera size={16} />
                  <span>Change Photo</span>
                </label>

                <button
                  onClick={handleRemoveImage}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  <span>Remove Photo</span>
                </button>
              </div>
            )}

            {/* Hidden File Input */}
            <input
              id="profile-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {user.fullName}
            </h2>

            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {user.unsafeMetadata.profession || ""}
            </p>

            <p className="text-base text-gray-500 dark:text-gray-400">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="max-w-2xl text-lg font-semibold text-gray-700 dark:text-gray-300">
            {user.unsafeMetadata.bio || "No bio added"}
          </p>

          <div className="space-y-2 text-gray-600 dark:text-gray-300">
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
