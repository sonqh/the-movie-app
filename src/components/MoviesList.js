import { Alert, Card, Pagination, Row, Spin } from "antd";
import axios from "axios";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";
import PullToRefresh from "react-simple-pull-to-refresh";
import MovieDetailsModal from "./Modal/MovieDetailsModal";

const { Meta } = Card;
const api_key = process.env.REACT_APP_TMDB_API_KEY;

const MovieList = ({ endpoint, title }) => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = useCallback(
    async (page) => {
      try {
        const { data } = await axios.get(endpoint, {
          params: { api_key: api_key, language: "en-US", page: page },
        });

        setMovieList(data.results);
        setTotalPages(data.total_pages);
        setIsLoading(false);
        setError(null);
      } catch (error) {
        setError("Error fetching movieList. Please try again later.");
        setCurrentPage(1);
        setIsLoading(false);
      }
    },
    [endpoint]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchData(currentPage);
  }, [currentPage, endpoint, fetchData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCardClick = (movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedMovie(null);
    setModalVisible(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, staggerChildren: 0.1 } },
    exit: { opacity: 0, transition: { ease: "easeInOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: "easeOut", duration: 0.5 },
    },
    exit: { opacity: 0, y: -50, transition: { ease: "easeInOut" } },
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchData(currentPage);
    setRefreshing(false);
  };

  return (
    <PullToRefresh onRefresh={handleRefresh} refreshing={refreshing}>
      <div className="container mx-auto my-10">
        {error && <Alert message={error} type="error" showIcon />}
        {!error && (
          <Spin spinning={isLoading}>
            <Row gutter={[16, 16]} justify="center">
              {isLoading ? (
                <div className="flex justify-center items-center mt-10">
                  <Spin size="large" />
                </div>
              ) : error ? (
                <div className="flex justify-center items-center mt-10">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {movieList.map((movie) => (
                    <motion.div
                      key={movie.id}
                      className="mb-4"
                      variants={cardVariants}
                      onClick={() => handleCardClick(movie)}
                    >
                      <Card
                        hoverable
                        className="h-full"
                        onClick={() => handleCardClick(movie)}
                        loading={isLoading}
                        cover={
                          <img
                            className={classNames(
                              "w-full",
                              "object-cover",
                              "transition-opacity",
                              "duration-500",
                              {
                                "opacity-50": isLoading,
                              }
                            )}
                            alt={movie.title}
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          />
                        }
                      >
                        <Meta
                          title={movie.title}
                          description={movie.overview}
                        />
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </Row>
            <div className="flex justify-center my-10">
              <Pagination
                current={currentPage}
                total={totalPages * 10}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>

            <AnimatePresence>
              {modalVisible && (
                <motion.div
                  key="modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ ease: "easeInOut" }}
                >
                  <MovieDetailsModal
                    movie={selectedMovie}
                    visible={modalVisible}
                    onClose={handleModalClose}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Spin>
        )}
      </div>
    </PullToRefresh>
  );
};

export default MovieList;
