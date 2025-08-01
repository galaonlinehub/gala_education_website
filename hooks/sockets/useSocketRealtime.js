
/**
 * Real-time data synchronization hook
 */
export const useSocketRealtime = (namespace, dataKey, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [metadata, setMetadata] = useState({
    isLoading: true,
    lastUpdate: null,
    error: null,
  });

  const { emit } = useSocketEmit(namespace);

  // Handle data updates
  useSocketEvent(namespace, `${dataKey}:update`, (newData) => {
    setData(newData);
    setMetadata((prev) => ({
      ...prev,
      isLoading: false,
      lastUpdate: Date.now(),
      error: null,
    }));
  });

  // Handle partial updates
  useSocketEvent(namespace, `${dataKey}:patch`, (patch) => {
    setData((prevData) => {
      if (typeof prevData === "object" && prevData !== null) {
        return { ...prevData, ...patch };
      }
      return patch;
    });
    setMetadata((prev) => ({
      ...prev,
      lastUpdate: Date.now(),
    }));
  });

  // Handle errors
  useSocketEvent(namespace, `${dataKey}:error`, (error) => {
    setMetadata((prev) => ({
      ...prev,
      isLoading: false,
      error: error.message || error,
    }));
  });

  // Subscribe on mount
  useEffect(() => {
    emit(`${dataKey}:subscribe`);

    return () => {
      emit(`${dataKey}:unsubscribe`);
    };
  }, [emit, dataKey]);

  return useMemo(
    () => ({
      data,
      ...metadata,
      refetch: () => emit(`${dataKey}:refresh`),
    }),
    [data, metadata, emit, dataKey]
  );
};