import React, { useEffect } from "react";
import VectorLayer from "ol/layer/Vector";
import { WKT } from "ol/format";

const LayerComponent = ({ map, vectorSource }) => {
  useEffect(() => {
    if (!map) return;

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vectorLayer);

    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [map, vectorSource]);

  return null;
};

export default LayerComponent;
