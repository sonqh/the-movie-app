import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route exact path="/login" element={<Movies />} /> */}
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
