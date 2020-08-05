import React, { useState, useEffect } from "react";
import "./shadesComponent.scss";

function ShadesComponent(props) {
  const colorInfo = props.colorInfo;

  const hexToRgb = (hex) => {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const rgbToHex = (red, green, blue) => {
    return (
      "#" +
      ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)
    );
  };

  const lightenOrDarken = (colorRGB, percent) => {
    let resultRGB = { ...colorRGB };
    resultRGB.r += Math.round(resultRGB.r * percent);
    resultRGB.g += Math.round(resultRGB.g * percent);
    resultRGB.b += Math.round(resultRGB.b * percent);
    return resultRGB;
  };

  const [shadesArray, setShadesArray] = useState([]);

  useEffect(() => {
    const colorRGB = hexToRgb(colorInfo.hexString);
    const darkPercentages = [-0.3, -0.15];
    const lightPercentages = [0.15, 0.3];

    const darkShades = darkPercentages.map((percentage) => {
      const darkShade = lightenOrDarken(colorRGB, percentage);
      return darkShade;
    });

    const lightShades = lightPercentages.map((percentage) => {
      const lightShade = lightenOrDarken(colorRGB, percentage);
      return lightShade;
    });

    setShadesArray([...darkShades, colorRGB, ...lightShades]);
  }, [colorInfo]);

  return (
    <div className='shades-container'>
      {console.log("shades array", shadesArray)}
      {shadesArray.map((shade) => {
        return (
          <div className='shade-card'>
            <div
              className='color-display'
              style={{
                backgroundColor: rgbToHex(shade.r, shade.g, shade.b),
              }}
            ></div>
            <div className='color-title-container'>
              <h4>{rgbToHex(shade.r, shade.g, shade.b)}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShadesComponent;
