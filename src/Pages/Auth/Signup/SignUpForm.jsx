import { AuthContext } from "../../../Provider/AuthProvider";
import Button from "../../../components/Layout/Button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { object, ref, string } from "yup";

const signupValidation = object({
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required too"),
  email: string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: string()
    .min(8, "Password must have at least 8 characters")
    .required("Password is required"),
  repeatPassword: string()
    .required("Please confirm your password")
    .oneOf([ref("password")], "Passwords must match"),
});

const SignUpForm = ({ fetchStatus }) => {
  const { handleSignUpSubmit } = useContext(AuthContext);

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-900">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Welcome to Dashboard
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Create your account
        </p>
      </div>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={signupValidation}
        onSubmit={handleSignUpSubmit}
      >
        <Form className="space-y-5">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              First Name
            </label>
            <Field
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              disabled={fetchStatus === "fetching"}
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
            />
            <ErrorMessage name="firstName">
              {(msg) => (
                <p className="mt-1 text-sm font-medium text-red-600">{msg}</p>
              )}
            </ErrorMessage>
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Last Name
            </label>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              disabled={fetchStatus === "fetching"}
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
            />
            <ErrorMessage name="lastName">
              {(msg) => (
                <p className="mt-1 text-sm font-medium text-red-600">{msg}</p>
              )}
            </ErrorMessage>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              disabled={fetchStatus === "fetching"}
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
            />
            <ErrorMessage name="email">
              {(msg) => (
                <p className="mt-1 text-sm font-medium text-red-600">{msg}</p>
              )}
            </ErrorMessage>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={fetchStatus === "fetching"}
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500"
            />
            <ErrorMessage name="password">
              {(msg) => (
                <p className="mt-1 text-sm font-medium text-red-600">{msg}</p>
              )}
            </ErrorMessage>
          </div>

          {/* Repeat Password */}
          <div>
            <label
              htmlFor="repeatPassword"
              className="block text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              Repeat Password
            </label>
            <Field
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={fetchStatus === "fetching"}
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
            data-cl-theme={
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
            }
            data-cl-size="flexible"
            data-cl-language="es-ES"
          />

          {/* Submit Button */}
          <Button
            disabled={fetchStatus === "fetching"}
            type="submit"
            className="w-full"
          >
            {fetchStatus === "fetching" ? "Submitting.." : "Sign Up"}
          </Button>

          {/* Link to Sign In */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="font-semibold text-purple-600 hover:text-purple-700"
            >
              Sign in
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpForm;
