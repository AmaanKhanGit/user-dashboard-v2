import { FaEdit } from "react-icons/fa";
import Button from "../../../components/Layout/Button";
import { Circle, CircleCheckBig } from "lucide-react";
import { useUser } from "@clerk/react";

const ProfileCompletionBar = ({ setOpen }) => {
  const { user } = useUser();

  const hasAnyLink =
    !!user?.unsafeMetadata?.github ||
    !!user?.unsafeMetadata?.linkedin ||
    !!user?.unsafeMetadata?.instagram ||
    !!user?.unsafeMetadata?.website;

  const profileChecks = [
    !!user?.fullName,
    !!user?.hasImage,
    !!user?.unsafeMetadata?.bio,
    !!user?.unsafeMetadata?.profession,
    !!user?.unsafeMetadata?.location,
    !!user?.unsafeMetadata?.about,
    user?.unsafeMetadata?.skills?.length > 0,
    hasAnyLink,
  ];

  const completed = profileChecks.filter(Boolean).length;
  const progress = Math.round((completed / profileChecks.length) * 100);

  const missingFields = [];

  if (!user?.unsafeMetadata?.bio) missingFields.push("Bio");
  if (!user?.unsafeMetadata?.profession) missingFields.push("Profession");
  if (!user?.unsafeMetadata?.location) missingFields.push("Location");
  if (!user?.unsafeMetadata?.about) missingFields.push("About");
  if (!(user?.unsafeMetadata?.skills?.length > 0)) missingFields.push("Skills");
  if (!user?.hasImage) missingFields.push("Profile photo");

  if (!hasAnyLink) missingFields.push("Social links");

  return (
    <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Complete your profile
        </h3>

        <span className="text-lg font-semibold text-violet-600">
          {progress}%
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
        <div
          className="h-full rounded-full bg-violet-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {progress === 100 ? (
        <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2 text-green-700">
            <CircleCheckBig size={20} />
            <span className="font-medium">Your profile is complete 🎉</span>
          </div>

          <p className="mt-2 text-sm text-green-600">Everything looks great.</p>
        </div>
      ) : (
        <>
          <p className="mt-5 text-sm text-gray-600 dark:text-gray-300">
            {missingFields.length} step
            {missingFields.length > 1 && "s"} remaining
          </p>

          <div className="mt-4 space-y-3">
            {missingFields.slice(0, 3).map((field) => (
              <div
                key={field}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
              >
                <Circle size={18} className="text-gray-400" />
                <span>{field}</span>
              </div>
            ))}

            {missingFields.length > 3 && (
              <p className="pl-7 text-sm text-gray-500 dark:text-gray-400">
                +{missingFields.length - 3} more
              </p>
            )}
          </div>
        </>
      )}

      <Button
        className="hollowBtn mt-8 flex w-full items-center justify-center gap-2"
        onClick={() => setOpen(true)}
      >
        Edit Profile
        <FaEdit />
      </Button>
    </div>
  );
};

export default ProfileCompletionBar;
