import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import ShadesComponent from "../shadesComponent/shadesComponent";

import "./colorDetailComponent.scss";

function ColorDetailComponent(props) {
  const [colorInfo, setColorInfo] = useState({});
  const colorId = props.match.params.id;

  useEffect(() => {
    axios
      .get(`https://morning-spire-68989.herokuapp.com/getColorById/${colorId}`)
      .then((results) => {
        // console.log("results from getColorById endpoint", results);
        setColorInfo(results.data.data);
      })
      .catch((error) => {
        console.log("An error has happened", error);
      });
  }, [colorId]);

  const handleBackClick = (event) => {
    props.history.push("/");
  };

  return (
    <div className='color-detail-container'>
      {colorInfo.name ? (
        <>
          <div className='color-detail-view'>
            <div
              className='color-display'
              style={{ backgroundColor: colorInfo.hexString }}
            ></div>
            <div className='color-code-container'>
              <h4>{colorInfo.hexString}</h4>
            </div>
          </div>
          <ShadesComponent colorInfo={colorInfo} />
        </>
      ) : (
        <></>
      )}
      <div className='back-btn-container'>
        <button
          className='back-btn'
          onClick={(event) => handleBackClick(event)}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default ColorDetailComponent;
