import { FaEdit } from "react-icons/fa";
import Button from "../../../components/Layout/Button";
import { CalendarDays, Circle, CircleCheckBig, MapPin } from "lucide-react";

const ProfileHero = ({ className }) => {
  return (
    <div
      className={`grid gap-10 bg-transparent py-6 lg:grid-cols-[1fr_320px] lg:px-10 ${className}`}
    >
      {/* Left */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-6">
          <img
            className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 object-cover shadow-sm"
            src="/profilePhoto.png"
            alt="profile"
          />

          <div className="space-y-1">
            <h2 className="text-3xl font-bold text-gray-900">John Doe</h2>

            <p className="text-lg font-medium text-gray-700">
              Frontend Developer
            </p>

            <p className="text-base text-gray-500">john@example.com</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="max-w-2xl text-lg text-gray-700">
            Building beautiful web experiences one component at a time.
          </p>

          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>New Delhi, India</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              <span>Joined July 2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Complete your profile
        </h3>

        <p className="mt-2 text-lg font-medium text-gray-700">80% Completed</p>

        {/* Progress */}
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-4/5 rounded-full bg-violet-600" />
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <CircleCheckBig size={20} className="text-green-600" />
            <span>Avatar</span>
          </div>

          <div className="flex items-center gap-3">
            <CircleCheckBig size={20} className="text-green-600" />
            <span>Bio</span>
          </div>

          <div className="flex items-center gap-3">
            <Circle size={20} className="text-gray-400" />
            <span>Skills</span>
          </div>

          <div className="flex items-center gap-3">
            <Circle size={20} className="text-gray-400" />
            <span>Social Links</span>
          </div>
        </div>

        <Button className="hollowBtn mt-8 flex w-full items-center justify-center gap-2">
          Edit Profile
          <FaEdit />
        </Button>
      </div>
    </div>
  );
};

export default ProfileHero;
