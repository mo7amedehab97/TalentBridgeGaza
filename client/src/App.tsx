import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import TalentList from "./components/TalentList";
import Header from "./components/Header";
import Banner from "./components/Banner";
import DemoPage from "./components/DemoPage";
import { Footer } from "./components/ui";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Banner />} />
          <Route path="/talents" element={<TalentList />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route
            path="/about"
            element={
              <div className="about">
                <h2 className="text-dark-gray">About TalentBridge Gaza</h2>
                <p className="text-dark-gray">
                  We connect talented individuals with opportunities in Gaza,
                  helping to build a stronger community and economy.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
