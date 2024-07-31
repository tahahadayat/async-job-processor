import express, { urlencoded, Request, Response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import errorHandler from "./middlewares/errorHandler";
import secrets from "../secrets";
import { appRouter as appRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use(appRoutes);
app.use(errorHandler);

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: secrets.origin,
  },
});

app.use("/", (req: Request, res: Response) => {
  res.send(`Healthy`);
});

server.listen(secrets.port, () => {
  console.log(`Server started at PORT ${secrets.port}`);
});
