import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ProSidebarProvider } from "react-pro-sidebar";
import { BrowserRouter } from "react-router-dom";
import { MyProSidebarProvider } from "./components/sidebarContext";
import { Box } from "@mui/material";
import AppRoutes from "./router/AppRoutes";

import SidebarNav from "./components/Sidebar";

import BottomNav from "./components/BottomNav";
import "./App.css";
import Topbar from "./components/Topbar";

import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <React.Fragment>
      <ProSidebarProvider>
        <CssBaseline />
        {/* <MyProSidebarProvider> */}
        <BrowserRouter>
          <Topbar />
          <Box sx={styles.container}>
            <SidebarNav />
            <Box
                component={'main'}
                sx={styles.mainSection}
              >
             
             <AppRoutes />
              <BottomNav />
            </Box>
          </Box>
        </BrowserRouter>
      </ProSidebarProvider>
    </React.Fragment>
  );
}

/**
 * @type {import('@mui/material').SxProps}
 */
const styles = {
  container: {
    display: 'flex',
    bgcolor: 'neutral.light',
    height: '100%'
  },
  mainSection: {
    paddingTop: 6,
    paddingBottom: 0,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    flexDirection: 'column'
  }
}

export default App;
