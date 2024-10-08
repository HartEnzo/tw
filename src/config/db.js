import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("Connected with DB", process.env.PI_PORT);
  } catch (error) {
    console.log(error);
  }
})();