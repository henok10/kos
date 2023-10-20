import { BottomNavigation, Box, Paper, Typography } from "@mui/material";
import { useState } from "react";

const BottomNav = () => {
  const [value, setValue] = useState(0);

  return (
    <Paper
      sx={{
        position: "static",
        marginTop: 5,
        height: "56px",
        display: "flex",
        justifyContent: "center", // Mengatur bottom navigation ke tengah
        alignItems: "center", // Mengatur vertikal alignment ke tengah
      }}
    >
      <Typography
        variant="caption"
        sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: "center", // Mengatur alignment text ke tengah
        }}
      >
        &copy;{new Date().getFullYear()} KOS SAYA | All rights reserved
      </Typography>
      {/* </BottomNavigation> */}
    </Paper>
    // </Box>
  );
};

export default BottomNav;
