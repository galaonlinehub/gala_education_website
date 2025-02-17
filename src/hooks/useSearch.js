import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { apiGet } from "../services/api_service";
import { useNewClass } from "@/src/store/student/class";
import { useSearchResult } from "../store/search_result";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState({
    loading: false,
    resultsVisible: false,
  });
  const searchContainerRef = useRef(null);
  const { setOpenNewClass } = useNewClass();
  const { selectedItemId, setSelectedItemId } = useSearchResult();

  const clearSearch = () => {
    setSearchTerm("");
    setIsSearching({ loading: false, resultsVisible: false });
  };

  const { data: searchResults = [], refetch } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      const response = await apiGet(`search?q=${searchTerm}`);
      return response.data;
    },
    enabled: false,
    staleTime: 5000,
  });

  const performSearch = useCallback(() => {
    setIsSearching((prev) => ({
      ...prev,
      loading: true,
      resultsVisible: true,
    }));
    refetch().finally(() => {
      setIsSearching((prev) => ({
        ...prev,
        loading: false,
        resultsVisible: searchTerm.trim().length > 0,
      }));
    });
  }, [refetch, searchTerm]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch();
      } else {
        clearSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, performSearch]);

  const handleClickOutside = useCallback((event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      clearSearch();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const {
    data: classResults = [],
    refetch: refetchClasses,
    isFetching: isFetchingClasses,
  } = useQuery({
    queryKey: ["classes", selectedItemId],
    queryFn: async () => {
      if (!selectedItemId) return [];
      const response = await apiGet(`topic/${selectedItemId}/cohorts`);

      return response.data.data;
    },
    enabled: !!selectedItemId,
  });

  useEffect(() => {
    refetchClasses();
  }, [refetchClasses, selectedItemId]);

  const handleResultClick = (item) => {
    setSelectedItemId(item.id);
    setIsSearching((prev) => ({ ...prev, resultsVisible: false }));
    setOpenNewClass(true);
  };

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    searchContainerRef,
    clearSearch,
    handleResultClick,
    refetchClasses,
    classResults,
    isFetchingClasses,
  };
};
