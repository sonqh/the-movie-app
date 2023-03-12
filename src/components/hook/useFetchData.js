import { notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import api from "../../providers/api";
import usePrevious from "./usePrevious";

const api_key = process.env.REACT_APP_TMDB_API_KEY;

const useFetchData = (endpoint, query) => {
  const [data, setData] = useState(null);
  const [errors, setErrors] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResult, setTotalResult] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const prevCurrentPage = usePrevious(currentPage);
  const prevEndpoint = usePrevious(endpoint);

  const fetchData = useCallback(
    async (page) => {
      setIsLoading(true);
      try {
        const response = await api.get(endpoint, {
          params: {
            api_key: api_key,
            language: "en-US",
            page: page,
            ...(query && { query }),
          },
        });
        setData(response.data.results);
        setTotalResult(response.data.total_results);
        setTotalPages(response.data.total_pages);
        setIsLoading(false);
        setErrors(null);
      } catch (error) {
        if (error?.response?.data) {
          const { errors } = error.response.data;
          errors.map((errorMessage) => {
            return notification.error({
              message: "Operation failed",
              description: errorMessage,
            });
          });
          setCurrentPage(1);
          setErrors(errors);
          setIsLoading(false);
        }
      }
    },
    [endpoint, query]
  );

  useEffect(() => {
    if (
      currentPage &&
      (prevCurrentPage !== currentPage || prevEndpoint !== endpoint)
    ) {
      fetchData(currentPage);
    }
  }, [currentPage, fetchData, prevCurrentPage, prevEndpoint, endpoint]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchData(currentPage);
    setRefreshing(false);
  }, [currentPage, fetchData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return {
    data,
    errors,
    handleRefresh,
    currentPage,
    totalPages,
    handlePageChange,
    isLoading,
    refreshing,
    totalResult,
  };
};

export default useFetchData;
