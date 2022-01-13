import prisma from "../../lib/prisma";

const getCurrentStandings = (prisma) =>
  prisma.fitness_user.groupBy({
    by: ["totalScore", "firstName", "lastName", "phoneNumber"],
    orderBy: [
      {
        totalScore: "desc",
      },
      {
        firstName: "asc",
      },
    ],
  });

const handler = async (req, res) => {
  try {
    const allUsers = await getCurrentStandings(prisma);
    res.status(200).json(allUsers);
  } catch (err) {
    console.error(
      `Error: An error occurred retrieving current standings. `,
      err
    );
    res.status(500).json({
      error: true,
      message:
        "An error occurred while getting current standings. Please try again later.",
    });
  }
};

export default handler;
