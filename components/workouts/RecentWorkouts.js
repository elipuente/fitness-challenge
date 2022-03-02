import useSWR from "swr";

import WorkoutCard from "./WorkoutCard";
import WorkoutCardSkeleton from "./WorkoutCardSkeleton";

import { fetcher } from "../../utils/fetcher";

const RecentWorkouts = ({ limit }) => {
  let workouts;
  const { data, error } = useSWR(
    `/api/workouts?user=all&limit=${limit}`,
    fetcher
  );

  if (!data) {
    return (
      <div className="grid grid-flow-col overflow-x-auto gap-4 py-6">
        {[...Array(limit)].map((index) => (
          <div className="w-96" key={index}>
            <WorkoutCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  if (error || data?.error) {
    return null;
  }

  workouts = data?.workouts.map((workout, index) => (
    <div
      className="md:w-96 h-[90%] md:h-full flex-shrink-0 snap-always snap-start md:snap-center"
      key={index}
    >
      <WorkoutCard
        workout={workout}
        user={workout.user}
        linkToWorkouts={true}
      />
    </div>
  ));

  return (
    <div className="snap-always snap-center snap-y scroll-p-8 max-h-screen grid-flow-row snap-mandatory flex flex-col gap-4 py-6 overflow-y-auto md:max-h-max md:grid md:snap-x md:grid-flow-col auto-rows-fr md:overflow-x-scroll">
      {workouts}
    </div>
  );
};

export default RecentWorkouts;
