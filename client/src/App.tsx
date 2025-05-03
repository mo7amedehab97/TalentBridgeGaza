import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import TalentList from "./components/TalentList";

const App: React.FC = () => {
  return (
    <div className="App">
      <nav className="navbar">
        <Link to="/" className="nav-brand">
          TalentBridge Gaza
        </Link>
        <div className="nav-links">
          <Link to="/talents">Talents</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home">
                <h1>Welcome to TalentBridge Gaza</h1>
                <p>
                  Connecting talented individuals with opportunities in Gaza
                </p>
                <Link to="/talents" className="cta-button">
                  View Talents
                </Link>
              </div>
            }
          />
          <Route path="/talents" element={<TalentList />} />
          <Route
            path="/about"
            element={
              <div className="about">
                <h2>About TalentBridge Gaza</h2>
                <p>
                  We connect talented individuals with opportunities in Gaza,
                  helping to build a stronger community and economy.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
