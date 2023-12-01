import mongoose, { ConnectOptions } from "mongoose";
mongoose.set("strictQuery", false);
(async () => {
  try {
    const result = await mongoose.connect(
      process.env.DATABASE_URL as string,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    );
    console.log("db connected");
  } catch (error: any) {
    console.log(error.message);
  }
})();
