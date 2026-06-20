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
    <div className="flex items-center justify-between mt-4 p-3 bg-white rounded-lg border shadow-sm">
      <button
        disabled={page === 0}
        onClick={() => onPageChange(page - 1)}
        className="px-3 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        ← Prev
      </button>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">
          Page
        </span>

        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-indigo-600 text-white text-sm font-semibold">
          {page + 1}
        </span>

        <span className="text-sm text-gray-500">
          of {totalPages}
        </span>
      </div>

      <button
        disabled={page + 1 >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-3 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;