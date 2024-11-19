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

const rows = [
    {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 11061387281811,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 1106138281811,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 1106138728181,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 1061387281811,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 111387281811,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 110613881811,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 11061387211,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 387281811,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 1106138,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 1106138,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 19961387281811,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 14361387281811,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
     {
        "companyID": 112933162,
        "companyName": "KLLM Transport",
        "assetID": 21387281811,
        "unitSerialNumber": "RAG91407961",
        "dataGateId": "GS3ACI30303009",
        "overall_Score": 0.2,  
        "overall_Category": 0,
        "carbonEmissionPercent":0, 
        "no.Of.Refuelling": 1,
        "pretripResult":"pass",
        "unitRating":3.5,
     },
];

const columns = [
  { field: "companyID", headerName: "Company ID", width: 120 },
  { field: "companyName", headerName: "Company Name", width: 150 },
  { field: "assetID", headerName: "Asset ID", width: 200 },
  { field: "unitSerialNumber", headerName: "UnitSerial Number", width: 100 },
  { field: "dataGateId", headerName: "Data Gate Id", width: 150 },
  { field: "overall_Score", headerName: "Overall Score", width: 80 },
  { field: "unitRating", headerName: "Unit Rating", width: 80 },
  { field: "carbonEmissionPercent", headerName: "Carbon Emission Percent", width: 200 },
  { field: "no.Of.Refuelling", headerName: "No Of Refuelling", width: 150 },
  { field: "pretripResult", headerName: "Pre Trip Result", width: 100 },
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

  const handlePreview = (content) => {
    setDialogContent(content);
    setOpenPreviewDialog(true);
  };

  const handleAction = (content) => {
    setDialogContent(content);
    setOpenActionDialog(true);
  };

  const closeDialog = () => {
    setOpenPreviewDialog(false);
    setOpenActionDialog(false);
  };

  // Adding the handlers to the row data dynamically
  const rowsWithHandlers = rows.map((row) => ({
    ...row,
    handlePreview: () => handlePreview(`Preview content for ${row.companyName}, gghgh vvhhhbh ghghghgh vhhghghhhaaaahgh avdhdh hghad hygahdgahgdha ghgadhgadaj hadhghdgah `),
    handleAction: () => handleAction(`Action content for ${row.dataGateId}`),
  }));

  // Custom header with row count
  const CustomHeader = () => {
    return (
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Grid item>
          <Typography variant="subtitle1">Rows Count: {rows.length}</Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box sx={{ height: '650px', width: "100%" }}>
      <CustomHeader /> {/* Custom Header with Row Count */}

      <DataGrid rows={rowsWithHandlers} columns={columns} pageSize={5} getRowId={(row) => row.assetID} />

      {/* Preview Dialog */}
      <Dialog open={openPreviewDialog} onClose={closeDialog}>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
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
          <Button onClick={closeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default GridPage;
