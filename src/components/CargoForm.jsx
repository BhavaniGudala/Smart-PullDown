import React, { useState } from "react";
import {
  Box,
  Grid,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker,Tooltip, Polyline, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import OpenRouteService from "openrouteservice-js";


// Custom Icons
const startIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const destinationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  className: "destination-icon",
});

// Styles for destination icon to differentiate color
const destinationIconStyle = `
  .destination-icon {
    filter: hue-rotate(120deg);
  }
`;
document.head.insertAdjacentHTML(
  "beforeend",
  `<style>${destinationIconStyle}</style>`
);

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
    startingPlace: null,
    destinationPlace: null,
    cargoType: "",
    temperatureRange: "",
    selectedAssets: [],
  });

  const [startMarker, setStartMarker] = useState(null);
  const [destMarker, setDestMarker] = useState(null);

  const navigate = useNavigate();

  const MapClickHandler = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        const locationName = `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`; // Tooltip text
        if (!startMarker || destMarker) {
          setStartMarker({ lat, lng, name: locationName });
          setFormData({ ...formData, startingPlace: locationName });
        } else {
          setDestMarker({ lat, lng, name: locationName });
          setFormData({ ...formData, destinationPlace: locationName });
        }
      },
    });
    return null;
  };

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
    navigate("/grid");
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: "1000px",
        mx: "auto",
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      {/* Map Section */}
      <Box sx={{ height: 400, mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Select Starting and Destination Places:
        </Typography>
        <MapContainer
          center={[40, -100]}
          zoom={3.5}
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MapClickHandler />
          {startMarker && (
            <Marker
              position={[startMarker.lat, startMarker.lng]}
              icon={startIcon}
            >
              <Tooltip>{startMarker.name || "Starting Location"}</Tooltip>
            </Marker>
          )}
          {destMarker && (
            <Marker
              position={[destMarker.lat, destMarker.lng]}
              icon={destinationIcon}
            >
              <Tooltip>{destMarker.name || "Destination Location"}</Tooltip>
            </Marker>
          )}
          {startMarker && destMarker && (
            <Polyline
              positions={[
                [startMarker.lat, startMarker.lng],
                [destMarker.lat, destMarker.lng],
              ]}
              color="blue"
            />
          )}
        </MapContainer>
        <Typography variant="caption" color="textSecondary">
          Click the map to select Starting (Green) and Destination (Blue) points.
        </Typography>
      </Box>

      {/* Location Inputs */}
      <Box sx={{ mb: 2, mt: '80px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="From Location"
              fullWidth
              value={formData.startingPlace || ""}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="To Location"
              fullWidth
              value={formData.destinationPlace || ""}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
        </Grid>
      </Box>

      {/* Cargo Form */}
      <Box sx={{ mb: 2 }}>
        <Grid container spacing={2}>
          {/* Cargo Type Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormLabel>Select Cargo Type: </FormLabel>
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
              <FormLabel>Desired Temperature (°C): </FormLabel>
              <OutlinedInput
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
              <FormLabel>Select Fleet Assets: </FormLabel>
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
              disabled={!startMarker || !destMarker}
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