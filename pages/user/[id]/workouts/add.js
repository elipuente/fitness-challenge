import { useRouter } from "next/router";

import Container from "../../../../components/Container";
import AddWorkoutForm from "../../../../components/workouts/add-workout/AddWorkoutForm";
import { useUser } from "../../../../utils/user";

const getSessionThreeEnd = () =>
  Math.ceil(
    (new Date(2022, 7, 10).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

const Add = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user, signedIn } = useUser();

  const sessionThreeEnd = getSessionThreeEnd();
  const withinTenDaysOfSessionEnd =
    10 >= sessionThreeEnd && sessionThreeEnd >= 0;

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
        {withinTenDaysOfSessionEnd && (
          <p className="text-gray-800 text-lg md:text-xl font-bold italic">
            Session three ends{" "}
            {sessionThreeEnd === 0
              ? "today"
              : sessionThreeEnd === 1
              ? "tomorrow"
              : `in ${sessionThreeEnd.toString()} days`}
            !
          </p>
        )}
        <AddWorkoutForm />
      </div>
    </Container>
  );
};

export default Add;
