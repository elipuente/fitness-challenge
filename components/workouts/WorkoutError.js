import Container from "../Container";
import Button from "../Button";

const WorkoutError = ({ error }) => (
  <Container title="User Not Found">
    <div className="flex justify-center mt-10 px-4 sm:mt-12 sm:px-6 lg:mt-20 lg:px-8 my-6 mb-56 h-auto">
      <div className="text-left justify-start">
        <h1 className="font-extrabold text-emerald-600 text-5xl tracking-tight block xl:inline sm:text-6xl md:text-7xl">
          User Not Found
        </h1>
        <p className="text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:text-xl lg:mx-0">
          An error occurred. The user cannot be found. Message: {error}
        </p>
        <div className="-ml-8 mt-5">
          <Button text={"Back to Leaderboard"} path={"/leaderboard"} />
        </div>
      </div>
    </div>
  </Container>
);

export default WorkoutError;
