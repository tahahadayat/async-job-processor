import { readFile, writeFile } from "jsonfile";
import { v4 } from "uuid";

import { Jobs } from "../utils/types";

const JOBS_DATA_PATH = "./data/jobs.json";

class JobsStore {
  private static jobs: Jobs = new Map();

  constructor() {
    this.load()?.then((data) => {
      JobsStore.jobs = new Map(Object.entries(data));
    });
  }

  public getAll() {
    return JobsStore.jobs;
  }

  public get(key: string) {
    return JobsStore.jobs.get(key);
  }

  public reset() {
    JobsStore.jobs.clear();
  }

  public save() {
    try {
      return writeFile(JOBS_DATA_PATH, JobsStore.jobs);
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
      status: "pending",
      result: null,
      startedAt: new Date(),
      endedAt: null,
    });
    this.save();
    return key;
  }

  public resolvePendingJob(key: string, result: string) {
    const job = JobsStore.jobs.get(key);
    if (!job?.startedAt || job?.status !== "pending") {
      return;
    }
    JobsStore.jobs.set(key, {
      status: "resolved",
      result: result,
      endedAt: new Date(),
      startedAt: job.startedAt,
    });
    this.save();
    return job;
  }

  public rejectPendingJob(key: string) {
    const job = JobsStore.jobs.get(key);
    if (!job?.startedAt || job?.status !== "pending") {
      return;
    }
    JobsStore.jobs.set(key, {
      status: "rejected",
      result: null,
      endedAt: new Date(),
      startedAt: job.startedAt,
    });
    this.save();
    return job;
  }
}

export default new JobsStore();
