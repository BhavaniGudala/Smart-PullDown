import React, { useState } from "react";
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Button,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const cargoTypes = [
  { value: "Perishable", label: "Perishable" },
  { value: "Non-Perishable", label: "Non-Perishable" },
  { value: "Hazardous", label: "Hazardous" },
  { value: "Electronics", label: "Electronics" },
];

const assetsOptions = [
  "Truck",
  "Refrigerated Container",
  "Flatbed",
  "Cargo Van",
  "Tanker",
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CargoForm = () => {
  const [formData, setFormData] = useState({
    startingPlace: "",
    destinationPlace: "",
    cargoType: "",
    temperatureRange: "",
    selectedAssets: [],
  });

  const navigate = useNavigate();

  const handleAssetsChange = (event) => {
    const {
      target: { value },
    } = event;
    setFormData({
      ...formData,
      selectedAssets: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);

    // Example API call
    // fetch("https://api.example.com/submit", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log("API Response:", data));

    navigate("/grid");
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "800px",
        mx: "auto",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h5" gutterBottom alignContent='center'>
        Fleet Falcons
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <Grid container spacing={2}>
          {/* Starting and Destination Place */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel>Starting Place :</FormLabel>
              <TextField
                placeholder="Enter starting place"
                value={formData.startingPlace}
                onChange={(e) =>
                  setFormData({ ...formData, startingPlace: e.target.value })
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <FormLabel>Destination Place : </FormLabel>
              <TextField
                placeholder="Enter destination place"
                value={formData.destinationPlace}
                onChange={(e) =>
                  setFormData({ ...formData, destinationPlace: e.target.value })
                }
              />
            </FormControl>
          </Grid>

          {/* Cargo Type Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Select Cargo Type : </FormLabel>
              <Select
                value={formData.cargoType}
                onChange={(e) =>
                  setFormData({ ...formData, cargoType: e.target.value })
                }
              >
                {cargoTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Temperature Range */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Desired Temperature (°C) : </FormLabel>
              <TextField
                placeholder="e.g., -5 to 10"
                value={formData.temperatureRange}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    temperatureRange: e.target.value,
                  })
                }
              />
            </FormControl>
          </Grid>

          {/* Assets Multi-Select */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Select Fleet Assets : </FormLabel>
              <Select
                multiple
                value={formData.selectedAssets}
                onChange={handleAssetsChange}
                input={<OutlinedInput label="Assets" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {assetsOptions.map((asset) => (
                  <MenuItem key={asset} value={asset}>
                    <Checkbox
                      checked={formData.selectedAssets.indexOf(asset) > -1}
                    />
                    <ListItemText primary={asset} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CargoForm;
