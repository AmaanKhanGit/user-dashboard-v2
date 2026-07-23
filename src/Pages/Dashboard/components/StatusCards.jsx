import { useQuery } from "@tanstack/react-query";
import Card from "./Card";
import { CgNotes } from "react-icons/cg";
import { getTasks } from "../../../services/queryService";

import { FaArrowTrendUp, FaRegCircleCheck } from "react-icons/fa6";
import { GoStopwatch } from "react-icons/go";
import { useUser } from "@clerk/react";
const StatusCards = ({ className }) => {
  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ["tasks", user?.id],
    queryFn: () => getTasks(user.id),
    enabled: !!user?.id,
    staleTime: 60_000,
  });

  let total = 0;
  let completed = 0;
  let pending = 0;
  let productivity = 0;

  if (data) {
    total = data.length;
    completed = data.filter((i) => i.completed).length;
    pending = total - completed;
    productivity = total === 0 ? 0 : Math.round((completed / total) * 100);
  }

  const colorVariants = {
    purpleVar:
      "bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300",
    greenVar:
      "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300",
    oragneVar:
      "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300",
  };

  const cardData = [
    {
      title: "Total Tasks",
      count: total,
      shortDesc: "All time tasks",
      icon: CgNotes,
      colorVariant: colorVariants.purpleVar,
    },
    {
      title: "Completed",
      count: completed,
      shortDesc: "Tasks completed",
      icon: FaRegCircleCheck,
      colorVariant: colorVariants.greenVar,
    },
    {
      title: "Pending",
      count: pending,
      shortDesc: "Tasks pending",
      icon: GoStopwatch,
      colorVariant: colorVariants.oragneVar,
    },
    {
      title: "Productiviy",
      count: `${productivity} %`,
      shortDesc: "This week",
      icon: FaArrowTrendUp,
      colorVariant: colorVariants.purpleVar,
    },
  ];

  return (
    <section
      className={`flex flex-wrap items-center justify-center gap-3 bg-transparent sm:grid sm:grid-cols-2 xl:auto-cols-auto ${className}`}
    >
      {cardData.map((card) => (
        <Card card={card} key={card.title} />
      ))}
    </section>
  );
};

export default StatusCards;
