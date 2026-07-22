import { MdEdit } from "react-icons/md";
import Button from "../../../components/Layout/Button";
import EmptyState from "./EmptyState";
import { useUser } from "@clerk/react";
import { useState } from "react";
import EditModal from "./EditModal";
import EditAbout from "../modals/EditAbout";

const AboutMe = () => {
  const { user } = useUser();
  const [isOpen, setOpen] = useState(false);

  return (
    <section className="sections flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold"> About Me</h2>
        <Button
          onClick={() => setOpen(true)}
          className="hollowBtn flex items-center gap-2 border-none bg-gray-100 dark:bg-gray-800"
        >
          <MdEdit />
          Edit
        </Button>
      </div>
      <div className="mt-3">
        {user.unsafeMetadata.about.length > 0 ? (
          <p className="text-lg whitespace-pre-wrap text-gray-600 dark:text-gray-300">
            {user.unsafeMetadata.about}
          </p>
        ) : (
          <EmptyState
            setOpen={setOpen}
            title="Nothing added about you"
            desc="Tell us about your self"
          />
        )}
      </div>
      <EditModal open={isOpen} setOpen={setOpen} title="Edit about you">
        <EditAbout setOpen={setOpen} />
      </EditModal>
    </section>
  );
};

export default AboutMe;
