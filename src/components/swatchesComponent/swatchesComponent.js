import React, { useState, useEffect } from "react";
import axios from "axios";

import "./swatchesComponent.scss";

function SwatchesComponent(props) {
  const currentPage = props.currentPage;
  const history = props.history;

  const [colorData, setColorData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://morning-spire-68989.herokuapp.com/getColorsByPagination?page=${currentPage}`
      )
      .then((results) => {
        // console.log("result", results);
        setColorData(results.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const handleSwatchClick = (event, colorId) => {
    history.push(`/colorDetail/${colorId}`);
  };

  return (
    <div className='swatches-container'>
      {/* {console.log("colorData", colorData)} */}
      {colorData.length > 0 ? (
        colorData.map((color) => {
          return (
            <div
              className='color-code-container'
              onClick={(event) => handleSwatchClick(event, color.id)}
            >
              <div
                className='color-display'
                style={{ backgroundColor: color.hexString }}
              ></div>
              <div className='color-label-container'>
                <h4>{color.hexString}</h4>
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}

export default SwatchesComponent;
