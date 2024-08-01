export type Job = {
  id: string;
  status: string;
  result: { urls: { raw: string }; description: string } | null;
  startedAt: string;
  endedAt: string;
};
