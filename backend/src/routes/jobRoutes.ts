import { Router } from "express";

import { Route } from "../utils/types/index";
import jobController from "../controllers/jobController";

const router = Router();

const jobRoutes: Route[] = [
  {
    method: "get",
    route: "/",
    middlewares: [],
    controller: jobController.getJobs,
  },
  {
    method: "get",
    route: "/:id",
    middlewares: [],
    controller: jobController.getJob,
  },
  {
    method: "post",
    route: "/",
    middlewares: [],
    controller: jobController.createJob,
  },
];

jobRoutes.forEach((route) => {
  router[route.method](route.route, route.middlewares, route.controller);
});

export { router as jobRoutes };
