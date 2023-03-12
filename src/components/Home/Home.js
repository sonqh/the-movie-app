import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import { Segmented, Tabs } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { VIEW_MODE } from "../../Constant/Constant";
import NowPlaying from "../NowPlaying/NowPlaying";
import TopRated from "../TopRated/TopRated";

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

  return (
    <div className="flex items-center justify-between px-4 mb-2">
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
        <Tabs defaultActiveKey="now-playing" items={items} />
      </motion.div>
    </div>
  );
};

export default Home;
