import React, { useState, useEffect } from "react";
import "./modalComponent.scss";

const ModalComponent = ({ isOpen, onClose, onSave, onDelete }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
      setName("");
      onClose();
    }
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    setName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>
          &times;
        </button>
        <div className="modal-content">
          <h2>Geometri Bilgisi Kaydet</h2>
          <input
            type="text"
            placeholder="İsim giriniz"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSave()}
          />
          <div className="modal-actions">
            <button className="btn-save" onClick={handleSave}>
              Kaydet
            </button>
            <button className="btn-delete" onClick={handleDelete}>
              Sil
            </button>
            <button className="btn-cancel" onClick={handleClose}>
              İptal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;
