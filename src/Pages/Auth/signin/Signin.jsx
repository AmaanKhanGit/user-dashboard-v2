import Button from "../../../components/Layout/Button";
import FormLayout from "../../../components/FormLayout";
import AuthCard from "../../../components/AuthCard";
import Loading from "../../../components/Layout/Loading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useSignIn } from "@clerk/react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import VerifyEmail from "../components/VerifyEmail";

const signInValidation = object({
  email: string()
    .email("please enter a valid email")
    .required("email is required"),
  password: string()
    .min(8, "password must have atleast 8 characters")
    .required("password is required"),
});

const Signin = () => {
  const { signIn, fetchStatus } = useSignIn();
  const [verified, setVarifying] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  console.log(signIn);

  const handleSignIn = async (val) => {
    const { email, password } = val;
    try {
      const { error } = await signIn.password({
        emailAddress: email,
        password: password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }
      if (signIn.status === "complete") {
        signIn.finalize();
        toast.success("Welcome to dashboard");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgot = async () => {
    try {
      const { error } = await signIn.resetPasswordEmailCode.sendCode();
      if (error) {
        toast.error(error.message);
        return;
      }

      setVarifying(true);
    } catch (error) {
      console.log(error);
      toast.error("Can not reset password without sign in attempt");
    }
  };

  const handleVerify = async ({ code }) => {
    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code: code,
    });

    if (error) {
      toast.error(toast.error);
      return;
    }

    console.log("code submitted successfylly");

    navigate("/reset-password");
  };

  const handleResend = async () => {
    const { error } = await signIn.resetPasswordEmailCode.sendCode();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Verification code sent again!");
    setTimer(30);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer === 0) {
        return;
      }
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <FormLayout>
      <AuthCard className="w-full max-w-md">
        {verified ? (
          <VerifyEmail onResend={handleResend} onSubmit={handleVerify} />
        ) : (
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
              onSubmit={handleSignIn}
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
                      <p className="mt-1 text-sm font-medium text-red-600">
                        {msg}
                      </p>
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
                      <p className="mt-1 text-sm font-medium text-red-600">
                        {msg}
                      </p>
                    )}
                  </ErrorMessage>
                </div>

                <p
                  onClick={handleForgot}
                  className="text-end text-sm text-gray-600"
                >
                  <Link
                    // to="/forgot-password"
                    className="font-semibold text-purple-600 hover:text-purple-700"
                  >
                    Forgot password?
                  </Link>
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
        )}
      </AuthCard>
    </FormLayout>
  );
};

export default Signin;
