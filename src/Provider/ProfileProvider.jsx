import { useUser } from "@clerk/react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const { user } = useUser();

  const editPersonalInfo = async ({
    fullName,
    phone,
    bio,
    profession,
    location,
    website,
    github,
    linkedin,
    instagram,
  }) => {
    try {
      const fullNameArr = fullName.split(" ");
      await user.update({
        firstName: fullNameArr[0],
        lastName: fullNameArr[1],
      });

      // & I have to perform a verification so for now I'll not add thisand why to add a phone number huh
      // & await user.createPhoneNumber({ phoneNumber: phone });

      await user.updateMetadata({
        unsafeMetadata: {
          bio,
          profession,
          location,
          website,
          github,
          linkedin,
          instagram,
        },
      });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const editAbout = async ({ about }) => {
    try {
      await user.updateMetadata({
        unsafeMetadata: {
          about: about,
        },
      });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const editSkills = async ({ skills }) => {
    try {
      await user.updateMetadata({
        unsafeMetadata: {
          skills: skills,
        },
      });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ editAbout, editPersonalInfo, editSkills }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
