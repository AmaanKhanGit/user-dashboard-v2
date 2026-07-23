import FormLayout from "../../../components/FormLayout";
import AuthCard from "../../../components/AuthCard";
import { useSignIn } from "@clerk/react";
import { useContext, useEffect, useState } from "react";
import VerifyEmail from "../components/VerifyEmail";
import SignInForm from "./SignInForm";
import SocialLogins from "../components/SocialLogins";
import { AuthContext } from "../../../Provider/AuthProvider";

const Signin = () => {
  const { fetchStatus } = useSignIn();
  const [verified, setVarifying] = useState(false);

  const [timer, setTimer] = useState(0);

  // AuthContext: wire the sign-in handlers here and pass them into the form/verification UI.
  const { handleSignInVerify, handleSignInResend, handleForgot } =
    useContext(AuthContext);

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
          <VerifyEmail
            onSubmit={handleSignInVerify}
            onResend={handleSignInResend}
          />
        ) : (
          <SignInForm
            fetchStatus={fetchStatus}
            onForgot={async () => {
              await handleForgot();
              setVarifying(true);
            }}
          />
        )}
        <SocialLogins />
      </AuthCard>
    </FormLayout>
  );
};

export default Signin;
