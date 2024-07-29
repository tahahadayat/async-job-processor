import { writeFile } from "fs/promises";
import UnsplashService from "./unsplashService";
import jobs from "../../data/jobs.json";
import { v4 } from "uuid";
import { Job } from "../utils/types";

class JobService {
  private STEP: number = 5;
  private MAX_DELAY_IN_SECONDS: number = 30;
  private jobs: Job;

  constructor() {
    this.jobs = jobs as Job;
  }

  createJob() {
    const jobId = v4();

    this.jobs[jobId] = {
      status: "pending",
      result: null,
    };

    this.writeToJobsDataFile(jobs as Job);

    this.processJob(jobId);

    return jobId;
  }

  private async processJob(jobId: string) {
    try {
      const url = await this.getPhotoAfterDelay();
      this.jobs[jobId] = {
        status: "resolved",
        result: url,
      };
    } catch (error) {
      this.jobs[jobId] = {
        status: "rejected",
        result: null,
      };
    } finally {
      this.writeToJobsDataFile(jobs as Job);
    }
  }

  private getRandomDelayInMilliseconds() {
    return (
      Math.floor(Math.random() * (this.MAX_DELAY_IN_SECONDS / this.STEP)) *
      this.STEP *
      1000
    );
  }

  private async writeToJobsDataFile(jobs: Job) {
    return writeFile("./data/jobs.json", JSON.stringify(jobs, null, 2));
  }

  private async getPhotoAfterDelay() {
    return new Promise<string>((resolve, reject) => {
      setTimeout(async () => {
        try {
          const url = await new UnsplashService().getRandomFoodPhoto();
          resolve(url);
        } catch (error) {
          console.error("Unable to get photo", error);
          reject(error);
        }
      }, this.getRandomDelayInMilliseconds());
    });
  }
}

export default JobService;
