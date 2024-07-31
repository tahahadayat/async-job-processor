import UnsplashService from "./unsplashService";
import { jobsStore } from "../stores";

class JobService {
  private STEP: number = 5;
  private MAX_DELAY_IN_SECONDS: number = 30;

  createJob() {
    const jobId = jobsStore.createNewPendingJob();
    this.processJob(jobId);
    return jobId;
  }

  private async processJob(jobId: string) {
    try {
      const url = await this.getPhotoAfterDelay();
      jobsStore.resolvePendingJob(jobId, url);
      return url;
    } catch (error) {
      jobsStore.rejectPendingJob(jobId);
      return error;
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
