import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Tab, Tabs } from "@mui/material";
import SlotPage from "./SlotPage";
import BookingList from "./BookingList";

const BookingPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

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
        <Tab label="Bookings" />
        <Tab label="Available Slots" />
      </Tabs>
      <Divider />
      <Box padding={"15px"}>
        <Grid container>
          {selectedTab === 0 && (
            <Grid item xs={12}>
              <BookingList />
            </Grid>
          )}
          {selectedTab === 1 && (
            <Grid item xs={8}>
              <SlotPage />
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default BookingPage;
