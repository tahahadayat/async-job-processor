import { useEffect, useState } from "react";

import { socket } from "../../socket";
import { Job } from "../../types/job";
import Cell from "./Cell";
import Badge from "../elements/Badge";
import Pagination from "../elements/Pagination";
import JobDetailsModal from "../modals/JobDetailsModal";
import { getJobs, createJob } from "../../services/apiService";
import { notifyError } from "../../utils/toast";
import { useJobStore } from "../../stores/useJobStore";
import { formatDate } from "../../utils/helpers";

const ITEMS_PER_PAGE = 7;

const JobsTable = () => {
  const { jobs, addJob, setJobs, updateJob } = useJobStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [jobId, setJobId] = useState("");

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + ITEMS_PER_PAGE;
  const currentJobs = jobs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(jobs.length / ITEMS_PER_PAGE);

  const handlePageClick = (data: { selected: number }) => {
    const newOffset = (data.selected * ITEMS_PER_PAGE) % jobs.length;
    setItemOffset(newOffset);
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await getJobs();
      setJobs(response.data);
    } catch (error) {
      console.error(error);
      notifyError("Unable to fetch jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleJobCreate = ({ jobId }: { jobId: string }) => {
    addJob({
      id: jobId,
      status: "pending",
      result: null,
      startedAt: formatDate(new Date().toISOString()),
      endedAt: "",
    });
  };

  const handleJobUpdate = (data: { jobId: string; job: Job }) => {
    updateJob({
      id: data.jobId,
      result: data.job.result,
      status: data.job.status,
      endedAt: data.job.endedAt,
      startedAt: data.job.startedAt,
    });
  };

  useEffect(() => {
    fetchJobs();

    socket.on("jobCreate", handleJobCreate);
    socket.on("jobUpdate", handleJobUpdate);
    return () => {
      socket.off("jobCreate", handleJobCreate);
      socket.off("jobUpdate", handleJobUpdate);
    };
  }, []);

  const addJobHandler = async () => {
    await createJob();

    setItemOffset(0);
  };

  const tableHeaders = [
    "Job",
    "Started Date",
    "Ended Date",
    "Status",
    "Actions",
  ];

  if (jobs.length === 0 && loading) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <JobDetailsModal setIsOpen={setIsOpen} isOpen={isOpen} jobId={jobId} />
      )}
      <div className="px-4 sm:px-6 lg:px-8 my-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Jobs
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the Job including their details.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
              onClick={addJobHandler}
            >
              Add Job
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full min-h-[600px] py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {tableHeaders.map((header) => (
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        key={header}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentJobs.length ? (
                    currentJobs.map((job: Job) => (
                      <tr key={job.id}>
                        <Cell>
                          <div className="flex items-center">
                            <div className="font-medium text-gray-900">
                              {job.id}
                            </div>
                          </div>
                        </Cell>
                        <Cell>{formatDate(job.startedAt) || "-"}</Cell>
                        <Cell>{formatDate(job.endedAt) || "-"}</Cell>
                        <Cell>
                          <Badge status={job.status} />
                        </Cell>
                        <Cell>
                          <div
                            className="block w-fit rounded-md bg-blue-500 px-3 py-1.5 cursor-pointer text-center text-xs font-semibold text-white shadow-sm hover:bg-blue-400"
                            onClick={() => {
                              setJobId(job.id);
                              setIsOpen(true);
                            }}
                          >
                            View
                          </div>
                        </Cell>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center p-4">
                        No jobs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Pagination
        handlePageClick={handlePageClick}
        pageCount={pageCount}
        page={itemOffset / ITEMS_PER_PAGE}
      />
    </>
  );
};

export default JobsTable;
