import { BottomNavigation, Box, Paper, Typography } from "@mui/material";
import { useState } from "react";

const BottomNav = () => {
  const [value, setValue] = useState(0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {/* Konten utama di sini */}
      <Box sx={{ flexGrow: 1 }}>{/* Isi konten utama Anda di sini */}</Box>

      {/* Bottom Navigation */}
      <Paper
        sx={{
          position: "relative",
          bottom: 0,
          left: 0,
          right: 0,
          height: "56px",
          display: "flex",
          justifyContent: "center", // Mengatur bottom navigation ke tengah
          alignItems: "center", // Mengatur vertikal alignment ke tengah
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(e, newValue) => setValue(newValue)}
          sx={{ width: "100%" }}
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
            &copy;{new Date().getFullYear()} KOS SAYA | All rights reserved |
            Terms Of Service | Privacy
          </Typography>
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default BottomNav;
