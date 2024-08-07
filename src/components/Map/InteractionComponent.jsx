import React, { useEffect, useRef } from "react";
import Select from "ol/interaction/Select";
import { Modify } from "ol/interaction";

const InteractionComponent = ({ map, onSelect, isDrawing, isModifying, onModifyStart }) => {
  const selectRef = useRef(null);
  const modifyRef = useRef(null);

  useEffect(() => {
    if (!map) return;

    const select = new Select();
    select.on("select", (event) => {
      const selectedFeatures = event.target.getFeatures();
      if (selectedFeatures.getLength() > 0) {
        const selectedFeature = selectedFeatures.item(0);
        onSelect(selectedFeature);
      } else {
        onSelect(null);
      }
    });

    selectRef.current = select;

    if (!isDrawing) {
      map.addInteraction(selectRef.current);
    }

    return () => {
      if (selectRef.current) {
        map.removeInteraction(selectRef.current);
      }
    };
  }, [map, onSelect]);

  useEffect(() => {
    if (!map) return;

    const modify = new Modify({
      source: map.getLayers().getArray()[1].getSource(), // vectorSource
    });

    modify.on(["modifystart", "modifyend"], (evt) => {
      map.getTargetElement().style.cursor = evt.type === "modifystart" ? "grabbing" : "pointer";
    });

    modifyRef.current = modify;

    if (isModifying) {
      map.addInteraction(modifyRef.current);
    } else {
      map.removeInteraction(modifyRef.current);
    }

    return () => {
      if (modifyRef.current) {
        map.removeInteraction(modifyRef.current);
      }
    };
  }, [map, isModifying]);

  useEffect(() => {
    if (!map || !selectRef.current) return;

    if (isDrawing) {
      map.removeInteraction(selectRef.current);
    } else {
      map.addInteraction(selectRef.current);
    }
  }, [map, isDrawing]);

  return null;
};

export default InteractionComponent;
