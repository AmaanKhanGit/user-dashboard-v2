import SSOCallbackLoading from "../../components/Layout/SSOCallbackLoading";
import { AuthenticateWithRedirectCallback } from "@clerk/react";

const SSOCallback = () => {
  return (
    <>
      <SSOCallbackLoading />
      <AuthenticateWithRedirectCallback />
    </>
  );
};

export default SSOCallback;
