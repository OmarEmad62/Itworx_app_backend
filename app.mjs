import express from "express";
import cron from "node-cron";
import dotenv from "dotenv";
import userRoute from "./routes/users.mjs";
import {SendMail} from "./controller/email.mjs";

dotenv.config();
const app = express();
 app.use("/users",userRoute)

 cron.schedule('0 0 * * *', () => {   //run every day at 12 am
  SendMail();
});
  


  app.listen(process.env.PORT || 4000, () => {
    console.log("listening on port 4000");
  });
  