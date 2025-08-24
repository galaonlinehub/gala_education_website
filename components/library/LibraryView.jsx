"use client";
import { Select } from "antd";
import Image from "next/image";
import { useEffect, useState, useRef, useCallback } from "react";
import { LuCalendar } from "react-icons/lu";
import "antd/dist/reset.css"; // Optional if you're customizing AntD theme

const SUBJECTS = [
  { label: "Science Fiction", value: "science_fiction" },
  { label: "Fantasy", value: "fantasy" },
  { label: "Romance", value: "romance" },
  { label: "History", value: "history" },
  { label: "All Subjects", value: "all" },
];

const LIMIT = 12;

export const LibraryView = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [subject, setSubject] = useState("science_fiction");
  const [searchTerm, setSearchTerm] = useState("");
  const loaderRef = useRef(null);

  const fetchBooks = useCallback(() => {
    setLoading(true);

    const url =
      subject === "all"
        ? `https://openlibrary.org/search.json?q=${searchTerm || "book"}&limit=${LIMIT}&offset=${page * LIMIT}`
        : `https://openlibrary.org/subjects/${subject}.json?limit=${LIMIT}&offset=${page * LIMIT}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const newBooks = subject === "all" ? data.docs : data.works || [];
        setBooks((prev) => [...prev, ...newBooks]);
        setHasMore(newBooks.length === LIMIT);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setHasMore(false);
      });
  }, [page, subject, searchTerm]);

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

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBooks([]);
      setPage(0);
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchTerm, subject]);

  return (
    <section className="px-2 py-4 sm:px-4 md:px-10 h-full">
      <h2 className="text-2xl font-bold text-[#001840] mb-6">
        📚 Explore the Library
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-between">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001840] transition"
        />
        <Select
          value={subject}
          onChange={(value) => {
            setBooks([]);
            setPage(0);
            setSubject(value);
          }}
          options={SUBJECTS}
          size="large"
          className="w-full sm:w-1/3 [&_.ant-select-selector]:!rounded-md [&_.ant-select-selector]:!border-gray-300 [&_.ant-select-selector]:!shadow-sm hover:[&_.ant-select-selector]:!border-[#001840] transition-all"
          dropdownStyle={{ borderRadius: 8 }}
          popupMatchSelectWidth={false}
          showSearch
          optionFilterProp="label"
          aria-label="Select book subject"
        />
      </div>

      <div className="grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6">
        {books.map((book) => {
          const coverId = book.cover_id || book.cover_i;
          const coverUrl = coverId
            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
            : "/no-cover.png";

          const archiveId = book.availability?.identifier;
          const readableUrl = archiveId
            ? `https://archive.org/details/${archiveId}/mode/2up?view=theater`
            : `https://openlibrary.org${book.key || `/works/${book.cover_edition_key}`}`;

          const title = book.title || "Untitled";
          const author = book.authors?.[0]?.name || book.author_name?.[0] || "Unknown Author";
          const year = book.first_publish_year || book.publish_year?.[0];

          return (
            <div
              key={book.key || book.cover_edition_key}
              tabIndex={0}
              role="group"
              aria-label={`Book: ${title}`}
              className="bg-white shadow-sm rounded-lg p-4 flex flex-col justify-between border border-gray-100 hover:shadow-md shadow-black/25 hover:scale-[1.02] transition-transform duration-200 ease-out"
            >
              <div className="relative h-48 mb-3">
                <Image
                  src={coverUrl}
                  alt={title}
                  fill
                  loading="lazy"
                  className="object-cover rounded"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-sm font-semibold text-[#001840] leading-tight line-clamp-2">
                  {title}
                </h3>
                <p className="text-xs text-gray-600 mt-1 flex justify-between items-center w-full">
                  <span>{author}</span>
                  {year && (
                    <span className="text-xs text-gray-500 mt-1 flex gap-1 items-center">
                      <LuCalendar />
                      <span className="font-bold">{year}</span>
                    </span>
                  )}
                </p>
              </div>
              <a
                href={readableUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read ${title} by ${author}`}
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
            No books found. Try a different subject or search term.
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
