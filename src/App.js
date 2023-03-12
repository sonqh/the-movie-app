import { Layout } from "antd";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { SelectedMovieProvider } from "./components/Context/SelectedMovieContext";
import HeaderWithSearchBar from "./components/Header/HeaderWithSearchBar";
import RoutesComponent from "./components/Routes/Routes";

const { Footer, Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <Layout className="min-h-screen">
        <HeaderWithSearchBar />
        <Content className="bg-gray-100 flex-grow overflow-y-auto">
          <div className="bg-gray-100 flex-grow overflow-y-auto">
            <div className="flex items-center justify-between px-4 mt-6 mb-2">
              <SelectedMovieProvider>
                <RoutesComponent />
              </SelectedMovieProvider>
            </div>
          </div>
        </Content>
        <Footer className="text-center text-gray-500 text-sm py-5">
          © {new Date().getFullYear()} Movie Home. All rights reserved.
        </Footer>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
