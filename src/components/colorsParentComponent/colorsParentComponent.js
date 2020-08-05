import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import "./colorsParentComponent.scss";

import SideMenuComponent from "../sideMenuComponent/sideMenuComponent";
import PaginationComponent from "../paginationComponent/paginationComponent";
import ColorDetailComponent from "../colorDetailComponent/colorDetailComponent";

function ColorsParentComponent(props) {
  const [totalColors, setTotalColors] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    axios
      .get("https://morning-spire-68989.herokuapp.com/getLastIndex")
      .then((results) => {
        setTotalColors(results.data.data);

        const pagesArray = [];
        for (let i = 1; i <= results.data.maxPages; i++) {
          pagesArray.push(i);
        }

        setPages(pagesArray);
        setCurrentPage(1);
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
        render={(props) => (
          <PaginationComponent
            {...props}
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      />
      <Route
        path='/colorDetail/:id'
        render={(props) => <ColorDetailComponent {...props} />}
      />
    </div>
  );
}

export default ColorsParentComponent;
