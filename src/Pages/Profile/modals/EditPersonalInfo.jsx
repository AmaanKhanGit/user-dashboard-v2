import { Form, Formik } from "formik";
import {
  User,
  BriefcaseBusiness,
  Phone,
  Mail,
  MapPin,
  Globe,
} from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import FieldSet from "../components/FieldSet";
import { useContext } from "react";
import { ProfileContext } from "../../../Provider/ProfileProvider";
import { useUser } from "@clerk/react";

const EditPersonalInfo = ({ setOpen }) => {
  const { user } = useUser();
  const { editPersonalInfo } = useContext(ProfileContext);

  return (
    <Formik
      initialValues={{
        fullName: user.fullName,
        bio: user.unsafeMetadata.bio,
        profession: user.unsafeMetadata.profession,
        phone: user.phoneNumbers,
        email: user.emailAddresses,
        location: user.unsafeMetadata.location,
        website: user.unsafeMetadata.website,
        github: user.unsafeMetadata.github,
        linkedin: user.unsafeMetadata.linkedin,
        instagram: user.unsafeMetadata.instagram,
      }}
      onSubmit={async (val) => {
        await editPersonalInfo(val);
        setOpen(false);
      }}
    >
      <Form className="space-y-6">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FieldSet
            label="Full Name"
            name="fullName"
            icon={User}
            placeholder="Enter your full name"
          />
          <FieldSet
            label="Bio"
            name="bio"
            icon={BriefcaseBusiness}
            placeholder="Add a bio"
          />

          <FieldSet
            label="Profession"
            name="profession"
            icon={BriefcaseBusiness}
            placeholder="Frontend Developer"
          />

          <FieldSet
            label="Email"
            name="email"
            icon={Mail}
            placeholder="you@example.com"
            disabled
          />

          <FieldSet
            label="Location"
            name="location"
            icon={MapPin}
            placeholder="Raipur, India"
          />

          <FieldSet
            label="Website"
            name="website"
            icon={Globe}
            placeholder="https://yourwebsite.com"
          />

          <FieldSet
            label="GitHub"
            name="github"
            icon={FaGithub}
            placeholder="https://github.com/username"
          />

          <FieldSet
            label="LinkedIn"
            name="linkedin"
            icon={FaLinkedin}
            placeholder="https://linkedin.com/in/username"
          />

          <FieldSet
            label="Instagram"
            name="instagram"
            icon={FaInstagram}
            placeholder="https://instagram.com/username"
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
          <button
            onClick={() => setOpen(false)}
            type="button"
            className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-xl bg-violet-600 px-5 py-2.5 font-medium text-white transition hover:bg-violet-700"
          >
            Save Changes
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default EditPersonalInfo;
