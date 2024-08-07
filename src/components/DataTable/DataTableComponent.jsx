import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import "./dataTable.scss";
import { updateGeometry, deleteGeometry, zoomToFeature } from "../ApiComponent";
import { toast } from "react-toastify";

const DataTableComponent = ({ datas, setDatas, map, setIsTableVisible }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(datas);
  const [editData, setEditData] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);

  useEffect(() => {
    setFilteredData(datas.filter((data) => data.description.toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, datas]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEditClick = (data) => {
    setEditData(data);
    setOpenEditModal(true);
  };

  const handleDeleteClick = (id) => {
    toast.warn(
      <div>
        <p>Silmek istediğinize emin misiniz?</p>
        <Button
          onClick={() => {
            deleteGeometry(id, setDatas);
            toast.dismiss();
          }}
          color="error"
        >
          Evet
        </Button>
        <Button onClick={() => toast.dismiss()} color="primary">
          Hayır
        </Button>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
      }
    );
  };

  const handleEditSave = async () => {
    await updateGeometry(editData.id, editData.wkt, editData.description, setDatas);
    setOpenEditModal(false);
  };

  const handleZoomClick = (wkt) => {
    zoomToFeature(wkt, map);
    setIsTableVisible(false);
  };

  return (
    <TableContainer className="tableContainer" component={Paper}>
      <div className="closeButton" onClick={() => setIsTableVisible(false)}>
        &times;
      </div>
      <TextField
        label="Ara"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        className="searchBox"
      />
      <Table className="table" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">WKT</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tableBody">
          {filteredData.map((row) => (
            <TableRow className="tableRow" key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.wkt}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="success" onClick={() => handleEditClick(row)}>
                  Edit
                </Button>
                <Button variant="outlined" color="error" onClick={() => handleDeleteClick(row.id)}>
                  Delete
                </Button>
                <Button variant="outlined" color="success" onClick={() => handleZoomClick(row.wkt)}>
                  <FmdGoodIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Edit Data</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={editData?.description || ""}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          />
          <TextField
            margin="dense"
            label="WKT"
            type="text"
            fullWidth
            value={editData?.wkt || ""}
            onChange={(e) => setEditData({ ...editData, wkt: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default DataTableComponent;
