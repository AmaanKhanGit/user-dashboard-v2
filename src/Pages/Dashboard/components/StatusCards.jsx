import Card from "./Card";

import { CgNotes } from "react-icons/cg";

import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaRegCircleCheck,
} from "react-icons/fa6";
import { GoStopwatch } from "react-icons/go";
const StatusCards = ({ className }) => {
  const colorVariants = {
    purpleVar: "bg-purple-100 text-purple-800",
    greenVar: "bg-green-100 text-green-800",
    oragneVar: "bg-orange-100 text-orange-800",
  };

  const cardData = [
    {
      title: "Total Tasks",
      count: 128,
      shotDesc: "All time tasks",
      percentage: 12.5,
      icon: CgNotes,
      arrowIcon: FaArrowTrendUp,
      colorVariant: colorVariants.purpleVar,
      statusColor: "text-green-600",
    },
    {
      title: "Completed",
      count: 89,
      shotDesc: "Tasks completed",
      percentage: 18.2,
      icon: FaRegCircleCheck,
      arrowIcon: FaArrowTrendUp,
      colorVariant: colorVariants.greenVar,
      statusColor: "text-green-600",
    },
    {
      title: "Pending",
      count: 39,
      shotDesc: "Tasks pending",
      percentage: 8.1,
      icon: GoStopwatch,
      arrowIcon: FaArrowTrendDown,
      colorVariant: colorVariants.oragneVar,
      statusColor: "text-red-600",
    },
    {
      title: "Productiviy",
      count: 78,
      shotDesc: "This week",
      percentage: 14.3,
      icon: FaArrowTrendUp,
      arrowIcon: FaArrowTrendUp,
      colorVariant: colorVariants.purpleVar,
      statusColor: "text-green-600",
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
