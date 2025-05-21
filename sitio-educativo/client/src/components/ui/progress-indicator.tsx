import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  value: number;
  className?: string;
}

const ProgressIndicator = ({ value, className }: ProgressIndicatorProps) => {
  const getProgressColor = (percentage: number) => {
    if (percentage < 25) return "bg-red-500";
    if (percentage < 50) return "bg-yellow-500";
    if (percentage < 75) return "bg-blue-500";
    return "bg-green-500";
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium">Progress</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-2.5 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className={`h-2.5 rounded-full ${getProgressColor(value)}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
