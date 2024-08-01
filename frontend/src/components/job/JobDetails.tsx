import { useState, useEffect } from "react";
import { formatDate } from "../../utils/helpers";
import Badge from "../elements/Badge";
import { getJob } from "../../services/apiService";
import { notifyError } from "../../utils/toast";
import { Job } from "../../types/job";

const JobDetails = ({ jobId }: { jobId: string | undefined }) => {
  const [job, setJob] = useState<Job | null>(null);

  const fetchJob = async () => {
    try {
      if (!jobId) {
        return;
      }
      const response = await getJob(jobId);
      setJob(response.data);
    } catch (error) {
      console.error(error);
      notifyError("Unable to fetch job: " + jobId);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  if (!jobId || !job) {
    return null;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {job.result?.urls.raw && (
        <img
          className="rounded-t-lg object-contain"
          src={job.result?.urls.raw}
          style={{ width: "500px", height: "300px" }}
          alt="image"
        />
      )}
      <div className="p-5">
        <h5 className="mb-2 font-bold tracking-tight text-gray-900">
          {job.id}
        </h5>
        <div className="flex flex-col gap-3">
          {job.result?.description && (
            <p className="text-md text-gray-900">{job.result?.description}</p>
          )}
          <p className="text-sm text-gray-600">
            Start Date: {formatDate(job.startedAt) || "-"}
          </p>
          <p className="text-sm text-gray-600">
            End Date: {formatDate(job.endedAt) || "-"}
          </p>
          <p className="text-sm text-gray-600">
            Status: <Badge status={job.status} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
