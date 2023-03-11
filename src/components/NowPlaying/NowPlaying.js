import React from "react";
import MovieList from "../MoviesList";

const NowPlaying = () => {
  const endpoint = "https://api.themoviedb.org/3/movie/now_playing";
  const title = "Now Playing";

  return <MovieList endpoint={endpoint} title={title} />;
};

export default NowPlaying;
