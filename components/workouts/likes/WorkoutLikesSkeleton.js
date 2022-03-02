import { HeartIcon } from "@heroicons/react/outline";

const WorkoutLikesSkeleton = () => (
  <div className="flex flex-row items-center animate-pulse">
    <HeartIcon className="flex-shrink-0 h-6 w-6 mr-1" />
    <div className="flex flex-row font-bold h-5 bg-gray-200 animate-pulse w-64 rounded-md" />
  </div>
);

export default WorkoutLikesSkeleton;
