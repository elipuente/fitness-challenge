import prisma from "../../../lib/prisma";
import { verifyRefreshToken } from "../../../utils/token";
import { parseCookie } from "../../../utils/cookie";

const calculateScore = ({ minutes, ppmValue }) =>
  Math.round(minutes * ppmValue);

const calculateTotalScore = (previousTotalScore, score) =>
  previousTotalScore + score;

const getLatestTotalScore = ({ id }) =>
  prisma.fitness_user.findUnique({
    where: {
      id,
    },
    select: {
      totalScore: true,
    },
  });

const saveWorkout = (user, workout) =>
  prisma.fitness_workout_log.create({
    data: {
      fitness_userId: user.id,
      date: new Date().toISOString(),
      description: workout.description,
      minutes: Number(workout.minutes),
      score: calculateScore(workout),
      type: workout.name,
    },
    select: {
      id: true,
      score: true,
      fitness_userId: true,
    },
  });

const updateUser = (user, totalScore) =>
  prisma.fitness_user.update({
    where: {
      id: user.id,
    },
    data: {
      totalScore,
    },
    select: {
      id: true,
      totalScore: true,
    },
  });

const rollbackWorkout = ({ id }) =>
  prisma.fitness_workout_log.delete({
    where: {
      id,
    },
  });

const unableToVerify = (res) =>
  res.status(403).json({
    error: true,
    message:
      "Unable to verify user information. Try signing out and signing in again.",
  });

const genericError = (res) =>
  res.status(500).json({
    error: true,
    message: "An error occurred. Please try again later.",
  });

const handler = async (req, res) => {
  let userToken, latestTotalScore, savedWorkout, updatedUser;

  if (req.method !== "POST") {
    return res.status(400);
  }

  const { workout, user } = req.body;

  const { __rfx: token } = parseCookie(req);

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Please sign in and try again.",
    });
  }

  try {
    userToken = verifyRefreshToken(token);
  } catch (err) {
    return unableToVerify(res);
  }

  if (!(user.id === userToken.id && user.phoneNumber === userToken.ph)) {
    return unableToVerify(res);
  }

  try {
    latestTotalScore = await getLatestTotalScore(user);
  } catch (err) {
    console.error(
      `Error: An error occurred while fetching latest score for user (userId: ${user.id}).`
    );

    return genericError(res);
  }

  try {
    savedWorkout = await saveWorkout(user, workout);
  } catch {
    console.error(
      `Error: An error occurred during the workout creation process for user (userId: ${user.id}).`
    );

    return genericError(res);
  }

  const totalScore = calculateTotalScore(
    latestTotalScore.totalScore,
    savedWorkout.score
  );

  try {
    updatedUser = await updateUser(user, totalScore);
  } catch (err) {
    console.error(
      `Error: Unable to update totalScore (totalScore: ${totalScore}) for user (userId: ${user.id}). Attempting to rollback record creation.`
    );

    const deleted = await rollbackWorkout(savedWorkout);

    if (!deleted) {
      console.error(
        `Error: Unable to rollback record creation. Workout Log and TotalScore for user (userId: ${user.id}) mismatched. Delete workout (workoutId: ${savedWorkout.id}) to fix.`
      );
      return res.status(500).json({
        error: true,
        message:
          "A critical error occurred. Workout log and total user score mismatch. Please inform.",
      });
    }

    return genericError(res);
  }

  return res.status(200).json({
    success: true,
    error: false,
    updatedUser,
    addedWorkout: { id: savedWorkout.id },
  });
};

export default handler;
