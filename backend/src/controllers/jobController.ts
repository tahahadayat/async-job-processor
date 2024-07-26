import { Request, Response } from "express";

class JobController {
  async getJobs(request: Request, response: Response) {
    response.send("getJobs");
  }

  async getJob(request: Request, response: Response) {
    response.send("getJob");
  }

  async createJob(request: Request, response: Response) {
    response.send("createJob");
  }
}

export default new JobController();
