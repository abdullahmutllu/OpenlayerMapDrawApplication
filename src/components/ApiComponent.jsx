import axios from "axios";
import { showSuccessToast, showErrorToast } from "../toastr/toast";
import { WKT } from "ol/format";

const API_BASE_URL = "http://localhost:5039/api/CoordinateGeometry";

export const fetchCoordinates = async (setDatas) => {
  try {
    const response = await axios.get(API_BASE_URL);
    const datas = response.data.$values || response.data;
    setDatas(datas);
  } catch (error) {
    console.error("Veriler getirilemedi:", error);
    showErrorToast("Veriler getirilemedi");
    setDatas([]);
  }
};

export const saveGeometry = async (geometry, name, setDatas) => {
  try {
    const response = await axios.post(API_BASE_URL, {
      description: name,
      wkt: geometry,
    });
    console.log("Veri kaydedildi:", response.data);
    showSuccessToast("Veri başarıyla kaydedildi");
    fetchCoordinates(setDatas);
  } catch (error) {
    console.error("Veri kaydedilemedi:", error);
    showErrorToast("Veri kaydedilemedi");
  }
};

export const updateGeometry = async (id, geometry, name, setDatas) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, {
      description: name,
      wkt: geometry,
    });

    if (response.status === 200) {
      showSuccessToast("Veri başarıyla güncellendi");
      // Güncellenmiş veriyi al
      await fetchCoordinates(setDatas);
    } else {
      throw new Error("Güncelleme başarısız oldu");
    }
  } catch (error) {
    console.error("Veri güncellenemedi:", error);
    showErrorToast("Veri güncellenemedi");
    throw error;
  }
};

export const deleteGeometry = async (id, setDatas) => {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    setDatas((prevDatas) => prevDatas.filter((data) => data.id !== id));
    showSuccessToast("Veri başarıyla silindi");
  } catch (error) {
    console.error("Veri silinemedi:", error);
    showErrorToast("Veri silinemedi");
  }
};

export const zoomToFeature = (wkt, map) => {
  const format = new WKT();
  const feature = format.readFeature(wkt, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
  });

  if (map) {
    const view = map.getView();
    const geometry = feature.getGeometry();
    const extent = geometry.getExtent();
    view.fit(extent, { padding: [5, 5, 5, 5], duration: 1000 });
  }
};
