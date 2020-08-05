import React from "react";
import { useHistory } from "react-router-dom";
import "./sideMenuComponent.scss";

function SideMenuComponent(props) {
  const history = useHistory();

  const mainColors = [
    "Red",
    "Orange",
    "Yellow",
    "Green",
    "Blue",
    "Purple",
    "Brown",
    "Gray",
  ];

  const totalColors = props.totalColors;

  const handleRandomClick = (event) => {
    const randomNumber = Math.round(Math.random() * (totalColors - 1) + 1);
    console.log("random number generator test", randomNumber);
    history.push(`/colorDetail/${randomNumber}`);
  };

  return (
    <div className='side-menu-container'>
      <div className='random-btn-container'>
        <button
          className='random-btn'
          onClick={(event) => handleRandomClick(event)}
        >
          Random Color
        </button>
      </div>
      <div className='main-color-menu'>
        {mainColors.map((color) => {
          return (
            <div className='main-color-container'>
              <h3>{color}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideMenuComponent;
