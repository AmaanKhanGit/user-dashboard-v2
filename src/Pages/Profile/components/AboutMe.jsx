import { MdEdit } from "react-icons/md";
import Button from "../../../components/Layout/Button";
import EmptyState from "./EmptyState";

const AboutMe = () => {
  const aboutText = [
    // "Passionated Frontend Developer who loves to build responsive and user-friendly web application. I enjoy turning ideas into real product using modern technologies.",
  ];
  return (
    <section className="sections flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold"> About Me</h2>{" "}
        <Button className="hollowBtn flex items-center gap-2 border-none bg-gray-100">
          <MdEdit />
          Edit
        </Button>
      </div>
      <div className="mt-3">
        {aboutText.length > 0 ? (
          <p className="text-lg text-gray-600">{aboutText}</p>
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
