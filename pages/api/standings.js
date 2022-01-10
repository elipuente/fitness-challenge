import prisma from "../../lib/prisma";

const getCurrentStandings = async (prisma) =>
  await prisma.fitness_user.groupBy({
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
  // const prisma = new PrismaClient();
  try {
    const allUsers = await getCurrentStandings(prisma);
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json({
      error: true,
      message:
        "An error occurred while getting current standings. Please try again later.",
    });
  }
};

export default handler;
