import React, { useEffect } from "react";
import { click } from "ol/events/condition";
import "./shapeSelect.scss";

const ShapeSelectComponent = ({ onChange, map }) => {
  const handleShapeSelect = (event) => {
    onChange(event.target.value);
  };

  useEffect(() => {
    if (!map) return;

    const handleClick = (event) => {
      if (click(event)) {
        console.log("Map clicked");
      }
    };

    map.on("singleclick", handleClick);

    return () => {
      map.un("singleclick", handleClick);
    };
  }, [map]);

  return (
    <div className="shapeSelect">
      <select defaultValue="None" onChange={handleShapeSelect}>
        <option value="Point">Point</option>
        <option value="LineString">Line</option>
        <option value="Polygon">Polygon</option>
        <option value="None">Click</option>
      </select>
    </div>
  );
};

export default ShapeSelectComponent;
