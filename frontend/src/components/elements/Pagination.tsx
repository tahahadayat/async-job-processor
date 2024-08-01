import ReactPaginate from "react-paginate";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import "./Pagination.css";

const Pagination = ({
  handlePageClick,
  pageCount,
  page,
}: {
  handlePageClick: (data: { selected: number }) => void;
  pageCount: number;
  page: number;
}) => {
  return (
    <div className="flex justify-center">
      <ReactPaginate
        className="paginated-box"
        breakLabel="..."
        nextLabel={<MdKeyboardArrowRight />}
        previousLabel={<MdKeyboardArrowLeft />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        previousClassName="pre-btn next-pre-btn"
        nextClassName="next-btn next-pre-btn"
        activeClassName="ative-page"
        disabledClassName="disable-page"
        pageClassName="pages-count"
        renderOnZeroPageCount={null}
        forcePage={page}
      />
    </div>
  );
};

export default Pagination;
