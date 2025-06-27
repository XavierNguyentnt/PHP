import "./App.css";
import Header from "./components/common/Header";
import Menu from "./components/common/Menu";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Category from "./components/pages/Category";
import Search from "./components/pages/Search";
import Detail from "./components/pages/Detail";
import { useReducer } from "react";
import STATE from "./context/initState";
import reducer from "./context/reducer";
import { UserProvider } from "./context/context";

function App() {
  let storage = localStorage.getItem("state");
  if (storage != null) {
    // Use the stored state if it exists, otherwise use the initial state
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
          </Routes>
        </main>
      </div>
    </UserProvider>
  );
}

export default App;
