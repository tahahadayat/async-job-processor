import express, { urlencoded, Request, Response } from "express";
import cors from "cors";

import errorHandler from "./middlewares/errorHandler";
import secrets from "../secrets";
import { appRouter as appRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use(appRoutes);
app.use(errorHandler);

app.use("/", (req: Request, res: Response) => {
  res.send(`Healthy`);
});

app.listen(secrets.port, () => {
  console.log(`Server started at PORT ${secrets.port}`);
});
