import React, { useEffect, useState } from "react";
import { Draw, Modify, Snap } from "ol/interaction";
import { WKT } from "ol/format";

const DrawComponent = ({ map, vectorSource, geometryType, saveGeometry }) => {
  useEffect(() => {
    if (!map) return;

    const draw = new Draw({
      source: vectorSource,
      type: geometryType,
    });

    draw.on("drawend", (event) => {
      const feature = event.feature;
      const format = new WKT();
      const wkt = format.writeFeature(feature, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      });
      console.log("WKT:", wkt);
      saveGeometry(wkt);
    });

    const modify = new Modify({ source: vectorSource });

    modify.on("modifyend", (event) => {
      const features = event.features.getArray();
      features.forEach((feature) => {
        console.log("d", feature.getGeometry());
      });
    });
    const snap = new Snap({ source: vectorSource });

    map.addInteraction(draw);
    map.addInteraction(modify);
    map.addInteraction(snap);

    return () => {
      map.removeInteraction(draw);
      map.removeInteraction(modify);
      map.removeInteraction(snap);
    };
  }, [map, vectorSource, geometryType, saveGeometry]);

  return null;
};

export default DrawComponent;
