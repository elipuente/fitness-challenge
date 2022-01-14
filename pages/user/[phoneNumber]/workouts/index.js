import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

import Container from "../../../../components/Container";
import Errors from "../../../../components/Errors";
import WorkoutCard from "../../../../components/workouts/WorkoutCard";
import WorkoutCardSkeleton from "../../../../components/workouts/WorkoutCardSkeleton";
import WorkoutError from "../../../../components/workouts/WorkoutError";
import { fetcher } from "../../../../utils/fetcher";
import { useUser } from "../../../../utils/user";

const Workouts = () => {
  const router = useRouter();
  const { phoneNumber, addedWorkout } = router.query;
  const { user, signedIn } = useUser();

  const { data, error } = useSWR(`/api/workouts?user=${phoneNumber}`, fetcher);

  if (!data) {
    return (
      <Container title={`Loading Workouts`}>
        <div className="flex flex-col justify-center mt-10 px-4 sm:mt-12 sm:px-6 lg:mt-20 lg:px-8 my-6 mb-56 h-auto">
          <div className="text-left justify-start">
            <h1 className="font-extrabold text-emerald-600 text-5xl tracking-tight block xl:inline sm:text-6xl md:text-7xl">
              {isSignedInUser ? (
                "Your"
              ) : (
                <div className="inline-block h-10 md:h-14 bg-gray-300 w-56 animate-pulse rounded-lg"></div>
              )}{" "}
              Workouts
            </h1>
            <h1 className="font-extrabold block text-2xl md:text-3xl text-gray-900">
              Current Score:{" "}
              <div className="inline-block h-8 md:h-10 bg-gray-300 w-14 animate-pulse rounded-lg align-bottom"></div>
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
              {[...Array(8)].map((_, index) => (
                <WorkoutCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    );
  }

  if (error) {
    return <Errors path={router.asPath} />;
  }

  if (data.error) {
    return <WorkoutError error={data.message} />;
  }

  const isSignedInUser = signedIn && phoneNumber === user.phoneNumber;

  const { firstName, totalScore, workouts } = data;

  return (
    <Container title={`${firstName}'s Workouts`}>
      <div className="flex flex-col justify-center mt-10 px-4 sm:mt-12 sm:px-6 lg:mt-20 lg:px-8 my-6 mb-56 h-auto">
        <div className="text-left justify-start">
          <h1 className="font-extrabold text-emerald-600 text-5xl tracking-tight block xl:inline sm:text-6xl md:text-7xl">
            {isSignedInUser ? "Your" : `${firstName}'s`} Workouts
          </h1>
          <h1 className="font-extrabold block text-2xl md:text-3xl text-gray-900">
            Current Score: {totalScore}
          </h1>
          {workouts.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
              {workouts.map((workout, index) => (
                <WorkoutCard
                  workout={workout}
                  recentAdd={Number(addedWorkout) === workout.id}
                  key={index}
                />
              ))}
            </div>
          ) : isSignedInUser ? (
            <p className="mt-6">
              You don&apos;t have any workouts yet. Get started by{" "}
              <Link href={`/user/${phoneNumber}/workouts/add`}>
                <a className="text-emerald-600">adding a workout</a>
              </Link>
              .
            </p>
          ) : (
            <p className="mt-6">
              {firstName} doesn&apos;t have any workouts yet.
            </p>
          )}
        </div>
      </div>
    </Container>
  );
};

export default Workouts;
