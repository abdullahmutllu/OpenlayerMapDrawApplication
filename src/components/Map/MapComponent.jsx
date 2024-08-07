import React, { useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { defaults as defaultControls } from "ol/control";
import "ol/ol.css";

const MapComponent = ({ mapRef, setMap }) => {
  useEffect(() => {
    if (!mapRef.current) return;

    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const mapInstance = new Map({
      target: mapRef.current,
      layers: [osmLayer],
      view: new View({
        center: [3802451.929066548, 5031508.434096578],
        zoom: 5.6,
      }),
      controls: defaultControls({
        zoom: false, // Varsayılan zoom kontrolünü kapat
        rotate: false, // Varsayılan rotate kontrolünü kapat
        fullscreen: false, // Varsayılan fullscreen kontrolünü kapat
        attribution: false, // Varsayılan attribution kontrolünü kapat
      }),
    });

    setMap(mapInstance);

    return () => {
      mapInstance.setTarget(null);
    };
  }, [mapRef, setMap]);

  return <div ref={mapRef} className="map-container" style={{ height: "100%", width: "100%" }} />;
};

export default MapComponent;
