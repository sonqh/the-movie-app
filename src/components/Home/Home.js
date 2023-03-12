import {
  AppstoreOutlined,
  BarsOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Layout, Segmented, Tabs, Input } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { VIEW_MODE } from "../../Constant/Constant";
import { SelectedMovieProvider } from "../Context/SelectedMovieContext";
import HeaderWithSearchBar from "../Header/HeaderWithSearchBar";
import MovieSearchList from "../MovieSearchList/MovieSearchList";
import NowPlaying from "../NowPlaying/NowPlaying";
import TopRated from "../TopRated/TopRated";

const { Search } = Input;

const { Header, Footer, Content } = Layout;

const Home = () => {
  const [viewMode, setViewMode] = useState(VIEW_MODE.GRID);

  const variants = {
    visible: {
      opacity: 1,
      x: 5,
      transition: { duration: 0.5 },
    },
    hidden: {
      opacity: 0,
      x: -20,
    },
  };

  const items = [
    {
      key: "now-playing",
      label: `Now Playing`,
      children: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <NowPlaying viewMode={viewMode} />
        </motion.div>
      ),
    },
    {
      key: "top-rated",
      label: `Top Rated`,
      children: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TopRated viewMode={viewMode} />
        </motion.div>
      ),
    },
  ];

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };
  const handleSearch = (mode) => {
    console.log("handleSearch == ", mode);
  };

  return (
    <Layout className="min-h-screen">
      <HeaderWithSearchBar handleSearch={handleSearch} />
      <Content className="bg-gray-100 flex-grow overflow-y-auto">
        <div className="bg-gray-100 flex-grow overflow-y-auto">
          <div className="flex items-center justify-between px-4 mt-6 mb-2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              className="w-full"
            >
              <div className="flex justify-end space-x-1">
                <Segmented
                  value={viewMode}
                  options={[
                    {
                      value: VIEW_MODE.GRID,
                      icon: <AppstoreOutlined />,
                    },
                    {
                      value: VIEW_MODE.LIST,
                      icon: <BarsOutlined />,
                    },
                  ]}
                  onChange={handleViewChange}
                />
              </div>
              <SelectedMovieProvider>
                <Tabs defaultActiveKey="now-playing" items={items} />
              </SelectedMovieProvider>
              <MovieSearchList movies={[]} />
            </motion.div>
          </div>
        </div>
      </Content>
      <Footer className="text-center text-gray-500 text-sm py-5">
        © {new Date().getFullYear()} Movie Home. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default Home;
