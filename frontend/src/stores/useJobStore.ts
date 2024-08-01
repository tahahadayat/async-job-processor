import { create } from "zustand";
import { Job } from "../types/job";

type JobStoreType = {
  jobs: Job[];
  setJobs: (jobs: Job[]) => void;
  addJob: (job: Job) => void;
  updateJob: (job: Job) => void;
};

export const useJobStore = create<JobStoreType>((set) => ({
  jobs: [],
  setJobs: (jobs: Job[]) => set({ jobs }),

  addJob: (job: Job) => set(({ jobs }) => ({ jobs: [job, ...jobs] })),

  updateJob: (job: Job) =>
    set(({ jobs }) => ({
      jobs: jobs.map((j) => (j.id === job.id ? job : j)),
    })),
}));
