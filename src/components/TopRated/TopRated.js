import React from "react";
import MovieList from "../MoviesList";

const TopRated = () => {
  const endpoint = "https://api.themoviedb.org/3/movie/top_rated";
  const title = "Top Rate";

  return <MovieList endpoint={endpoint} title={title} />;
};

export default TopRated;
