import { useRef, useState, useCallback, useEffect } from 'react';

function useInfiniteScroll(defaultPage: number = 1) {
  const [page, setPage] = useState<number>(defaultPage);
  const timeoutRef = useRef<number>();

  const nextPage = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setPage((prevPage) => prevPage + 1);
    }, 250);
  }, []);

  const resetPage = useCallback(() => {
    setPage(defaultPage);
  }, [defaultPage]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  return {
    page,
    nextPage,
    resetPage,
  };
}

export default useInfiniteScroll;
