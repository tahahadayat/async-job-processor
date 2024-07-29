import { Request, Response, NextFunction } from "express";

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
};
