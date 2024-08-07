import React, { useState, useRef, useEffect } from "react";
import MapComponent from "./components/Map/MapComponent";
import DrawComponent from "./components/Map/DrawComponent";
import LayerComponent from "./components/Map/LayerComponent";
import InteractionComponent from "./components/Map/InteractionComponent";
import ShapeSelectComponent from "./components/ShapeSelect/ShapeSelectComponent";
import VectorSource from "ol/source/Vector";
import "./App.css";
import ModalComponent from "./components/Modals/ModalCompoenent";
import Drawing from "./components/Drawing";
import { WKT } from "ol/format";
import FeatureModal from "./components/Modals/FeatureModal/FeatureModal";
import Toastr, { showSuccessToast, showErrorToast } from "./toastr/toast";
import DataTableComponent from "./components/DataTable/DataTableComponent";
import { fetchCoordinates, saveGeometry, updateGeometry, deleteGeometry } from "./components/ApiComponent";

const App = () => {
  const [selectedGeometryType, setSelectedGeometryType] = useState(null);
  const [vectorSource] = useState(new VectorSource());
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [saveGeometryCallback, setSaveGeometryCallback] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wktData, setWktData] = useState("");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [datas, setDatas] = useState([]);
  const [editingFeature, setEditingFeature] = useState(null);
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false);
  const [selectedFeatureDescription, setSelectedFeatureDescription] = useState("");
  const [selectedFeatureId, setSelectedFeatureId] = useState("");
  const [selectedFeatureWkt, setSelectedFeatureWkt] = useState("");
  const [tableVisible, setTableVisible] = useState(true);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleGeometryTypeChange = (type) => {
    if (type === "None") {
      setSelectedGeometryType(null);
    } else {
      setSelectedGeometryType(type);
    }
  };

  const handleSelectFeature = (feature) => {
    if (!feature) {
      console.log("Özellik seçilmedi");
      setSelectedFeature(null);
      return;
    }

    setSelectedFeature(feature);

    let description = feature.get("description") || "";
    let wkt = feature.get("wkt") || "";
    let id = feature.get("dataId") || feature.getId();

    if (description || wkt || id) {
      setSelectedFeatureDescription(description);
      setSelectedFeatureId(id);
      setSelectedFeatureWkt(wkt);
      setIsFeatureModalOpen(true);
    } else {
      console.log("Seçilen özelliğin detayları bulunamadı");
    }
  };

  const handleFeatureModalClose = () => {
    setIsFeatureModalOpen(false);
  };

  const saveGeometryHandler = (geometry) => {
    setWktData(geometry);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSave = (name) => {
    saveGeometry(wktData, name, setDatas);
    setIsModalOpen(false);
  };

  const handleFeatureDelete = async () => {
    deleteGeometry(selectedFeatureId, setDatas);
    setIsFeatureModalOpen(false);
  };

  const handleModifyStart = (feature) => {
    if (!feature) {
      showErrorToast("Çizim bulunamadı.");
      return;
    }

    const geometry = feature.getGeometry();
    if (!geometry) {
      showErrorToast("Geçerli bir geometri bulunamadı.");
      return;
    }

    const format = new WKT();
    const wkt = format.writeFeature(feature, {
      dataProjection: "EPSG:4326",
      featureProjection: "EPSG:3857",
    });

    const featureId = feature.get("dataId") || feature.getId();
    const featureDescription = feature.get("description") || "";

    setWktData(wkt);
    setSelectedFeatureId(featureId);
    setSelectedFeatureDescription(featureDescription);
    setEditingFeature(feature);
    setIsFeatureModalOpen(false);
    setIsUpdateMode(true);
    showSuccessToast("Çizim güncelleme açık");
  };

  const handleSaveUpdate = async () => {
    try {
      if (!editingFeature || !selectedFeatureId) {
        showErrorToast("Güncellenecek çizim bulunamadı.");
        return;
      }

      const format = new WKT();
      const updatedWkt = format.writeFeature(editingFeature, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      });

      await updateGeometry(selectedFeatureId, updatedWkt, selectedFeatureDescription, setDatas);
      setEditingFeature(null);
      setIsUpdateMode(false);
      showSuccessToast("Çizim güncellemesi kaydedildi");

      fetchCoordinates(setDatas);
    } catch (error) {
      console.error("Güncelleme sırasında hata oluştu:", error);
      showErrorToast("Güncelleme kaydedilemedi. Lütfen tekrar deneyin.");
    }
  };

  const handleCancelUpdate = () => {
    setEditingFeature(null);
    setIsUpdateMode(false);
    showSuccessToast("Çizim güncelleme iptal edildi");
  };

  const toggleTable = () => {
    setIsTableVisible(!isTableVisible);
    if (!isTableVisible) {
      setTableVisible(true);
    }
  };

  useEffect(() => {
    if (map) {
      setSaveGeometryCallback((saveFunction) => saveFunction);
      fetchCoordinates(setDatas);
    }
  }, [map]);

  return (
    <div className="App">
      <nav className="navbar">
        <ShapeSelectComponent className="shapeButton" onChange={handleGeometryTypeChange} />
        <button className="navbar-button" onClick={toggleTable}>
          {isTableVisible ? "Tabloyu Gizle" : "Tabloyu Göster"}
        </button>
        {isTableVisible && (
          <DataTableComponent
            datas={datas}
            setDatas={setDatas}
            map={map}
            setTableVisible={setTableVisible}
            setIsTableVisible={setIsTableVisible}
          />
        )}
      </nav>
      <div class="map-container">
        <MapComponent mapRef={mapRef} setMap={setMap} />
      </div>

      {map && (
        <>
          {selectedGeometryType && (
            <DrawComponent
              map={map}
              vectorSource={vectorSource}
              geometryType={selectedGeometryType}
              saveGeometry={saveGeometryHandler}
            />
          )}
          <Drawing vectorSource={vectorSource} datas={datas} map={map} />
          <LayerComponent map={map} vectorSource={vectorSource} />
          <InteractionComponent
            map={map}
            onSelect={handleSelectFeature}
            isDrawing={selectedGeometryType !== null}
            isModifying={isUpdateMode}
            onModifyStart={handleModifyStart}
          />
          <ModalComponent
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onSave={handleModalSave}
            onDelete={handleFeatureDelete}
          />
          <FeatureModal
            isOpen={isFeatureModalOpen}
            onClose={handleFeatureModalClose}
            description={selectedFeatureDescription}
            wkt={selectedFeatureWkt}
            id={selectedFeatureId}
            fetchCoordinates={() => fetchCoordinates(setDatas)}
            removeFeatureFromMap={(id) => setDatas((prev) => prev.filter((data) => data.id !== id))}
            setDatas={setDatas}
            selectedFeature={selectedFeature}
            onModifyStart={() => handleModifyStart(selectedFeature)}
          />

          {isUpdateMode && (
            <div className="update-control-panel">
              <h3>Çizim Güncelleme Modu Açık</h3>
              <button onClick={handleSaveUpdate}>Kaydet</button>
              <button onClick={handleCancelUpdate}>İptal</button>
            </div>
          )}
        </>
      )}

      <Toastr />
    </div>
  );
};

export default App;
