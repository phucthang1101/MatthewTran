import React from "react";

const SvgIcon = (props,{
  style = {},
  fill = "#000",
  width = "100%",
  className = "",
  viewBox = "0 0 60 60"
}) => (
    
  <svg
    width={props.width || width}
    style={style}
    height={props.width || width}
    viewBox={props.viewBox || viewBox}
    xmlns="http://www.w3.org/2000/svg"
    className={`svg-icon ${props.className || className}`}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
  {props.children}

  </svg>
);

export default SvgIcon;
