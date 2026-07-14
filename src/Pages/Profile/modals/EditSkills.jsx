import { Field, Form, Formik } from "formik";
import { Plus } from "lucide-react";
import SkillChip from "./SkillChip";
import { useContext } from "react";
import { ProfileContext } from "../../../Provider/ProfileProvider";

import { useUser } from "@clerk/react";

const EditSkills = ({ setOpen }) => {
  const { user } = useUser();
  const { editSkills } = useContext(ProfileContext);

  console.log(user.unsafeMetadata.skills);

  return (
    <Formik
      initialValues={{
        skill: "",
        skills: user.unsafeMetadata.skills ?? [],
      }}
      onSubmit={async (val) => {
        await editSkills(val);
        setOpen(false);
      }}
    >
      {({ values, setFieldValue }) => (
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
                onClick={() => {
                  const skill = values.skill.trim();

                  // Empty skill
                  if (!skill) return;

                  // Duplicate check (case insensitive)
                  if (
                    values.skills.some(
                      (s) => s.toLowerCase() === skill.toLowerCase(),
                    )
                  )
                    return;

                  // Max limit
                  if (values.skills.length >= 10) return;

                  setFieldValue("skills", [...values.skills, skill]);
                  setFieldValue("skill", "");
                }}
                type="button"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-700"
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
              {values.skills.length > 0
                ? values.skills.map((skill) => (
                    <SkillChip
                      key={skill}
                      skill={skill}
                      onRemove={() =>
                        setFieldValue(
                          "skills",
                          values.skills.filter((s) => s !== skill),
                        )
                      }
                    />
                  ))
                : "No skills added"}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
            <button
              onClick={() => setOpen(false)}
              type="button"
              className="cursor-pointer rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cursor-pointer rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
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
