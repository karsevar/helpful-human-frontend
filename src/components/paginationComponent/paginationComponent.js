import React, { useState } from "react";
import "./paginationComponent.scss";

import SwatchesComponent from "../swatchesComponent/swatchesComponent";

function PaginationComponent(props) {
  const handlePaginationClick = (event, pageNum) => {
    console.log("page clicked", pageNum);
    setCurrentPage(pageNum);
  };

  const pages = props.pages;
  const history = props.history;

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className='swatches-pagination-container'>
      <SwatchesComponent currentPage={currentPage} history={history} />
      <div className='pagination-container'>
        {pages.map((page, index) => {
          return (
            <div
              key={index}
              className={currentPage == page ? "page selected-page" : "page"}
              onClick={(event) => handlePaginationClick(event, page)}
            >
              <h4>{page}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PaginationComponent;
