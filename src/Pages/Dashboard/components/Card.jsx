import Dropdown from "../../../components/Layout/Dropdown";

const Card = ({ card }) => {
  const Icon = card.icon;
  const TrendIcon = card.arrowIcon;

  return (
    <div className="sections w-full">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div className={`rounded-full p-3 text-xl ${card.colorVariant}`}>
            <Icon />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm text-gray-500">{card.title}</p>
            <h2 className="text-xl font-bold sm:text-2xl">{card.count}</h2>
            <p className="text-sm text-gray-500">{card.shortDesc}</p>
          </div>
        </div>

        {/* 3 Dot Menu */}
        <Dropdown />
      </div>

      {/* Bottom */}
      <div className="mt-5 flex items-center gap-2 text-sm">
        <span
          className={`flex items-center gap-1 font-medium ${card.statusColor} `}
        >
          <TrendIcon />
          {card.percentage}
        </span>

        <span className="text-gray-500">from last week</span>
      </div>
    </div>
  );
};

export default Card;
