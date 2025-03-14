import React, { useState } from "react";
import { StyledButton } from "../../ui/StyledButton";
import { Box, Divider, Grid, Tab, Tabs, Typography } from "@mui/material";
import BulkAddForm from "../../components/College/BulkAddForm";
import AddAdmin from "../../components/Setting/AddAdmin";

const AddAdminPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      {" "}
      <Box
        padding={"10px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h4" color={"textSecondary"}>
              Admin Management
            </Typography>
          </Grid>
        </Grid>
      </Box>
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
            paddingTop: "0px",
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
          <Tab label="Single Add" />
          <Tab label="Bulk Add" />
        </Tabs>
        <Divider />
        <Box padding="15px" marginBottom={4}>
          {selectedTab === 0 && (
            <Grid container>
              <Grid item md={8}>
                <AddAdmin />
              </Grid>
            </Grid>
          )}
          {selectedTab === 1 && (
            <Grid>
              {" "}
              <Grid container>
                <Grid item md={7}>
                  <BulkAddForm />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Box>
      </>
    </>
  );
};

export default AddAdminPage;
