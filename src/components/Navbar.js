import React from "react";
import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";
import CarrierLogoUrl from '../images/carrier-logo.png';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d2", mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={CarrierLogoUrl}
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Typography variant="h6">Fleet Falcons</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ mr: 2 }}>
            Yamber Sai Suman Yadav
          </Typography>
          <Avatar>Y</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
