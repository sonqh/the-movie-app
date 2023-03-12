import { Pagination } from "antd";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import PullToRefresh from "react-simple-pull-to-refresh";
import { PAGE_SIZE, SEARCH_ENDPOINT } from "../../Constant/Constant";
import { useSelectedMovie } from "../Context/SelectedMovieContext";
import useFetchData from "../hook/useFetchData";
import MovieDetailsModal from "../Modal/MovieDetailsModal";
import MovieList from "../SegmentedControl/MoviesList";
import MovieSkeleton from "../Skeleton/MovieSkeleton";

const MovieSearchList = ({ movies }) => {
  let [searchParams] = useSearchParams();
  const searchValue = useMemo(() => searchParams.get("query"), [searchParams]);
  const { selectedMovieContext } = useSelectedMovie();
  const {
    data,
    handleRefresh,
    currentPage,
    handlePageChange,
    isLoading,
    refreshing,
    totalResult,
    errors,
  } = useFetchData(SEARCH_ENDPOINT.MOVIE, searchValue);

  useEffect(() => {
    handleRefresh();
  }, [searchValue, handleRefresh]);

  return (
    <>
      {isLoading && <MovieSkeleton />}
      {data && (
        <PullToRefresh onRefresh={handleRefresh} refreshing={refreshing}>
          <MovieList movies={data} />
          {data.length > 0 && (
            <div className="flex justify-center my-10">
              <Pagination
                pageSize={PAGE_SIZE}
                current={errors ? 1 : currentPage}
                total={totalResult}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}

          {!!selectedMovieContext && (
            <MovieDetailsModal
              movie={selectedMovieContext}
              visible={!!selectedMovieContext}
            />
          )}
        </PullToRefresh>
      )}
    </>
  );
};

export default MovieSearchList;
