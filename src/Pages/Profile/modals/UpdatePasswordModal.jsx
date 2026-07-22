import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Button from "../../../components/Layout/Button";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords do not match")
    .required("Confirm your password"),
});

const UpdatePasswordModal = ({ open, setOpen, onSubmit, className }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div
        className={`w-full max-w-md rounded-xl bg-white p-6 shadow-xl ${className}`}
      >
        <h2 className="text-xl font-semibold">Update Password</h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter your current password and choose a new one.
        </p>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
            signOutOfOtherSessions: false,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            try {
              await onSubmit(values);

              toast.success("Password updated successfully!");
              actions.resetForm();
              setOpen(false);
            } catch (err) {
              console.log(err);
              toast.error(
                err.errors?.[0]?.longMessage || "Failed to update password.",
              );
            }
          }}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">
                  Current Password
                </label>

                <Field
                  name="currentPassword"
                  type="password"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
                />

                {touched.currentPassword && errors.currentPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.currentPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  New Password
                </label>

                <Field
                  name="newPassword"
                  type="password"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
                />

                {touched.newPassword && errors.newPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Confirm Password
                </label>

                <Field
                  name="confirmPassword"
                  type="password"
                  className="w-full rounded-lg border px-3 py-2 outline-none focus:ring"
                />

                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <label className="flex cursor-pointer items-center gap-3">
                <Field
                  type="checkbox"
                  name="signOutOfOtherSessions"
                  className="size-4"
                />

                <span className="text-sm">Log out from all other devices</span>
              </label>

              <div className="flex justify-end gap-3 pt-3">
                <Button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="hollowBtn"
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  Update Password
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdatePasswordModal;
