"use client"
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { apiGet } from "../services/api_service";
import { useNewClass } from "@/src/store/student/class";
import { useSearchResult } from "../store/search_result";

export const useSearch = () => {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState({
    loading: false,
    resultsVisible: false,
  });
  const searchContainerRef = useRef(null);

  // External store hooks
  const {openNewClass, setOpenNewClass } = useNewClass();
  const { selectedItemId, setSelectedItemId } = useSearchResult();

  // Search query
  const {
    data: searchResults = { topics: [], teachers: [] },
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      const response = await apiGet(`search?q=${searchTerm}`);
      return response.data;
    },
    enabled: false,
    staleTime: 5000,
  });

  // Results query
  const {
    data: detailedResults = [],
    isFetching: isFetchingResults,
    refetch: refetchResults,
  } = useQuery({
    queryKey: ["search-results", selectedItemId.id, selectedItemId.type],
    queryFn: async () => {
      if (!selectedItemId.id || !selectedItemId.type) return [];

      const endpoint =
        selectedItemId.type === "instructor"
          ? `instructor/${selectedItemId.id}/profile`
          : `topic/${selectedItemId.id}/cohorts`;

      const response = await apiGet(endpoint);

      const res =
        selectedItemId.type === "instructor"
          ? response.data
          : response.data.data;

      return res;
    },
    enabled: !!selectedItemId.id && !!selectedItemId.type,
  });

  // Clear search functionality
  const clearSearch = useCallback(() => {
    setSearchTerm("");
    setIsSearching({ loading: false, resultsVisible: false });
    if (!openNewClass) {
      setSelectedItemId({ id: null, type: null });
    }  }, [setSelectedItemId, openNewClass]);

  // Perform search with debounce
  const performSearch = useCallback(() => {
    setIsSearching((prev) => ({
      ...prev,
      loading: true,
      resultsVisible: true,
    }));

    refetchSearch().finally(() => {
      setIsSearching((prev) => ({
        ...prev,
        loading: false,
        resultsVisible: searchTerm.trim().length > 0,
      }));
    });
  }, [refetchSearch, searchTerm]);

  // Search debounce effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch();
      } else {
        clearSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, performSearch, clearSearch]);

  // Click outside handler
  const handleClickOutside = useCallback(
    (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) 
      ) {
        clearSearch();
      }
    },
    [clearSearch]
  );

  // Click outside effect
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Handle result click
  const handleResultClick = useCallback(
    (item) => {
      const type = item.user ? "instructor" : "topic";
      setSelectedItemId({ id: item.id, type });
      setIsSearching((prev) => ({ ...prev, resultsVisible: false }));
      setOpenNewClass(true);
      refetchResults();
    },
    [setOpenNewClass, setSelectedItemId, refetchResults]
  );

  const isResultsEmpty =
    searchResults.topics.length === 0 && searchResults.teachers.length === 0;

  return {
    // Search state
    searchTerm,
    setSearchTerm,
    isSearching,
    searchContainerRef,
    isResultsEmpty,

    // Search results
    searchResults: [searchResults],
    detailedResults,
    isFetchingResults,

    // Actions
    clearSearch,
    handleResultClick,
  };
};
