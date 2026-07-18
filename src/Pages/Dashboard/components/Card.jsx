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
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-500">{card.title}</p>
            <h2 className="text-xl font-bold sm:text-2xl">{card.count}</h2>
            <p className="text-sm text-gray-500">{card.shortDesc}</p>
          </div>
        </div>

        {/* 3 Dot Menu */}
        {/* <Dropdown /> */}
      </div>
    </div>
  );
};

export default Card;
