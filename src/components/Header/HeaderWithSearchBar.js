import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import "./HeaderWithSearchBar.css";

const { Search } = Input;

const HeaderWithSearchBar = ({ handleSearch }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow"
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-800 font-bold text-xl"
          >
            My App
          </motion.h1>
        </div>
        <div className="flex items-center">
          <Search
            placeholder="Search"
            className="w-64"
            onSearch={handleSearch}
            // enterButton
            enterButton={
              //   <SearchOutlined className="text-yellow-500 mr-2 mb-1" />
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
