import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import "./HeaderWithSearchBar.css";
import { useNavigate, createSearchParams } from "react-router-dom";

const { Search } = Input;

const HeaderWithSearchBar = () => {
  const navigate = useNavigate();
  const handleSearch = (value) => {
    if (value.trim() !== "") {
      navigate({
        pathname: "/search",
        search: `?${createSearchParams({
          query: value,
        })}`,
      });
    }
  };
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow"
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-800 font-bold text-xl mb-0 flex items-center justify-center sm:justify-between"
          >
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
              alt="TMDB logo"
              className="w-16 sm:w-24 mr-2"
            />
          </motion.h1>
        </div>
        <div className="flex items-center">
          <Search
            placeholder="Search"
            className="w-64"
            onSearch={handleSearch}
            enterButton={
              <span className="text-gray-600 hover:text-gray-800">
                <SearchOutlined className="w-4 h-4 shadow-none" />
              </span>
            }
          />
        </div>
      </div>
    </motion.header>
  );
};

export default HeaderWithSearchBar;
