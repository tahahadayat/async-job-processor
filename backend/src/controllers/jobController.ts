import { Request, Response } from "express";

import JobService from "../services/jobService";
import { jobsStore } from "../stores";

class JobController {
  async getJobs(request: Request, response: Response) {
    const resolvedJobs = jobsStore.getAll();
    response.json(resolvedJobs);
  }

  async getJob(request: Request, response: Response) {
    const { id } = request.params;
    const job = jobsStore.get(id);

    if (!job) {
      response.status(404);
      return;
    }

    response.send(job);
  }

  async createJob(request: Request, response: Response) {
    const jobId = new JobService().createJob();
    response.send(jobId);
  }
}

export default new JobController();
