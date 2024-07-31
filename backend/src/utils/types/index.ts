import { Request, Response, NextFunction } from "express";
import { Random } from "unsplash-js/dist/methods/photos/types";

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export type Route = {
  method: HttpMethod;
  route: string;
  middlewares: Middleware[];
  controller: Controller;
};

export type Secret = {
  port: string;
  unsplash_access_key: string;
  origin: string;
};

type JobStatus = "pending" | "resolved" | "rejected";

export type JobDetails = {
  id: string;
  status: JobStatus;
  startedAt: Date;
  endedAt: Date | null;
  result: Random | null;
};

export type PendingJobDetails = {
  status: "pending";
  result: null;
} & Pick<JobDetails, "id" | "startedAt" | "endedAt">;

export type Jobs = Map<string, JobDetails>;
