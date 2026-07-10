import { useClerk, useSignUp } from "@clerk/react";
import { useState } from "react";
import VerifyEmail from "./VerifyEmail";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";

const Signup = () => {
  const { signUp, fetchStatus } = useSignUp();
  const navigate = useNavigate();

  const { setActive } = useClerk();

  const [showVerificationScreen, setShowVerificationScreen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const handleSignUpSubmit = async (val) => {
    const { firstName, lastName, email, password } = val;
    if (fetchStatus === "fetching") return;
    try {
      const { error } = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        password: password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      await signUp.verifications.sendEmailCode();

      setUserEmail(email);

      toast.success("Verification code sent to your email");

      setShowVerificationScreen(true);
    } catch (err) {
      console.log(err);
      console.log(err.errors);
      toast.error(err.errors?.[0]?.message || "Something went wrong");
    }
  };

  const handleVerifyEmailSubmit = async (values) => {
    try {
      await signUp.verifications.verifyEmailCode({
        code: values.code,
      });

      if (signUp.status === "complete") {
        const { error } = await signUp.finalize({
          // & the rest is setup for future me if I wanna add MFA
          navigate: ({ session }) => {
            if (session?.currentTask) {
              console.log(session.currentTask);
              return;
            }

            navigate("/");
          },
        });

        if (error) {
          toast.error(error.message);
          return;
        }

        toast.success("Account created successfully!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.errors?.[0]?.message || "Invalid verification code");
      console.error("Verification error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-purple-50 to-white px-4">
      {showVerificationScreen ? (
        <VerifyEmail
          email={userEmail}
          onSubmit={handleVerifyEmailSubmit}
          onBackClick={() => {
            setShowVerificationScreen(false);
            setUserEmail("");
          }}
        />
      ) : (
        <SignUpForm fetchStatus={fetchStatus} onSubmit={handleSignUpSubmit} />
      )}
    </div>
  );
};

export default Signup;
