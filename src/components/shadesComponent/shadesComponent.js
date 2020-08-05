import React, { useState, useEffect } from "react";

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

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
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
    const darkPercentages = [-0.25, -0.5];
    const lightPercentages = [0.25, 0.5];

    const darkShades = darkPercentages.map((percentage) => {
      const darkShade = lightenOrDarken(colorRGB, percentage);
      return rgbToHex(darkShade.r, darkShade.g, darkShade.b);
    });

    const lightShades = lightPercentages.map((percentage) => {
      const lightShade = lightenOrDarken(colorRGB, percentage);
      return rgbToHex(lightShade.r, lightShade.g, lightShade.b);
    });

    setShadesArray([...darkShades, colorInfo.hexString, ...lightShades]);
  }, [colorInfo]);

  return (
    <div className='shades-container'>
      {console.log("from shadesArray state hook", shadesArray)}
    </div>
  );
}

export default ShadesComponent;
