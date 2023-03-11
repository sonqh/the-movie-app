import React from "react";
import { Card } from "antd";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useSelectedMovie } from "../Context/SelectedMovieContext";

const { Meta } = Card;

const MovieGrid = ({ movies, isLoading }) => {
  const { setSelectedMovieContext } = useSelectedMovie();
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

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeInOut", duration: 0.5 } },
    exit: { opacity: 0, transition: { ease: "easeInOut", duration: 0.5 } },
  };

  const handleCardClick = (movie) => {
    setSelectedMovieContext(movie);
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {(movies || []).map((movie) => (
        <motion.div key={movie.id} className="mb-4" variants={cardVariants}>
          <Card
            hoverable
            className="h-full"
            onClick={() => handleCardClick(movie)}
            loading={isLoading}
            cover={
              <motion.img
                className={classNames(
                  "w-full",
                  "object-cover",
                  "transition-opacity",
                  "duration-500"
                )}
                alt={movie.title}
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              />
            }
          >
            <Meta title={movie.title} description={movie.overview} />
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default MovieGrid;
