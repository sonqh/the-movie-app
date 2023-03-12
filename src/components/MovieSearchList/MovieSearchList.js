import { motion } from "framer-motion";
import { Input, List } from "antd";
// import "antd/dist/antd.css";
// import "./styles.css";

const { Search } = Input;

const MovieSearchList = ({ movies }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex justify-center">
        <Search
          placeholder="Search movies"
          style={{ width: 400 }}
          size="large"
        />
      </div>

      <div className="my-8">
        <List
          itemLayout="horizontal"
          dataSource={movies}
          renderItem={(movie) => (
            <List.Item>
              <List.Item.Meta
                avatar={<img alt={movie.title} src={movie.poster} />}
                title={<a href={movie.link}>{movie.title}</a>}
                description={movie.description}
              />
            </List.Item>
          )}
        />
      </div>
    </motion.div>
  );
};

export default MovieSearchList;
