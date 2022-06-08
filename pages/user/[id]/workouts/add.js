import { useRouter } from "next/router";

import Container from "../../../../components/Container";
import AddWorkoutForm from "../../../../components/workouts/add-workout/AddWorkoutForm";
import { useUser } from "../../../../utils/user";

const getSessionTwoEnd = () =>
  Math.ceil(
    (new Date(2022, 5, 14).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  ).toString();

const Add = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, signedIn } = useUser();

  const sessionTwoEnd = getSessionTwoEnd();

  if (!signedIn) {
    router.push("/401");
  }

  const isSignedInUser = signedIn && id === user.id;

  if (!isSignedInUser) {
    router.push("/404");
  }

  return (
    <Container title={"Add Your Workout"}>
      <div className="self-center text-center mt-10 px-2 sm:mt-12 sm:px-6 lg:mt-20 lg:px-8 my-6 mb-32 sm:mb-auto h-auto">
        <h1 className="font-extrabold text-emerald-600 text-5xl tracking-tight block xl:inline sm:text-6xl md:text-7xl">
          Add Your Workout
        </h1>
        <p className="text-gray-500 text-lg md:text-xl">
          Add a workout to increase your score! Your current score is{" "}
          {user.totalScore}.
        </p>
        {sessionTwoEnd >= 0 && (
          <p className="text-gray-800 text-lg md:text-xl font-bold italic">
            Session two ends{" "}
            {sessionTwoEnd === "0"
              ? "today"
              : sessionTwoEnd === "1"
              ? "tomorrow"
              : `in ${sessionTwoEnd} days`}
            !
          </p>
        )}
        <AddWorkoutForm />
      </div>
    </Container>
  );
};

export default Add;
