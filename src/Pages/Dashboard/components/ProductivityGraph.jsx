import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../../services/queryService";
import { useUser } from "@clerk/react";
import toast from "react-hot-toast";
import WorkspaceLoading from "../../../Pages/Wrokspace/component/WorkspaceLoading";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useMemo } from "react";

const ProductivityGraph = ({ className }) => {
  const { user } = useUser();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["productivity-graph", user?.id],
    queryFn: () => getTasks(user.id),
    enabled: !!user.id,
  });

  const chartData = useMemo(() => {
    const chartData = [];
    const today = new Date();

    const formatDate = (date) =>
      date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      chartData.push({
        date: formatDate(date),
        completed: 0,
      });
    }

    if (data) {
      data.forEach((el) => {
        if (el.completedAt) {
          const taskDate = formatDate(el.completedAt.toDate());
          const chartPoint = chartData.find((item) => item.date === taskDate);

          if (chartPoint) {
            chartPoint.completed++;
          }
        }
      });
    }

    return chartData;
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError]);

  if (isLoading) {
    return (
      <section
        className={`sections flex flex-col items-center justify-center gap-4`}
      >
        <WorkspaceLoading />
      </section>
    );
  }

  return (
    <section
      className={`sections flex flex-col justify-between gap-5 ${className}`}
    >
      <div className="flex items-center justify-between">
        <h2 className="section-heading">Productivity Overview</h2>
        {/* Future dropdown */}
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 12, fill: "#6B7280" }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="completed"
              stroke="#9810fa" // tumhara maroon
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-gray-50 px-4 py-3 text-center text-sm text-gray-500 dark:bg-gray-900 dark:text-gray-400">
        Great job! Your productivity is higher than last week.
      </div>
    </section>
  );
};

export default ProductivityGraph;
