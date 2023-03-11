import { Layout, Tabs } from "antd";
import { motion } from "framer-motion";
import React from "react";
import NowPlaying from "../NowPlaying/NowPlaying";
import TopRated from "../TopRated/TopRated";

const { Header, Footer, Content } = Layout;

const Home = () => {
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
          <NowPlaying />
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
          <TopRated />
        </motion.div>
      ),
    },
  ];

  return (
    <Layout className="h-screen">
      <Header className="bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 p-2">My Movie Home</h1>
      </Header>
      <Content className="bg-gray-100 flex-grow overflow-y-auto">
        <div className="px-4 mt-6 mb-2">
          <motion.div initial="hidden" animate="visible" variants={variants}>
            <Tabs defaultActiveKey="now-playing" items={items} />
          </motion.div>
        </div>
      </Content>
      <Footer className="text-center text-gray-500 text-sm py-5">
        © {new Date().getFullYear()} Movie Home. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default Home;
