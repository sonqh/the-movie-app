import { Pagination, Spin } from "antd";
import React from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import { FETCH_ENDPOINT, PAGE_SIZE, VIEW_MODE } from "../../Constant/Constant";
import { useSelectedMovie } from "../Context/SelectedMovieContext";
import useFetchData from "../hook/useFetchData";
import MovieDetailsModal from "../Modal/MovieDetailsModal";
import MovieGrid from "../SegmentedControl/MoviesGrid";
import MovieList from "../SegmentedControl/MoviesList";

const TopRated = ({ viewMode }) => {
  const {
    data,
    handleRefresh,
    currentPage,
    handlePageChange,
    isLoading,
    refreshing,
    totalResult,
    errors,
  } = useFetchData(FETCH_ENDPOINT.TOP_RATED);

  const { selectedMovieContext } = useSelectedMovie();
  return (
    <>
      {isLoading && <Spin spinning={isLoading} />}
      {data && (
        <PullToRefresh onRefresh={handleRefresh} refreshing={refreshing}>
          {viewMode === VIEW_MODE.LIST ? (
            <MovieList movies={data} isLoading={isLoading} />
          ) : (
            <MovieGrid movies={data} isLoading={isLoading} />
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

export default TopRated;
