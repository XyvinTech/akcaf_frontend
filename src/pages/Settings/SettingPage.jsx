import { Box, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import AdminManagement from "./AdminManagement.jsx";
import RoleManagement from "./RoleManagement.jsx";
import AdminActivity from "./AdminActivity.jsx";





const SettingsPage= () => {
  
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  
  return (
    <>
       <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#E30613",
            height: 4,
            borderRadius: "4px",
          },
        }}
        sx={{
          bgcolor: "white",
          paddingTop: "24px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#E30613",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            color: "#686465",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#E30613",
          },
        }}
      >
        <Tab label="Admin mangement" />
        <Tab label="Role management" />
        <Tab label="Admin activity" />
      </Tabs>
      <Box padding="15px" marginBottom={4}>
        {selectedTab === 0 && (
            <Grid container>
            <Grid item md={12}>
            <AdminManagement/>
            </Grid>
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid container>
            <Grid item md={12}>
            <RoleManagement/>
            </Grid>
          </Grid>
        )}
        {selectedTab === 2 && (
          <Grid container>
            <Grid item md={12}>
            <AdminActivity/>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default SettingsPage;