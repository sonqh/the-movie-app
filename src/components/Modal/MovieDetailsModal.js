import { ClockCircleOutlined, StarOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import React, { memo } from "react";
import { useSelectedMovie } from "../Context/SelectedMovieContext";

const MovieDetailsModal = memo(({ movie, visible }) => {
  const { setSelectedMovieContext } = useSelectedMovie();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2 } },
    exit: { opacity: 0, transition: { ease: "easeInOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { ease: "easeInOut" } },
  };

  const handleModalClose = (e) => {
    setSelectedMovieContext(null);
  };

  return (
    <>
      {movie && (
        <AnimatePresence>
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: "easeInOut" }}
          >
            <Modal
              title={movie.title}
              open={visible}
              onCancel={handleModalClose}
              footer={null}
              className="text-center"
              bodyStyle={{ paddingBottom: "20px" }}
            >
              <motion.div
                className="flex justify-center items-center mb-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.img
                  alt={movie.title}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : ""
                  }
                  className="h-96 rounded-lg shadow-md"
                  whileHover={{ scale: 1.1 }}
                />
              </motion.div>
              <div className="mx-4">
                <motion.p
                  className="text-left mb-4"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {movie.overview}
                </motion.p>
                <div className="flex flex-wrap justify-center items-center mb-4">
                  <motion.p
                    className="w-full md:w-auto md:mr-4 mb-2 md:mb-0 text-left"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <ClockCircleOutlined /> {movie.release_date}
                  </motion.p>
                  <motion.p
                    className="w-full md:w-auto md:mr-4 mb-2 md:mb-0"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <StarOutlined className="text-yellow-500 mr-1" />
                    {movie.vote_average}
                  </motion.p>
                  <motion.p
                    className="w-full md:w-auto mb-2 md:mb-0"
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <strong>Vote Count:</strong> {movie.vote_count}
                  </motion.p>
                </div>
              </div>
            </Modal>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
});
export default MovieDetailsModal;
