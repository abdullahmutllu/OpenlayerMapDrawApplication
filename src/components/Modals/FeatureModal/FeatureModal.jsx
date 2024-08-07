import React, { useState, useEffect } from "react";
import { showSuccessToast, showErrorToast } from "../../../toastr/toast";
import { updateGeometry, deleteGeometry } from "../../ApiComponent";
import { WKT } from "ol/format";
import "./featureModal.scss";
const FeatureModal = ({
  isOpen,
  onClose,
  description,
  wkt,
  id,
  fetchCoordinates,
  removeFeatureFromMap,
  setDatas,
  selectedFeature,
  onModifyStart,
}) => {
  const [desc, setDesc] = useState(description);

  useEffect(() => {
    setDesc(description);
  }, [description]);

  if (!isOpen) return null;

  const handleUpdate = async () => {
    try {
      await updateGeometry(id, wkt, desc, setDatas);
      fetchCoordinates();
      onClose();
    } catch (error) {
      showErrorToast("Güncelleme başarısız.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteGeometry(id, setDatas);
      fetchCoordinates();
      removeFeatureFromMap(id);
      onClose();
    } catch (error) {
      showErrorToast("Silme işlemi başarısız.");
      console.error("Silme işlemi başarısız:", error);
    }
  };

  const handleModifyStart = () => {
    if (!selectedFeature) {
      showErrorToast("Çizim bulunamadı.");
      return;
    }

    onModifyStart(selectedFeature); // Drawing güncellemeyi başlat
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <h2>Geometri Detay</h2>
          <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <button className="featureButon update" onClick={handleUpdate}>
            Güncelle
          </button>
          <button className="featureButon" onClick={handleDelete}>
            Sil
          </button>
          <button className="featureButon" onClick={handleModifyStart}>
            Çizimi Güncelle
          </button>
          <button className="featureButon" id="close-button" onClick={onClose}>
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeatureModal;
