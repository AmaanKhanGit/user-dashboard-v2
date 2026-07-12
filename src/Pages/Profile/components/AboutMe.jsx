import { MdEdit } from "react-icons/md";
import Button from "../../../components/Layout/Button";

const AboutMe = () => {
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
        <p className="text-lg text-gray-600">
          Passionated Frontend Developer who loves to build responsive and
          user-friendly web application. I enjoy turning ideas into real product
          using modern technologies.
        </p>
      </div>
    </section>
  );
};

export default AboutMe;
