"use client";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { LuCalendar } from "react-icons/lu";

const SUBJECT = "science_fiction";
const LIMIT = 12;

export const LibraryView = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const fetchBooks = useCallback(() => {
    setLoading(true);
    fetch(
      `https://openlibrary.org/subjects/${SUBJECT}.json?limit=${LIMIT}&offset=${
        page * LIMIT
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        const newBooks = data.works || [];
        setBooks((prev) => [...prev, ...newBooks]);
        setHasMore(newBooks.length === LIMIT);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setHasMore(false);
      });
  }, [page]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <section className="px-2 py-4 sm:px-4 md:px-10 h-full">
      <h2 className="text-2xl font-bold text-[#001840] mb-4">
        📚 Explore the Library
      </h2>

      <div className="grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
        {books.map((book) => {
          const coverUrl = book.cover_id
            ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
            : "/no-cover.png";

          const archiveId = book.availability?.identifier;
          const readableUrl = archiveId
            ? `https://archive.org/details/${archiveId}/mode/2up?view=theater`
            : `https://openlibrary.org${book.key}`;

          return (
            <div
              key={book.key}
              tabIndex={0}
              role="group"
              aria-label={`Book: ${book.title}`}
              className="bg-white shadow-sm rounded-lg p-4 flex flex-col justify-between border border-gray-100 hover:shadow-md shadow-black/25 hover:scale-[1.02] transition-transform duration-200 ease-out"
            >
              <div className="relative h-48 mb-3">
                <Image
                  src={coverUrl}
                  alt={book.title}
                  fill
                  loading="lazy"
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-semibold text-[#001840] leading-tight line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-xs text-gray-600 mt-1 flex justify-between items-center w-full">
                  <span> {book.authors?.[0]?.name || "Unknown Author"}</span>
                  <span>
                    {book.first_publish_year > 0 && (
                      <div className="text-xs text-gray-500 mt-1 flex gap-1 items-center">
                        <LuCalendar />
                        <span className="font-bold">
                          {" "}
                          {book.first_publish_year}{" "}
                        </span>
                      </div>
                    )}
                  </span>
                </p>
              </div>
              <a
                href={readableUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${book.title} by ${
                  book.authors?.[0]?.name || "Unknown Author"
                }`}
                className="mt-4 inline-block text-sm text-white bg-[#001840] px-3 py-2 rounded hover:bg-[#002a60] hover:scale-[1.03] transition text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#001840]"
              >
                {archiveId ? "📖 Read Now" : "🔗 View Book"}
              </a>
            </div>
          );
        })}

        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`loader-${i}`}
              className="animate-pulse bg-white shadow-sm rounded-lg p-4 border border-gray-200 space-y-3"
            >
              <div className="h-48 bg-gray-200 rounded mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-1" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))}

        {books.length === 0 && !loading && (
          <div className="text-center text-gray-500 col-span-full">
            No books found. Check back later.
          </div>
        )}
      </div>

      {!loading && hasMore && (
        <div className="flex justify-center mt-6">
          <span className="animate-spin h-6 w-6 border-4 border-[#001840] border-t-transparent rounded-full" />
        </div>
      )}

      <div ref={loaderRef} className="h-10 mt-10" />
      <div aria-live="polite" className="sr-only">
        {loading ? "Loading more books…" : ""}
      </div>
    </section>
  );
};
