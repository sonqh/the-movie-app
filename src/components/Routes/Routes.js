import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import MovieSearchList from "../MovieSearchList/MovieSearchList";
import NotFound from "../NotFound/NotFound";

const RoutesComponent = () => {
  return (
    <Routes>
      {/* <Route exact path="/login" element={<Movies />} /> */}
      <Route exact path="/home" element={<Home />} />
      <Route path="/search" element={<MovieSearchList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RoutesComponent;
