import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/common/Header";
import Menu from "./components/common/Menu";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Category from "./components/pages/Category";
import Search from "./components/pages/Search";
import Detail from "./components/pages/Detail";

function App() {
  return (
    <div className="App">
      <Header />
      <Menu />
      <main>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/category/:id" Component={Category} />
          <Route path="/search" Component={Search} />
          <Route path="/detail/:id" Component={Detail} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
