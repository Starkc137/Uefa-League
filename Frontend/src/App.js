import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Teams from './components/Teams';
import TeamDetails from './components/Teams/TeamDetails';
import TeamData from './components/TeamData';
import Nation from "./components/Nation";
import NationDetails from "./components/Nation/TeamDetails";
import Position from "./components/Position";
import PositionDetails from "./components/Position/TeamDetails";
import Search from "./components/Search";
import { Analytics } from "@vercel/analytics/react"

function App() {
  useEffect(() => {
    document.title = 'Uefa Fantasy';
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />} />
          <Route path="/team/:teamName" element={<TeamDetails />} />
          <Route path="data" element={<TeamData />} />
          <Route path="nation" element={<Nation />} />
          <Route path="/nation/:nation" element={<NationDetails />} />
          <Route path="position" element={<Position />} />
          <Route path="/position/:position" element={<PositionDetails />} />
          <Route path="search" element={<Search />} />
        </Route>
      </Routes>
      <Analytics/>
    </>
  );
}

export default App;