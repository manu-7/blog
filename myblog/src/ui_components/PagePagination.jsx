import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PagePagination = ({
  numOfPages,
  handleSetPage,
  page,
  decreasePageValue,
  increasePageValue,
}) => {
  const numbers = Array.from({ length: numOfPages }, (_, i) => i + 1);
  const firstNumber = numbers[0];
  const lastNumber = numbers[numbers.length - 1];

  const handlePreviousClick = (e) => {
      e.preventDefault();  // Prevent the default link behavior
      if (page > firstNumber) {
          decreasePageValue();
      }
  };

  const handleNextClick = (e) => {
      e.preventDefault();  // Prevent the default link behavior
      if (page < lastNumber) {
          increasePageValue();
      }
  };

  return (
      <Pagination className="my-6 dark:text-white">
          <PaginationContent>
              {/* Previous Button */}
              {page > firstNumber && (
                  <PaginationItem onClick={handlePreviousClick}>
                      <PaginationPrevious
                          href="#"
                          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-md px-4 py-2 font-medium flex items-center gap-2"
                      >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                      </PaginationPrevious>
                  </PaginationItem>
              )}

              {/* Pagination Numbers */}
              {numbers.map((num) => (
                  <PaginationItem key={num} onClick={() => handleSetPage(num)}>
                      <PaginationLink
                          href="#"
                          isActive={num === page}
                          className={`rounded-md px-4 py-2 font-medium ${
                              num === page
                                  ? "bg-gray-200 dark:bg-gray-700 text-blue-600"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                      >
                          {num}
                      </PaginationLink>
                  </PaginationItem>
              ))}

              {/* Next Button */}
              {page < lastNumber && (
                  <PaginationItem onClick={handleNextClick}>
                      <PaginationNext
                          href="#"
                          className="bg-blue-600 text-white hover:bg-blue-700 transition-colors rounded-md px-4 py-2 font-medium flex items-center gap-2"
                      >
                          Next
                          <ChevronRight className="h-4 w-4" />
                      </PaginationNext>
                  </PaginationItem>
              )}
          </PaginationContent>
      </Pagination>
  );
};

export default PagePagination;
