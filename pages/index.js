import Link from "next/link";
import Image from "next/image";

import bikingInCabo from "../public/images/biking-in-cabo.webp";
import Container from "../components/Container";
import { useUser } from "../utils/user";

const Home = () => {
  const { user, signedIn } = useUser();

  return (
    <Container>
      <div className="text-center lg:text-left my-12">
        <div className="flex flex-col-reverse lg:flex-row sm:justify-around">
          <div>
            <h1 className="mt-12 sm:my-6 text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Puente Wedding</span>{" "}
              <span className="block text-emerald-600">Fitness Challenge</span>
            </h1>
            <p className="my-3 text-gray-500 sm:mt-5 text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              {signedIn
                ? `Welcome back, ${user.firstName}! Your current score is ${
                    user.totalScore
                  }. ${
                    user.totalScore
                      ? "Increase your standings by adding another workout."
                      : "Get started by adding a workout!"
                  }`
                : "Welcome to the Puente Wedding Fitness Challenge. Sign in to start competing! The three users with the highest scores will win the buy-in!"}
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                {signedIn ? (
                  <Link href={`/user/${user.phoneNumber}/workouts/add`}>
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10">
                      Add a workout
                    </a>
                  </Link>
                ) : (
                  <Link href="/user/login">
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 md:py-4 md:text-lg md:px-10">
                      Sign in
                    </a>
                  </Link>
                )}
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link href="/leaderboard">
                  <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 md:py-4 md:text-lg md:px-10">
                    View Leaderboard
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-row self-center">
            <div className="h-[350px] w-[350px] bg-indigo-500 rounded-lg -rotate-6 absolute"></div>
            <Image
              width={350}
              height={350}
              placeholder="blur"
              className="rounded-lg"
              src={bikingInCabo}
              alt={"Hannah (left) and Eli (right) in kayaks on a lake."}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Home;
