import { readFile, writeFile } from "jsonfile";
import { v4 } from "uuid";

import { Jobs, JobDetails, PendingJobDetails } from "../utils/types";
import { Random } from "unsplash-js/dist/methods/photos/types";

const JOBS_DATA_PATH = "./data/jobs.json";

class JobsStore {
  private static jobs: Jobs = new Map();

  constructor() {
    this.load()?.then((data) => {
      JobsStore.jobs = new Map(Object.entries(data));
    });
  }

  public getAll() {
    const jobs = Array.from(JobsStore.jobs);
    const reversedJobs = jobs.reverse();
    const reversedJobDetails = reversedJobs.map(([key, _value]) =>
      this.get(key)
    );
    return reversedJobDetails;
  }

  public get(key: string): JobDetails | PendingJobDetails | undefined {
    const job = JobsStore.jobs.get(key);
    if (job?.status === "pending") {
      return {
        ...job,
        status: "pending",
        result: null,
      };
    } else {
      return job;
    }
  }

  public reset() {
    JobsStore.jobs.clear();
  }

  public save() {
    try {
      return writeFile(JOBS_DATA_PATH, Object.fromEntries(JobsStore.jobs));
    } catch (error) {
      console.log(error);
    }
  }

  public load() {
    try {
      return readFile(JOBS_DATA_PATH);
    } catch (error) {
      console.log(error);
    }
  }
  public createNewPendingJob(key: string = v4()) {
    JobsStore.jobs.set(key, {
      id: key,
      status: "pending",
      result: null,
      startedAt: new Date(),
      endedAt: null,
    });
    this.save();
    return key;
  }

  public resolvePendingJob(key: string, result: Random) {
    const job = JobsStore.jobs.get(key);
    if (!job?.startedAt || job?.status !== "pending") {
      return;
    }
    JobsStore.jobs.set(key, {
      id: key,
      status: "resolved",
      result: result,
      endedAt: new Date(),
      startedAt: job.startedAt,
    });
    this.save();
    return JobsStore.jobs.get(key);
  }

  public rejectPendingJob(key: string) {
    const job = JobsStore.jobs.get(key);
    if (!job?.startedAt || job?.status !== "pending") {
      return;
    }
    JobsStore.jobs.set(key, {
      id: key,
      status: "rejected",
      result: null,
      endedAt: new Date(),
      startedAt: job.startedAt,
    });
    this.save();
    return JobsStore.jobs.get(key);
  }
}

export default new JobsStore();
