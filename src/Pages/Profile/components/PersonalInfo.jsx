import { MdEdit } from "react-icons/md";

const PersonalInfo = () => {
  details = [
    {
      icon: FaRegUser,
      title: "Full Name",
      desc: "John Doe",
    },
    {
      icon: IoMailOutline,
      title: "Email",
      desc: "john@example.com",
    },
    {
      icon: BsTelephone,
      title: "Phone",
      desc: "+91 123 456",
    },

    {
      icon: FiLink,
      title: "Website",
      desc: "https://johndoe.dev",
    },
    {
      icon: IoLocationOutline,
      title: "Location",
      desc: "New Delhi, India",
    },
    ,
    {
      icon: SlCalender,
      title: "Joined",
      desc: "July 2026",
    },
  ];
  return (
    <section className="sections flex flex-col gap-2">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold"> Personal Information</h2>
        <Button className="hollowBtn flex items-center gap-2 border-none bg-gray-100">
          <MdEdit />
          Edit
        </Button>
      </div>
      <div className="mt-3">
        <div className="grid grid-cols-2 gap-3 p-2 max-md:flex max-md:flex-col">
          {details.map((info) => {
            const Icon = info.icon;
            return (
              <div key={info.title} className="flex gap-3">
                <div className="self-start rounded-xl bg-gray-200 p-2 text-xl text-purple-600">
                  <Icon />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-600">
                    {info.title}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    {info.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;
