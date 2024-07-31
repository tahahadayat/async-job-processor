import UnsplashService from "./unsplashService";
import { io } from "..";
import { jobsStore } from "../stores";

class JobService {
  private STEP: number = 5;
  private MAX_DELAY_IN_SECONDS: number = 30;

  createJob() {
    const jobId = jobsStore.createNewPendingJob();
    this.emitJobToSocketAfterProcess(jobId);
    return jobId;
  }

  private async emitJobToSocketAfterProcess(jobId: string) {
    const job = await this.processJob(jobId);
    io.emit("jobUpdate", { jobId, job });
  }

  private async processJob(jobId: string) {
    try {
      const url = await this.getPhotoAfterDelay();
      return jobsStore.resolvePendingJob(jobId, url);
    } catch (error) {
      return jobsStore.rejectPendingJob(jobId);
    }
  }

  private getRandomDelayInMilliseconds() {
    return (
      Math.floor(Math.random() * (this.MAX_DELAY_IN_SECONDS / this.STEP)) *
      this.STEP *
      1000
    );
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
