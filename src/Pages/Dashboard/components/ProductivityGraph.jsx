import Button from "../../../components/Layout/Button";

const ProductivityGraph = () => {
  return (
    <section className="sections flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="section-heading">Productivity Overview</h2>
        {/* <Button className="hollowBtn lg:px-1.5">This Week</Button>
        thi will be a dropdown */}
      </div>
      <div className="">
        <img className="w-full" src="/graphWithBackground.png" alt="" />
      </div>
      <div className="flex justify-center rounded-xl bg-gray-100 p-4 text-sm text-gray-400">
        Great job! Your productivity is higher than last week
      </div>
    </section>
  );
};

export default ProductivityGraph;
