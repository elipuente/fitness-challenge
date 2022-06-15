import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

import Container from "../components/Container";
import Errors from "../components/Errors";
import LeaderTable from "../components/leaderboard/LeaderTable";
import { fetcher } from "../utils/fetcher";
import { useUser } from "../utils/user";

import * as winners from "../data/sessionWinners";

const Leaderboard = () => {
  const router = useRouter();
  const { user, signedIn } = useUser();
  const { data, error } = useSWR("/api/standings", fetcher);

  if (!data) {
    return (
      <Container title="Loading Leaderboard">
        <div className="flex flex-col lg:flex-row justify-center sm:justify-between mt-10 px-4 sm:mt-12 lg:mt-20 lg:px-8 my-6 mb-20 h-auto">
          <div className="text-left justify-start">
            <h1 className="font-extrabold text-emerald-600 text-5xl tracking-tight block xl:inline sm:text-6xl md:text-7xl">
              Leaderboard
            </h1>
            <h1 className="font-extrabold block text-2xl md:text-3xl text-gray-900">
              View the current standings
            </h1>
            <div className="mt-3 animate-pulse h-4 sm:h-5 bg-gray-300 rounded-lg sm:mt-5 sm:max-w-xl md:mt-5 lg:mx-0"></div>
            <div className="mt-2 animate-pulse h-4 sm:h-5 bg-gray-300 rounded-lg sm:max-w-[16rem] md:text-xl lg:mx-0"></div>
            <div className="mt-2 animate-pulse h-4 sm:h-5 bg-gray-300 rounded-lg sm:max-w-xs md:text-xl lg:mx-0"></div>
          </div>
          <LeaderTable data={data} />
        </div>
      </Container>
    );
  }

  if (error || data?.error) {
    return <Errors path={router.asPath} />;
  }

  const userIsFirst = signedIn && data[0].id === user.id;

  return (
    <Container title="Leaderboard">
      <div className="flex flex-col lg:flex-row justify-center sm:justify-between mt-10 px-4 sm:mt-12 lg:mt-20 lg:px-8 my-6 mb-20 h-auto">
        <div className="text-left justify-start">
          <h1 className="font-extrabold text-emerald-600 text-5xl tracking-tight block xl:inline sm:text-6xl md:text-7xl">
            Leaderboard
          </h1>
          <h1 className="font-extrabold block text-2xl md:text-3xl text-gray-900">
            View the current standings
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl lg:mx-0">
            Currently, {userIsFirst ? "you are" : `${data[0].firstName} is`} in
            first place with a total score of {data[0].totalScore}!{" "}
            {signedIn ? (
              userIsFirst ? (
                "Be sure to maintain first place by "
              ) : (
                "Be sure to compete daily by "
              )
            ) : (
              <>
                {"Be sure to compete daily by "}
                <Link href={`/user/login`}>
                  <a className="text-black">signing in</a>
                </Link>
                {" and "}
              </>
            )}
            entering your workouts.
          </p>
        </div>
        <LeaderTable data={data} />
      </div>
      <div className="flex flex-col lg:flex-row justify-center px-4 lg:px-8 my-6 mb-20 h-auto text-center">
        <div className="justify-start">
          <h1 className="font-extrabold text-emerald-600 text-5xl tracking-tight block xl:inline sm:text-6xl md:text-7xl">
            Previous Winners
          </h1>
          <h1 className="font-extrabold block text-2xl md:text-3xl text-gray-900">
            Top Leaders from Previous Sessions
          </h1>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="mb-4">
              <p className="-mb-12 sm:mb-4 mt-10 text-base text-gray-500 sm:text-lg md:text-xl lg:mx-0">
                Session One Winners!
              </p>
              <LeaderTable data={winners.sessionOneWinners} />
            </div>
            <div className="mb-4">
              <p className="-mb-12 sm:mb-4 mt-10 text-base text-gray-500 sm:text-lg md:text-xl lg:mx-0">
                Session Two Winners!
              </p>
              <LeaderTable data={winners.sessionTwoWinners} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Leaderboard;
