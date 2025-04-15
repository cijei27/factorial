import serverless from "serverless-http";
import app from "./MotorbikesStore.Microservice.Api/server";

export const handler = serverless(app);
