interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  return (
    <div className="flex gap-2 justify-end mt-4">
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-1 border rounded"
      >
        Previous
      </button>

      <span>
        {page + 1} / {totalPages}
      </span>

      <button
        disabled={page + 1 === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-1 border rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;