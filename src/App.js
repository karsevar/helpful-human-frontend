import React from "react";
import "./App.css";

import HeaderComponent from "./components/headerComponent/headerComponent";
import SideMenuComponent from "./components/sideMenuComponent/sideMenuComponent";
import ColorsParentComponent from "./components/colorsParentComponent/colorsParentComponent";

function App() {
  return (
    <div className='App'>
      <HeaderComponent />
      <ColorsParentComponent />
    </div>
  );
}

export default App;
