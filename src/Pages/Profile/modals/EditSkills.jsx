import { Field, Form, Formik } from "formik";
import { Plus } from "lucide-react";
import SkillChip from "./SkillChip";

const EditSkills = ({ setOpen }) => {
  return (
    <Formik
      initialValues={{
        skill: "",
        skills: ["React", "Firebase", "Tailwind CSS", "JavaScript"],
      }}
      onSubmit={() => {}}
    >
      {({ values }) => (
        <Form className="space-y-6">
          {/* Add Skill */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Add Skill
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Field
                name="skill"
                placeholder="e.g. React, Node.js, Figma"
                className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm transition outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
              >
                <Plus size={18} />
                Add Skill
              </button>
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-gray-700">
              Your Skills
            </h3>

            <div className="flex flex-wrap gap-3">
              {values.skills.map((skill) => (
                <SkillChip key={skill} skill={skill} />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              Save Changes
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditSkills;
