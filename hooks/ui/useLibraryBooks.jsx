import { useCallback, useEffect, useRef, useState } from 'react';

export const useLibraryBooks = (subject, limit = 12) => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchBooks = useCallback(() => {
    setLoading(true);
    fetch(`https://openlibrary.org/search.json?subject=${subject}&limit=${limit}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        const newBooks = data.docs || [];
        setBooks(prev => [...prev, ...newBooks]);
        setHasMore(newBooks.length === limit);
        setLoading(false);
      });
  }, [page, subject, limit]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage(prev => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return { books, loading, loaderRef };
};
