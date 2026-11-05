export interface PaginatedItems<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export function paginateItems<T>(items: T[], requestedPage: number, pageSize: number): PaginatedItems<T> {
  const safePageSize = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 1;
  const totalPages = Math.ceil(items.length / safePageSize);
  const page = Math.min(Math.max(1, Math.trunc(requestedPage) || 1), Math.max(1, totalPages));
  const start = (page - 1) * safePageSize;

  return {
    items: items.slice(start, start + safePageSize),
    page,
    pageSize: safePageSize,
    totalItems: items.length,
    totalPages,
  };
}