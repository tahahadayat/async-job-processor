import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getJobs = async () => {
  return api.get("/jobs");
};

export const getJob = async (jobId: string) => {
  return api.get(`/jobs/${jobId}`);
};

export const createJob = async () => {
  return api.post("/jobs");
};
