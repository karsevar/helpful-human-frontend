import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import "./colorsParentComponent.scss";

import SideMenuComponent from "../sideMenuComponent/sideMenuComponent";
import PaginationComponent from "../paginationComponent/paginationComponent";
import ColorDetailComponent from "../colorDetailComponent/colorDetailComponent";

function ColorsParentComponent(props) {
  const [totalColors, setTotalColors] = useState(0);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getLastIndex")
      .then((results) => {
        setTotalColors(results.data.data);

        const pagesArray = [];
        for (let i = 1; i <= results.data.maxPages; i++) {
          pagesArray.push(i);
        }

        setPages(pagesArray);
      })
      .catch((error) => {
        console.log("error message", error);
      });
  }, []);

  return (
    <div className='colors-parent-container'>
      <SideMenuComponent totalColors={totalColors} />
      <Route
        exact
        path='/'
        render={(props) => <PaginationComponent {...props} pages={pages} />}
      />
      <Route
        path='/colorDetail/:id'
        render={(props) => <ColorDetailComponent {...props} />}
      />
      {console.log("maximum number of pages", pages)}
      {console.log("maximum number of colors", totalColors)}
    </div>
  );
}

export default ColorsParentComponent;
