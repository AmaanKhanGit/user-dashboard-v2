import Button from "../../../components/Layout/Button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { object, string } from "yup";
import { Mail } from "lucide-react";
import { useSignUp } from "@clerk/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyEmail = ({ email, onSubmit, onBackClick }) => {
  const { signUp } = useSignUp();
  const [timer, setTimer] = useState(0);

  const verificationSchema = object({
    code: string()
      .required("Verification code is required")
      .min(6, "Code must be 6 digits")
      .max(6, "Code must be 6 digits")
      .matches(/^\d+$/, "Code must contain only numbers"),
  });

  const handleResend = async () => {
    const { error } = await signUp.verifications.sendEmailCode();
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
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-8 flex justify-center">
        <Mail className="h-12 w-12 text-purple-600" />
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
        <p className="mt-2 text-sm text-gray-600">
          We sent a verification code to{" "}
          <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      <Formik
        initialValues={{
          code: "",
        }}
        validationSchema={verificationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="code"
                className="block text-sm font-semibold text-gray-700"
              >
                Verification Code
              </label>
              <Field
                type="text"
                id="code"
                name="code"
                placeholder="000000"
                maxLength={6}
                inputMode="numeric"
                className={`mt-2 w-full rounded-lg border-2 bg-gray-50 px-4 py-3 text-center text-2xl font-bold tracking-widest text-gray-900 placeholder-gray-400 transition-colors ${
                  errors.code && touched.code
                    ? "border-red-500 focus:border-red-500 focus:bg-red-50 focus:outline-none"
                    : "border-gray-200 focus:border-purple-500 focus:bg-white focus:outline-none"
                }`}
              />
              {errors.code && touched.code && (
                <div className="mt-2 text-sm text-red-600">
                  <ErrorMessage name="code" />
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-linear-to-r from-purple-600 to-purple-700 py-3 font-semibold text-white hover:from-purple-700 hover:to-purple-800 disabled:opacity-50"
            >
              {isSubmitting ? "Verifying..." : "Verify Email"}
            </Button>
          </Form>
        )}
      </Formik>

      <div className="mt-6 border-t border-gray-200 pt-6">
        <button
          onClick={handleResend}
          type="button"
          disabled={timer > 0}
          className="w-full cursor-pointer text-center text-sm font-semibold text-purple-600 outline-none hover:text-purple-700"
        >
          {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
        </button>
      </div>

      {onBackClick && (
        <button
          onClick={onBackClick}
          className="mt-4 w-full text-center text-sm text-gray-600 hover:text-gray-900"
        >
          Back to Sign Up
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;
