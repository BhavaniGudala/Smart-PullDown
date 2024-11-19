import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {data} from './data';

const columns = [
  { field: "assetID", headerName: "Asset ID", width: 100 },
  { field: "assetName", headerName: "Asset Name", width: 120 },
  { field: "fleetID", headerName: "fleet ID", width: 100 },
  { field: "unitSerialNumber", headerName: "UnitSerial Number", width: 100 },
  { field: "eventTime", headerName: "Event Time", width: 100 },
  { field: "dataGateID", headerName: "Data Gate Id", width: 100 },
  { field: "truHealth", headerName: "TRU Health", width: 100 },
  { field: "co2Mission", headerName: "Carbon Emission Percent", width: 200 },
  { field: "engineHours", headerName: "Engine Hours", width: 150 },
  { field: "preTrip", headerName: "Pre Trip Result", width: 120 },
  { field: "fuelLevel", headerName: "fuel Level", width: 100 },
  { field: "referStatus", headerName: "Refer Status", width: 100 },
  { field: "unitRating", headerName: "Unit Rating", width: 100 },
  {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => {
      return (
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => params.row.assetID && params.row.handlePreview()}
          >
            Preview
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => params.row.assetID && params.row.handleAction()}
            sx={{ marginLeft: 1 }}
          >
            Action
          </Button>
        </div>
      );
    },
  },
];

const GridPage = () => {
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [openActionDialog, setOpenActionDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [apiResponse, setApiResponse] = useState(null);

  const fetchApiData = async (assetID, type) => {
    try {
      const response = await fetch(`https://api.example.com/${type}?assetID=${assetID}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${type} data for assetID ${assetID}:`, error);
      return { error: error.message };
    }
  };

  const handlePreview = async (assetID) => {
    const data = await fetchApiData(assetID, "preview");
    // if (data.error) {
    //   setDialogContent(`Error: ${data.error}`);
    // } else {
      setDialogContent(`Preview content for Preview content for Preview content for ${assetID}: ${data.description}`);
    // }
    setApiResponse(data); // Store API response for further use if needed
    setOpenPreviewDialog(true);
  };

  const handleAction = async (assetID) => {
    const data = await fetchApiData(assetID, "action");
    // if (data.error) {
    //   setDialogContent(`Error: ${data.error}`);
    // } else {
      setDialogContent(`Perform action for ${assetID}?`);
    // }
    setApiResponse(data); // Store API response for further use if needed
    setOpenActionDialog(true);
  };

  const handleYes = () => {
    console.log("Action confirmed:", apiResponse);
    // Perform further actions, e.g., another API call, based on `apiResponse`
    setOpenActionDialog(false);
  };

  const handleNo = () => {
    console.log("Action canceled");
    setOpenActionDialog(false);
  };

  const closeDialog = () => {
    setOpenPreviewDialog(false);
    setOpenActionDialog(false);
  };

  // Adding the handlers to the row data dynamically
  const rowsWithHandlers = data.map((row) => ({
    ...row,
    handlePreview: () => handlePreview(row.assetID),
    handleAction: () => handleAction(row.assetID),
  }));

  // Custom header with row count
  const CustomHeader = () => {
    return (
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item>
          <Typography variant="subtitle1">Rows Count: {data.length}</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ height: "650px", width: "100%" }}>
      <CustomHeader /> {/* Custom Header with Row Count */}

      <DataGrid
        rows={rowsWithHandlers}
        columns={columns}
        pageSize={5}
        getRowId={(row) => row.assetID}
      />

      {/* Preview Dialog */}
      <Dialog open={openPreviewDialog} onClose={closeDialog}>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Dialog */}
      <Dialog open={openActionDialog} onClose={closeDialog}>
        <DialogTitle>Action</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleYes} color="primary">
            Yes
          </Button>
          <Button variant="contained" onClick={handleNo} color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GridPage;