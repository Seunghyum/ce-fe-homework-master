import React from "react";

interface ListPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const ListPagination: React.FC<ListPaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-4 float-right">
      <button
        className="px-2 py-1 border border-gray-300"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {pageNumbers.map((page, idx) =>
        page === "..." ? (
          <span className="px-2 py-1 border border-gray-300" key={idx}>
            ...
          </span>
        ) : (
          <button
            key={idx}
            onClick={() => onPageChange(page as number)}
            className={`px-2 py-1 border border-gray-300 ${
              page === currentPage ? "font-bold" : "font-normal"
            } ${page === currentPage ? "underline" : "none"}`}
          >
            {page}
          </button>
        )
      )}
      <button
        className="px-2 py-1 border border-gray-300"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};
