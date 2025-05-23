import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface AdminPaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export function AdminPagination({ currentPage, totalPages, pageSize }: AdminPaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | 'ellipsis')[] = [];
    
    // always show first page
    pages.push(1);
    
    if (currentPage <= 3) {
      // show first 3-4 pages
      for (let i = 2; i <= Math.min(4, totalPages); i++) {
        pages.push(i);
      }
      if (totalPages > 4) {
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    } else if (currentPage >= totalPages - 2) {
      // show last 3-4 pages
      if (totalPages > 4) pages.push('ellipsis');
      for (let i = Math.max(totalPages - 3, 2); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // show current +/- 1 with ellipses
      pages.push('ellipsis');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('ellipsis');
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="mt-12 flex justify-center">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/admin?page=${currentPage - 1}&pageSize=${pageSize}`} />
            </PaginationItem>
          )}
          
          {getVisiblePages().map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href={`/admin?page=${page}&pageSize=${pageSize}`}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={`/admin?page=${currentPage + 1}&pageSize=${pageSize}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
