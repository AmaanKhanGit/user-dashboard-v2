import { useSignIn } from "@clerk/react";
import Button from "../../../components/Layout/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string, ref } from "yup";
import FormLayout from "../../../components/FormLayout";
import AuthCard from "../../../components/AuthCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const signInValidation = object({
  password: string()
    .min(8, "password must have atleast 8 characters")
    .required("password is required"),
  repeatPassword: string()
    .oneOf([ref("password")], "password must match ")
    .required("please confirm your password"),
});

const ResetPassword = () => {
  const { signIn, fetchStatus } = useSignIn();
  const navigate = useNavigate();

  const handleResetPassword = async ({ password }) => {
    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password: password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (signIn.status === "complete") {
      const { error } = await signIn.finalize();

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password reset successfully ,Welcome!");

      navigate("/");
    }
  };

  return (
    <FormLayout>
      <AuthCard className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Reset password</h1>
          <p className="mt-2 text-gray-600">
            Reset your password to access your account
          </p>
        </div>
        <Formik
          initialValues={{
            password: "",
            repeatPassword: "",
          }}

          validationSchema={signInValidation}
          onSubmit={handleResetPassword}
        >
          <Form className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <Field
                disabled={fetchStatus === "fetching"}
                name="password"
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
              />
              <ErrorMessage name="password">
                {(msg) => (
                  <p className="mt-1 text-sm font-medium text-red-600">{msg}</p>
                )}
              </ErrorMessage>
            </div>

            <div>
              <label
                htmlFor="repeatPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                Repeat Password
              </label>
              <Field
                disabled={fetchStatus === "fetching"}
                name="repeatPassword"
                id="repeatPassword"
                type="password"
                placeholder="••••••••"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
              />
              <ErrorMessage name="repeatPassword">
                {(msg) => (
                  <p className="mt-1 text-sm font-medium text-red-600">{msg}</p>
                )}
              </ErrorMessage>
            </div>

            {/* clerk captcha widget */}
            <div
              id="clerk-captcha"
              data-cl-theme="light"
              data-cl-size="flexible"
              data-cl-language="es-ES"
            />

            <Button
              disabled={fetchStatus === "fetching"}
              type="submit"
              className="w-full"
            >
              {fetchStatus === "fetching" ? "Submitting.." : "Reset Password"}
            </Button>
          </Form>
        </Formik>
      </AuthCard>
    </FormLayout>
  );
};

export default ResetPassword;
