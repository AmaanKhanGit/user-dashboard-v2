import { useAuth, useSignUp } from "@clerk/react";
import Button from "../../../components/Layout/Button";
// import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
const Signin = () => {
  // const user = useAuth();
  // console.log(user);
  const { signUp } = useSignUp();
  console.log("Sign up here", signUp);

  const handleSubmit = async (val) => {
    const email = val.email;
    const password = val.password;
    try {
      await signUp.create({
        email,
        password,
      });

      // Send an email verification code automatically
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
    } catch (err) {
      console.error("Error during initial signup:", err.errors);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-50 to-white px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          // validationSchema={loginSchema}
          onSubmit={handleSubmit}
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

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full">
              Sign In
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?
              <a
                href="#"
                className="font-semibold text-purple-600 hover:text-purple-700"
              >
                Sign up
              </a>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Signin;
