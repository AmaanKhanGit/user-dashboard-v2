import { MdEdit } from "react-icons/md";
import Button from "../../../components/Layout/Button";
import { Plus } from "lucide-react";

const ProfileCards = ({ content }) => {
  //& Reusing one component for multiple profile sections.
  //& Future me agar complexity badhi to isko split kar sakte hain 😄

  return (
    <section className="sections flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">
          {content.title || content.socialLinks}
        </h2>

        <Button className="hollowBtn flex items-center gap-2 border-none bg-gray-100">
          <MdEdit />
          Edit
        </Button>
      </div>
      <div className="mt-3">
        {/*about section */}
        <p className="text-lg text-gray-600">{content?.about}</p>

        {/* skills sections */}
        <div className="flex flex-wrap items-center gap-4">
          {content?.skills?.map((skill) => (
            <span
              key={skill}
              className="rounded-2xl border border-purple-600 bg-purple-100 px-3 py-1 text-purple-600"
            >
              {skill}
            </span>
          ))}
          {content?.skills && (
            <Plus className="cursor-pointer text-purple-600" />
          )}
        </div>

        {/* Persional info section */}
        {content.details && (
          <div className="grid grid-cols-2 gap-3 p-2 max-md:flex max-md:flex-col">
            {content?.details?.map((info) => {
              const Icon = info.icon;
              return (
                <div key={info.title} className="flex gap-3">
                  <div className="self-start rounded-xl bg-gray-200 p-2 text-xl text-purple-600">
                    <Icon />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-medium text-gray-600">
                      {info.title}
                    </h2>
                    <h2 className="text-sm font-medium text-gray-600">
                      {info.desc}
                    </h2>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Security  & Social links &section */}

        {content.socialLinks && (
          <div className="flex flex-wrap justify-center gap-5">
            {content.links?.map((link) => {
              const Icon = link.icon;
              return (
                <div className="flex cursor-pointer items-center gap-2 rounded bg-gray-100 px-3 py-2 text-xl">
                  <Icon />
                  <p className="">{link.name} </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {content.security && (
        <div className="mt-3">
          <h2 className="text-xl font-bold">{content.security}</h2>
          <div className="flex justify-between">
            <div className="mt-4 flex flex-col px-2">
              <p className="text-lg font-medium">Password</p>
              <p className="text-lg font-medium">{content.password}</p>
            </div>
            <Button className="hollowBtn self-end">Change Password</Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileCards;
