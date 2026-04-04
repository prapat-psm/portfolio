import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx } from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  baseUrl: string;
}

export const Pagination = ({ currentPage, totalPages, limit, baseUrl }: PaginationProps) => {
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const getOffsetUrl = (pageNum: number) => {
    const offset = (pageNum - 1) * limit;
    return `${baseUrl}?offset=${offset}`;
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <Link
        href={hasPrev ? getOffsetUrl(currentPage - 1) : "#"}
        scroll={false}
        className={clsx(
          "flex items-center justify-center w-10 h-10 rounded-full border border-outline transition-colors",
          !hasPrev ? "opacity-30 cursor-not-allowed pointer-events-none" : "hover:bg-primary-dim hover:border-primary"
        )}
        aria-disabled={!hasPrev}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      <div className="flex items-center gap-2">
        <span className="text-on-surface-variant font-medium">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      <Link
        href={hasNext ? getOffsetUrl(currentPage + 1) : "#"}
        scroll={false}
        className={clsx(
          "flex items-center justify-center w-10 h-10 rounded-full border border-outline transition-colors",
          !hasNext ? "opacity-30 cursor-not-allowed pointer-events-none" : "hover:bg-primary-dim hover:border-primary"
        )}
        aria-disabled={!hasNext}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
};
