import { ClockIcon, CalendarIcon, FireIcon } from "@heroicons/react/outline";

const formatDate = (date) => new Date(date).toLocaleDateString("en-US");

const WorkoutCard = ({ workout, recentAdd }) => (
  <>
    <div className="flex flex-col justify-between rounded shadow-lg bg-white">
      {recentAdd && (
        <span className="flex flex-row h-3 w-3 self-end -mt-1 -mr-1 absolute">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
      )}
      <div className="px-6 py-4">
        <div className="flex flex-row font-bold text-xl mb-2">
          {workout.type}{" "}
        </div>
        <p className="text-gray-700 text-base">{workout.description}</p>
      </div>
      <div className="flex flex-row justify-evenly px-2 pt-4 pb-2 text-center text-white">
        <div className="flex items-center bg-[dodgerblue] rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          <ClockIcon
            className="flex-shrink-0 h-6 w-6 mr-1"
            aria-hidden="true"
          />{" "}
          {workout.minutes}
        </div>
        <div className="flex items-center bg-[orangered] rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          <FireIcon className="flex-shrink-0 h-6 w-6 mr-1" aria-hidden="true" />{" "}
          {workout.score}
        </div>
        <div className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
          <CalendarIcon
            className="flex-shrink-0 h-6 w-6 mr-1"
            aria-hidden="true"
          />{" "}
          {formatDate(workout.date)}
        </div>
      </div>
    </div>
  </>
);

export default WorkoutCard;
