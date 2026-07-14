import { useUser } from "@clerk/react";
import { ProfileContext } from "../../../Provider/ProfileProvider";
import { Form, Formik, Field } from "formik";
import { useContext } from "react";

const EditAbout = ({ setOpen }) => {
  const { user } = useUser();

  const { editAbout } = useContext(ProfileContext);

  return (
    <Formik
      initialValues={{
        about: user.unsafeMetadata.about,
      }}
      onSubmit={editAbout}
    >
      {({ values }) => (
        <Form className="space-y-6">
          <div>
            <label
              htmlFor="about"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              About
            </label>

            <Field
              as="textarea"
              id="about"
              name="about"
              rows={6}
              maxLength={220}
              placeholder="Tell people a little about yourself..."
              className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-700 transition outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
            />

            <div className="mt-2 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Write a short bio that appears on your profile.
              </p>

              <span className="text-xs font-medium text-gray-500">
                {values.about.length}/220
              </span>
            </div>
          </div>

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

export default EditAbout;
