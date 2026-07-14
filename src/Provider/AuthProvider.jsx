import { useSignIn, useSignUp, useAuth } from "@clerk/react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const { signIn, fetchStatus: signInFetchStatus } = useSignIn();
  const { signUp, fetchStatus: signUpFetchStatus } = useSignUp();
  const [timer, setTimer] = useState(0);
  const [userEmail, setUserEmail] = useState("");
  const [showVerificationScreen, setShowVerificationScreen] = useState(false);
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignInSubmit = async (val) => {
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
      // Sign-in verification UI is managed by the Signin page itself.
    } catch (error) {
      console.log(error);
      toast.error("Can not reset password without sign in attempt");
    }
  };

  const handleSignInVerify = async ({ code }) => {
    const { error } = await signIn.resetPasswordEmailCode.verifyCode({
      code: code,
    });

    if (error) {
      toast.error(error.message || "Verification failed");
      return;
    }

    navigate("/reset-password");
  };

  const handleSignInResend = async () => {
    const { error } = await signIn.resetPasswordEmailCode.sendCode();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Verification code sent again!");
    setTimer(30);
  };

  const handleResetPassword = async ({ password }) => {
    const { error } = await signIn.resetPasswordEmailCode.submitPassword({
      password: password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (signIn.status === "complete") {
      const { error } = await signIn.finalize();

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password reset successfully ,Welcome!");

      navigate("/");
    }
  };

  const handleSocialLogin = async (appName) => {
    const { error } = await signIn.sso({
      strategy: appName,
      redirectCallbackUrl: "/sso-callback",
      redirectUrl: "/",
    });

    if (error) {
      toast.error(error.message);
      return;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/sign-in");
    } catch (err) {
      console.error(err);
      toast.error("Logout failed");
    }
  };

  const handleSignUpSubmit = async (val) => {
    const { firstName, lastName, email, password } = val;
    if (signUpFetchStatus === "fetching") return;
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

  // & verify the code for signup
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

  // & handle code resend

  const handleSignUpResend = async () => {
    const { error } = await signUp.verifications.sendEmailCode();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Verification code sent again!");
    setTimer(30);
  };

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <AuthContext.Provider
      value={{
        handleSignInSubmit,
        handleForgot,
        handleSignInResend,
        handleSignInVerify,
        handleResetPassword,
        handleSocialLogin,
        handleSignUpSubmit,
        handleVerifyEmailSubmit,
        handleSignUpResend,
        signInFetchStatus,
        signUpFetchStatus,
        showVerificationScreen,
        userEmail,
        timer,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
