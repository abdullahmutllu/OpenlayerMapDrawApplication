import React, { useEffect } from "react";
import { WKT } from "ol/format";
import { Feature } from "ol";
import { Select } from "ol/interaction";
import { click } from "ol/events/condition";

const Drawing = ({ vectorSource, datas, map }) => {
  useEffect(() => {
    if (!vectorSource || !datas || !map) return;

    const format = new WKT();
    vectorSource.clear();
    datas.forEach((data) => {
      const { wkt, description, id } = data;

      try {
        const feature = format.readFeature(wkt, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        });

        feature.setProperties({
          dataId: id,
          description: description,
          wkt: wkt,
        });

        vectorSource.addFeature(feature);
      } catch (error) {
        console.error("Geçersiz WKT:", data, error);
      }
    });

    const select = new Select({
      condition: click,
    });

    map.addInteraction(select);

    return () => {
      vectorSource.clear();
      map.removeInteraction(select);
    };
  }, [vectorSource, datas, map]);

  return null;
};

export default Drawing;
