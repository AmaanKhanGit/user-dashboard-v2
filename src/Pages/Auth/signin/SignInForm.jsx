import Button from "../../../components/Layout/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { object, string } from "yup";

const signInValidation = object({
  email: string()
    .email("please enter a valid email")
    .required("email is required"),
  password: string()
    .min(8, "password must have atleast 8 characters")
    .required("password is required"),
});

const SignInForm = ({ fetchStatus, onForgot }) => {
  // Uses AuthContext handlers for submit and forgot password.
  const { handleSignInSubmit, handleForgot } = useContext(AuthContext);

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
        <p className="mt-2 text-gray-600">
          Sign in to continue to your dashboard
        </p>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}

        validationSchema={signInValidation}
        onSubmit={handleSignInSubmit}
      >
        <Form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <Field
              disabled={fetchStatus === "fetching"}
              name="email"
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            />
            <ErrorMessage name="email">
              {(msg) => (
                <p className="mt-1 text-sm font-medium text-red-600">{msg}</p>
              )}
            </ErrorMessage>
          </div>

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

          <p
            onClick={onForgot ?? handleForgot}
            className="text-end text-sm font-semibold text-purple-600 hover:text-purple-700"
          >
            Forgot password?
          </p>

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
            {fetchStatus === "fetching" ? "Submitting.." : "Login"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?
            <Link
              to="/sign-up"
              className="font-semibold text-purple-600 hover:text-purple-700"
            >
              Sign up
            </Link>
          </p>
        </Form>
      </Formik>
    </>
  );
};

export default SignInForm;
