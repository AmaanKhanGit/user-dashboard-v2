import Button from "../../../components/Layout/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { object, string, ref } from "yup";
import FormLayout from "../../../components/FormLayout";
import AuthCard from "../../../components/AuthCard";
import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";

const signInValidation = object({
  password: string()
    .min(8, "password must have atleast 8 characters")
    .required("password is required"),
  repeatPassword: string()
    .oneOf([ref("password")], "password must match ")
    .required("please confirm your password"),
});

const ResetPassword = () => {
  // AuthContext: use the password-reset handler from context here.
  const { handleResetPassword, signInFetchStatus } = useContext(AuthContext);

  return (
    <FormLayout>
      <AuthCard className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Reset password
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
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
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <Field
                disabled={signInFetchStatus === "fetching"}
                name="password"
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
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
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Repeat Password
              </label>
              <Field
                disabled={signInFetchStatus === "fetching"}
                name="repeatPassword"
                id="repeatPassword"
                type="password"
                placeholder="••••••••"
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
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
              disabled={signInFetchStatus === "fetching"}
              type="submit"
              className="w-full"
            >
              {signInFetchStatus === "fetching"
                ? "Submitting.."
                : "Reset Password"}
            </Button>
          </Form>
        </Formik>
      </AuthCard>
    </FormLayout>
  );
};

export default ResetPassword;
