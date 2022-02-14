import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { HeartIcon } from "@heroicons/react/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/solid";

import { useUser } from "../../utils/user";

const totalLikeText = (userLikedWorkout, likes, user) => {
  if (!likes.length && userLikedWorkout) {
    return "You";
  }

  const names = likes.map(({ user }) => user.firstName);

  switch (names.length) {
    case 1: {
      return userLikedWorkout ? "You" : names[0];
    }
    case 2: {
      return userLikedWorkout
        ? `You and ${names.filter((name) => name !== user.firstName)[0]}`
        : names.join(" and ");
    }
    case 3: {
      return userLikedWorkout
        ? `You, ${names
            .filter((name) => name !== user.firstName)
            .join(" and ")}`
        : `${names[0]}, ${names.slice(1).join(" and ")}`;
    }
    default: {
      return userLikedWorkout
        ? `You, ${
            names.filter((name) => name !== user.firstName)[0]
          } and others...`
        : `${names[0]}, ${names[1]} and others...`;
    }
  }
};

const WorkoutLikes = ({ totalLikes, likes, workoutId }) => {
  const router = useRouter();
  const { user, signedIn } = useUser();
  const [userLikedWorkout, setUserLikedWorkout] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matchingUserLike, setMatchingUserLike] = useState();

  useEffect(() => {
    if (signedIn && totalLikes) {
      const matchingLike = likes.filter(
        ({ fitness_userId }) => fitness_userId === user.id
      );
      setMatchingUserLike(matchingLike);
      setUserLikedWorkout(Boolean(matchingLike));
    }
  }, [signedIn, totalLikes, likes, user?.id]);

  const handleLikeRequest = async () => {
    if (signedIn && !loading) {
      setLoading(true);
      const res = await fetch("/api/post/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          workoutId,
          user,
          intent: "like",
        }),
      }).then((data) => data.json());

      if (res?.success) {
        setUserLikedWorkout(true);
        setMatchingUserLike([res.newLike]);
        setLoading(false);
      }
    } else {
      setLoading(false);
      router.push("/user/login");
    }
  };

  const handleUnlikeRequest = async () => {
    const res = await fetch("/api/post/like", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        workoutId,
        likeId: matchingUserLike[0].id,
        user,
        intent: "unlike",
      }),
    }).then((data) => data.json());

    if (res?.success) {
      setUserLikedWorkout(false);
      setMatchingUserLike(undefined);
    }
  };

  return (
    <div className="flex flex-row items-center">
      {userLikedWorkout ? (
        <button onClick={() => handleUnlikeRequest()}>
          <SolidHeartIcon className="flex-shrink-0 h-6 w-6 mr-1 text-red-600" />
        </button>
      ) : (
        <button onClick={() => handleLikeRequest()}>
          <HeartIcon className="flex-shrink-0 h-6 w-6 mr-1" />
        </button>
      )}{" "}
      <p className="text-sm text-gray-900">
        {totalLikes || userLikedWorkout
          ? `Liked by ${totalLikeText(userLikedWorkout, likes, user)}`
          : signedIn
          ? "Be the first to like this workout"
          : "Sign in to like this workout"}
      </p>
    </div>
  );
};

export default WorkoutLikes;
