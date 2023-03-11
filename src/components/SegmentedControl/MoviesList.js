import React from "react";
import { List } from "antd";
import { motion } from "framer-motion";
import MovieListItem from "./MovieListItem";

const MovieList = ({ movies }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      {movies && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="mt-6"
        >
          <List
            itemLayout="horizontal"
            dataSource={movies}
            renderItem={(movie) => <MovieListItem movie={movie} />}
          />
        </motion.div>
      )}
    </>
  );
};

export default MovieList;
