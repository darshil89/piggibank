import prisma from "../../prisma/index.js";
export const connectDB = async () => {
  try {
    //connect to the database
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
