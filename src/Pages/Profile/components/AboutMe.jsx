import { MdEdit } from "react-icons/md";
import Button from "../../../components/Layout/Button";
import EmptyState from "./EmptyState";
import { useUser } from "@clerk/react";

const AboutMe = () => {
  const { user } = useUser();

  return (
    <section className="sections flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold"> About Me</h2>
        <Button className="hollowBtn flex items-center gap-2 border-none bg-gray-100">
          <MdEdit />
          Edit
        </Button>
      </div>
      <div className="mt-3">
        {user.unsafeMetadata.about.length > 0 ? (
          <p className="text-lg text-gray-600">{user.unsafeMetadata.about}</p>
        ) : (
          <EmptyState
            title="Nothing added about you"
            desc="Tell us about your self"
            buttonText="Add About"
          />
        )}
      </div>
    </section>
  );
};

export default AboutMe;
