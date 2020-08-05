import React from "react";
import helpfulHumanLogo from "../../images/logo-symbol.svg";
import "./headerComponent.scss";

function HeaderComponent() {
  return (
    <div className='header-container'>
      <div className='logo-container'>
        <img src={helpfulHumanLogo} />
      </div>
      <div className='search-input-container'>
        <input
          type='text'
          id='colorHexCode'
          name='colorHexCode'
          placeholder='Search'
        ></input>
      </div>
    </div>
  );
}

export default HeaderComponent;
