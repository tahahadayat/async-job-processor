import UnsplashService from "./unsplashService";
import { io } from "..";
import { jobsStore } from "../stores";
import { Random } from "unsplash-js/dist/methods/photos/types";

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
    if (job) {
      io.emit("jobUpdate", {
        jobId,
        job: {
          id: job.id,
          status: job.status,
          startedAt: job.startedAt,
          endedAt: job.endedAt,
        },
      });
    }
  }

  private async processJob(jobId: string) {
    try {
      const randomPhotoResponse = (await this.getPhotoAfterDelay()) as Random;
      return jobsStore.resolvePendingJob(jobId, randomPhotoResponse);
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
    return new Promise<string | Random>((resolve, reject) => {
      setTimeout(async () => {
        try {
          const randomPhotoResponse =
            await new UnsplashService().getRandomFoodPhoto();
          resolve(randomPhotoResponse);
        } catch (error) {
          console.error("Unable to get photo", error);
          reject(error);
        }
      }, this.getRandomDelayInMilliseconds());
    });
  }
}

export default JobService;
