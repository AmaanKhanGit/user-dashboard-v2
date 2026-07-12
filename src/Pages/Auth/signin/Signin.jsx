import { useNavigate } from "react-router-dom";
import FormLayout from "../../../components/FormLayout";
import AuthCard from "../../../components/AuthCard";
import { useSignIn } from "@clerk/react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import VerifyEmail from "../components/VerifyEmail";
import SignInForm from "./SignInForm";
import SocialLogins from "../components/SocialLogins";

const Signin = () => {
  const { signIn, fetchStatus } = useSignIn();
  const [verified, setVarifying] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

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
        await signIn.finalize();
        navigate("/");
        toast.success("Welcome to dashboard");
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
          <SignInForm
            onSubmit={handleSignIn}
            onForgot={handleForgot}
            fetchStatus={fetchStatus}
          />
        )}
        <SocialLogins />
      </AuthCard>
    </FormLayout>
  );
};

export default Signin;
