import ModalLayout from "./ModalLayout";
import JobDetails from "../job/JobDetails";
import { useJobStore } from "../../stores/useJobStore";

const JobDetailsModal = ({
  setIsOpen,
  isOpen,
  jobId,
}: {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  jobId: string;
}) => {
  const modalHandler = () => {
    setIsOpen(!isOpen);
  };

  const job = useJobStore.getState().jobs.find((job) => {
    if (job.id === jobId) {
      return job;
    }
  });

  return (
    <ModalLayout setOpen={modalHandler}>
      <div>
        <JobDetails jobId={job?.id} />
      </div>
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={modalHandler}
          className="block w-1/3 rounded-md bg-blue-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-400"
        >
          Got it
        </button>
      </div>
    </ModalLayout>
  );
};

export default JobDetailsModal;
