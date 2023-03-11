import { createContext, useContext, useState } from "react";

const SelectedMovieContext = createContext();

export const useSelectedMovie = () => useContext(SelectedMovieContext);

export const SelectedMovieProvider = ({ children }) => {
  const [selectedMovieContext, setSelectedMovieContext] = useState(null);

  return (
    <SelectedMovieContext.Provider
      value={{ selectedMovieContext, setSelectedMovieContext }}
    >
      {children}
    </SelectedMovieContext.Provider>
  );
};
