import Button from "../../../components/Layout/Button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { object, ref, string } from "yup";

const signupSchema = object({
  firstName: string().required("First Name is rquired"),
  lastName: string().required("Last Name is rquired too"),
  email: string()
    .email("please enter a valid email")
    .required("Email is required"),
  password: string()
    .min(8, "password must have atleast 8 characters")
    .required("Password is required"),
  repeatPassword: string()
    .required("please confirm your password")
    .oneOf([ref("password")], "password must match"),
});

const SignUpForm = ({ onSubmit, fetchStatus }) => {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to Dashboard
        </h1>
        <p className="mt-2 text-gray-600">Create your account</p>
      </div>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={signupSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-5">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-semibold text-gray-700"
            >
              First Name
            </label>
            <Field
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            />
            <ErrorMessage name="firstName">
              {(msg) => (
                <p className="mt-1 text-sm font-medium text-red-600">{msg}</p>
              )}
            </ErrorMessage>
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-semibold text-gray-700"
            >
              Last Name
            </label>
            <Field
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 transition-colors duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            />
            <ErrorMessage name="lastName">
              {(msg) => (
                <p className="mt-1 text-sm font-medium text-red-600">{msg}</p>
              )}
            </ErrorMessage>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>
            <Field
              id="email"
              name="email"
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
              id="password"
              name="password"
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
              id="repeatPassword"
              name="repeatPassword"
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
            {fetchStatus === "fetching" ? "Submitting.." : "Sign Up"}
          </Button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?
            <Link
              to="/sign-in"
              className="font-semibold text-purple-600 hover:text-purple-700"
            >
              Sign up
            </Link>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default SignUpForm;
