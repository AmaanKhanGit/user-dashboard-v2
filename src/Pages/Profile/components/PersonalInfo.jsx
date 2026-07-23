import { MdEdit } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline, IoMailOutline } from "react-icons/io5";
import Button from "../../../components/Layout/Button";
import { useReverification, useUser } from "@clerk/react";
import EditModal from "./EditModal";
import EditPersonalInfo from "../modals/EditPersonalInfo";
import { useState } from "react";
import UpdatePasswordModal from "../modals/UpdatePasswordModal";

const PersonalInfo = ({ className }) => {
  const { user } = useUser();
  const [isOpen, setOpen] = useState(false);
  const [isUpdatingPass, setUpdatingPass] = useState(false);

  const details = [
    {
      icon: FaRegUser,
      title: "Full Name",
      desc: user?.fullName || "",
    },
    {
      icon: IoMailOutline,
      title: "Email",
      desc: user?.emailAddresses?.[0]?.emailAddress || "",
    },
    {
      icon: IoLocationOutline,
      title: "Location",
      desc: user?.unsafeMetadata?.location || "",
    },
    {
      icon: SlCalender,
      title: "Joined",
      desc: user?.createdAt ? user.createdAt.toDateString() : "",
    },
  ];

  const handleUpdatePassword = useReverification((values) =>
    user?.updatePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
      signOutOfOtherSessions: values.signOutOfOtherSessions,
    }),
  );

  return (
    <section className={`sections flex flex-col gap-2 ${className}`}>
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Personal Information</h2>
        <Button
          onClick={() => setOpen(true)}
          className="hollowBtn flex items-center gap-2 border-none bg-gray-100 dark:bg-gray-800"
        >
          <MdEdit />
          Edit
        </Button>
      </div>
      <div className="mt-3">
        <div className="grid grid-cols-2 gap-3 p-2 max-md:flex max-md:flex-col">
          {details.map((info) => {
            const Icon = info.icon;
            return (
              <div key={info.title} className="flex gap-3">
                <div className="self-start rounded-xl bg-gray-200 p-2 text-xl text-purple-600 dark:bg-gray-800 dark:text-purple-300">
                  <Icon />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {info.title}
                  </p>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {info.desc ? info.desc : "Not Added"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr className="text-gray-200 dark:text-gray-800" />
      <div className="mt-3">
        <h2 className="text-xl font-bold">Security</h2>
        <div className="flex justify-between">
          <div className="mt-4 flex flex-col px-2">
            <p className="text-lg font-medium">Password</p>
            <p className="text-lg font-medium">••••••••</p>
          </div>
          <Button
            className="hollowBtn self-end"
            onClick={() => setUpdatingPass(true)}
          >
            Change Password
          </Button>
        </div>
      </div>

      <EditModal open={isOpen} setOpen={setOpen} title="Personal Information">
        <EditPersonalInfo setOpen={setOpen} />
      </EditModal>

      <UpdatePasswordModal
        open={isUpdatingPass}
        setOpen={setUpdatingPass}
        onSubmit={handleUpdatePassword}
        className=""
      />
    </section>
  );
};

export default PersonalInfo;
