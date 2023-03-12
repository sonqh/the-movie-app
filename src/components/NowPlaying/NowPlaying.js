import React from "react";
import { Pagination, Spin } from "antd";
import PullToRefresh from "react-simple-pull-to-refresh";
import { FETCH_ENDPOINT, PAGE_SIZE } from "../../Constant/Constant";
import { useSelectedMovie } from "../Context/SelectedMovieContext";
import useFetchData from "../hook/useFetchData";
import MovieDetailsModal from "../Modal/MovieDetailsModal";
import MovieGrid from "../SegmentedControl/MoviesGrid";
import MovieList from "../SegmentedControl/MoviesList";
import MovieSkeleton from "../Skeleton/MovieSkeleton";

const NowPlaying = ({ viewMode }) => {
  const {
    data,
    handleRefresh,
    currentPage,
    handlePageChange,
    isLoading,
    refreshing,
    totalResult,
    errors,
  } = useFetchData(FETCH_ENDPOINT.NOW_PLAYING);

  const { selectedMovieContext } = useSelectedMovie();
  return (
    <>
      {isLoading && <MovieSkeleton />}
      {data && (
        <PullToRefresh onRefresh={handleRefresh} refreshing={refreshing}>
          {viewMode === "list" ? (
            <MovieList movies={data} />
          ) : (
            <MovieGrid movies={data} />
          )}

          <div className="flex justify-center my-10">
            <Pagination
              pageSize={PAGE_SIZE}
              current={errors ? 1 : currentPage}
              total={totalResult}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
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

export default NowPlaying;
