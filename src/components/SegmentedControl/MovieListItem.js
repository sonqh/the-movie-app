import React from "react";
import { motion } from "framer-motion";
import { List, Typography } from "antd";
import { StarOutlined, CalendarOutlined } from "@ant-design/icons";
import { useSelectedMovie } from "../Context/SelectedMovieContext";
import "./SegmentedControl.css";

const { Title, Text } = Typography;

const MovieListItem = ({ movie }) => {
  const { setSelectedMovieContext } = useSelectedMovie();
  const variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { ease: "easeInOut", duration: 0.5 } },
    exit: { opacity: 0, transition: { ease: "easeInOut", duration: 0.5 } },
  };

  const handleMovieClick = (movie) => {
    setSelectedMovieContext(movie);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      className="mr-6"
    >
      <List.Item
        className="flex flex-col sm:flex-row items-start sm:hover:bg-gray-200 transition-colors duration-100"
        onClick={() => handleMovieClick(movie)}
        style={{ transition: "transform 0.3s ease-in-out" }}
      >
        <motion.img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full sm:w-48 h-64 object-cover rounded-lg p-0 sm:p-4"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        />
        <motion.div
          className="flex-1 flex flex-col justify-between"
          variants={textVariants}
        >
          <motion.div variants={textVariants}>
            <Title level={5} className="font-bold text-center sm:text-left">
              {movie.title}
            </Title>
          </motion.div>
          <motion.div variants={textVariants}>
            <Text className="text-gray-500 text-sm text-center sm:text-left">
              {movie.overview}
            </Text>
          </motion.div>
          <motion.div
            className="flex items-center justify-between mt-2"
            variants={textVariants}
          >
            <div className="flex items-center">
              <StarOutlined className="text-yellow-500 mr-1" />
              <Text className="text-gray-500 text-sm mr-4">
                {movie.vote_average}
              </Text>
            </div>
            <div className="flex items-center">
              <CalendarOutlined className="text-gray-500 mr-1" />
              <Text className="text-gray-500 text-sm">
                {new Date(movie.release_date).toLocaleDateString()}
              </Text>
            </div>
          </motion.div>
        </motion.div>
      </List.Item>
    </motion.div>
  );
};
export default MovieListItem;
