import mongoose from "mongoose";

mongoose.set("debug", true);

async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
  console.log("MongoDB database connection established successfully");
}

main();
