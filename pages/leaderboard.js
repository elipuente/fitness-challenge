import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

import Container from "../components/Container";
import Errors from "../components/Errors";
import Loading from "../components/Loading";
import LeaderTable from "../components/leaderboard/LeaderTable";
import { fetcher } from "../utils/fetcher";
import { useUser } from "../utils/user";

const Leaderboard = () => {
  const router = useRouter();
  const { user, signedIn } = useUser();
  const { data, error } = useSWR("/api/standings", fetcher);

  if (!data) {
    return <Loading text="Loading current standings..." />;
  }

  if (error || data?.error) {
    return <Errors path={router.asPath} />;
  }

  const userIsFirst = signedIn && data[0].phoneNumber === user.phoneNumber;

  return (
    <Container title="Leaderboard">
      <div className="flex flex-col lg:flex-row justify-center sm:justify-between mt-10 px-4 sm:mt-12 lg:mt-20 lg:px-8 my-6 mb-56 h-auto">
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
    </Container>
  );
};

export default Leaderboard;
