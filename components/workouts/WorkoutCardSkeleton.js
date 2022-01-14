import { ClockIcon, CalendarIcon, FireIcon } from "@heroicons/react/outline";

const WorkoutCardSkeleton = () => (
  <>
    <div className="flex flex-col justify-between rounded shadow-lg bg-white animate-pulse-sm">
      <div className="px-6 py-4">
        <div className="flex flex-row font-bold h-5 mb-3 bg-gray-200 animate-pulse w-32 rounded-md" />
        <div className="flex flex-row font-bold h-4 mb-2 bg-gray-200 animate-pulse w-full rounded-md" />
        <div className="flex flex-row font-bold h-4 mb-2 bg-gray-200 animate-pulse w-full rounded-md" />
        <div className="flex flex-row font-bold h-4 mb-2 bg-gray-200 animate-pulse w-full rounded-md" />
      </div>
      <div className="flex flex-row justify-evenly px-2 pt-4 pb-2 text-center text-white">
        <div className="flex items-center bg-[dodgerblue] rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          <ClockIcon
            className="flex-shrink-0 h-6 w-6 mr-1"
            aria-hidden="true"
          />{" "}
          <div className="inline-block h-4 bg-gray-200 w-8 animate-pulse rounded-md" />
        </div>
        <div className="flex items-center bg-[orangered] rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          <FireIcon className="flex-shrink-0 h-6 w-6 mr-1" aria-hidden="true" />{" "}
          <div className="inline-block h-4 bg-gray-300 w-8 animate-pulse rounded-md" />
        </div>
        <div className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          <CalendarIcon
            className="flex-shrink-0 h-6 w-6 mr-1"
            aria-hidden="true"
          />{" "}
          <div className="inline-block h-4 bg-gray-200 w-12 animate-pulse rounded-md" />
        </div>
      </div>
    </div>
  </>
);

export default WorkoutCardSkeleton;
