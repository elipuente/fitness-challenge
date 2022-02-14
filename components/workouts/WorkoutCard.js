import { ClockIcon, FireIcon } from "@heroicons/react/outline";
import WorkoutLikes from "./WorkoutLikes";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });

const WorkoutCard = ({ workout, recentAdd }) => (
  <div className="flex flex-col justify-between rounded shadow-lg bg-white px-4 py-4">
    {recentAdd && (
      <span className="flex flex-row h-3 w-3 self-end -mt-5 -mr-5 absolute">
        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-emerald-400 opacity-75"></span>
        <span
          className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
          title="Recently added workout! 🎉"
        ></span>
      </span>
    )}
    <div>
      <div className="flex flex-row font-bold text-xl mb-2 justify-between items-center">
        <div className="font-bold text-xl">{workout.type} </div>
        <div className="font-medium text-base">{formatDate(workout.date)}</div>
      </div>
      <div className="flex flex-row pb-2 text-center text-white">
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
      </div>
      <p className="text-gray-700 text-base">{workout.description}</p>
    </div>
    <div className="mt-4">
      <WorkoutLikes
        totalLikes={workout.totalLikes}
        likes={workout.likes}
        workoutId={workout.id}
      />
    </div>
  </div>
);

export default WorkoutCard;
