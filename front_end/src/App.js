import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import STATE from "./context/initState";
import reducer from "./context/reducer";
import { UserProvider } from "./context/context";
import { Route, Routes } from "react-router-dom";
import { useReducer } from "react";

import Header from "./components/common/Header";
import Menu from "./components/common/Menu";
import Home from "./components/pages/Home";
import Category from "./components/pages/Category";
import Search from "./components/pages/Search";
import Detail from "./components/pages/Detail";
import Cart from "./components/pages/Cart";
import Checkout from "./components/pages/Checkout";

function App() {
  let storage = localStorage.getItem("state");
  if (storage != null) {
    storage = JSON.parse(storage);
  } else {
    storage = STATE;
  }
  const [state, dispatch] = useReducer(reducer, storage);
  return (
    <UserProvider value={{ state, dispatch }}>
      <div className="App">
        <Header />
        <Menu />
        <main>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/category/:id" Component={Category} />
            <Route path="/search" Component={Search} />
            <Route path="/detail/:id" Component={Detail} />
            <Route path="/cart" Component={Cart} />
            <Route path="/checkout" Component={Checkout} />
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
