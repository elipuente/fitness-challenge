import { genericError } from "../../pages/api/helpers";
import prisma from "../../lib/prisma";

const incrementLikeCount = (workoutId) =>
  prisma.fitness_workout_log.update({
    where: {
      id: workoutId,
    },
    data: {
      totalLikes: {
        increment: 1,
      },
    },
    select: {
      totalLikes: true,
    },
  });

const decrementLikeCount = (workoutId) =>
  prisma.fitness_workout_log.update({
    where: {
      id: workoutId,
    },
    data: {
      totalLikes: {
        decrement: 1,
      },
    },
  });

const createNewLikeRecord = (workoutId, userId) =>
  prisma.fitness_workout_likes.create({
    data: {
      fitness_workoutLogId: workoutId,
      fitness_userId: userId,
    },
    select: {
      id: true,
      fitness_userId: true,
      fitness_workoutLogId: true,
    },
  });

const deleteLikeRecord = (likeId) =>
  prisma.fitness_workout_likes.delete({
    where: {
      id: likeId,
    },
  });

export const likeWorkout = async (workoutId, userId, res) => {
  let newTotalLikeCount, newLike;
  try {
    newTotalLikeCount = await incrementLikeCount(workoutId);
  } catch (err) {
    console.error(
      `Error: An error occurred while incrementing the current like total for workout (workoutId: ${workoutId}).`,
      err
    );

    return genericError(res);
  }

  try {
    newLike = await createNewLikeRecord(workoutId, userId);
  } catch (err) {
    console.error(
      `Error: An error occurred while saving a like record for workout (workoutId: ${workoutId}).`,
      err
    );

    const deleted = await decrementLikeCount(workoutId);

    if (!deleted) {
      console.error(
        `Error: Unable to rollback total like count. Set like count to ${newTotalLikeCount} to fix.`
      );
      return res.status(500).json({
        error: true,
        message: "A critical error occurred. Workout like mismatch.",
      });
    }
  }

  return res.status(200).json({ success: true, error: false, newLike });
};

export const unlikeWorkout = async (workoutId, likeId, res) => {
  try {
    await deleteLikeRecord(likeId);
  } catch (err) {
    console.error(
      `Error: An error occurred while deleting the like record for workout (workoutId: ${workoutId}).`,
      err
    );

    return genericError(res);
  }

  try {
    await decrementLikeCount(workoutId);
  } catch (err) {
    console.error(
      `Error: An error occurred while decrementing the current like total for workout (workoutId: ${workoutId}).`,
      err
    );

    const deleted = await incrementLikeCount(workoutId);

    if (!deleted) {
      console.error(`Error: Unable to rollback total like count.`);
      return res.status(500).json({
        error: true,
        message: "A critical error occurred. Workout like mismatch.",
      });
    }
  }

  return res.status(200).json({ success: true, error: false });
};
