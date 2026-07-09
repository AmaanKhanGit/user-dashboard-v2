import { MdEmail } from "react-icons/md";
import FormLayout from "../../../components/FormLayout";
import Button from "../../../components/Layout/Button";
import AuthCard from "../../../components/AuthCard";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { sendVarificationMail } from "../../../API/query/userQuery";
import { useEffect } from "react";
import toast from "react-hot-toast";

const RegisterEmailVarify = () => {
  const { email } = useParams();

  const { mutate } = useMutation({
    mutationKey: ["send-varifcation-mail"],
    mutationFn: sendVarificationMail,
    onSettled: (data) => {
      // console.log(data);
      const { previewUrl } = data;
      window.location.href = previewUrl;
    },
    onError: (error) => {
      toast.error(error.message);
    },
    enabled: !!email,
  });

  useEffect(() => {
    if (email) {
      mutate({ email });
    }
  }, [email, mutate]);

  const handleClick = () => {
    mutate(email);
  };

  return (
    <FormLayout className="bg-gray-100">
      <AuthCard className="w-125">
        <div className="flex flex-col items-center gap-3">
          <MdEmail className="text-5xl text-purple-800" />
          <h2 className="text-xl font-medium">Email Varification</h2>
          <p className="text-center text-gray-400">
            We have sent you an email verification to
            <span className="font-bold"> {email} </span> If you didn’t receive
            it, click the button below.
          </p>
        </div>
        <Button className="hollowBtn" onClick={handleClick}>
          Re-Send Email
        </Button>
      </AuthCard>
    </FormLayout>
  );
};

export default RegisterEmailVarify;
