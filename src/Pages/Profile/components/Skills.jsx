import { MdEdit } from "react-icons/md";
import Button from "../../../components/Layout/Button";
import EmptyState from "./EmptyState";

const Skills = () => {
  const skills = [
    // "React",
    // "Next.js",
    // "Tailwind CSs",
    // "javaScripts",
    // "TypeScript",
    // "Git",
    // "Redux",
    // "Firebase",
  ];
  return (
    <section className="sections flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold"> Skills</h2>
        <Button className="hollowBtn flex items-center gap-2 border-none bg-gray-100">
          <MdEdit />
          Edit
        </Button>
      </div>
      <div className="mt-3">
        {skills.length > 0 ? (
          <div className="flex flex-wrap items-center gap-4">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-2xl border border-purple-600 bg-purple-100 px-3 py-1 text-purple-600"
              >
                {skill}
              </span>
            ))}

            <Plus className="cursor-pointer text-purple-600" />
          </div>
        ) : (
          <EmptyState
            title="No skills added yet"
            desc="Showcase your technical skills to complete your profile."
            buttonText="Add Skills"
          />
        )}
      </div>
    </section>
  );
};

export default Skills;
