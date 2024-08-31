import {
  Box,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import StyledPosterTable from "../../components/Promotion/StyledPosterTable";
import StyledBannerTable from "../../components/Promotion/StyledBannerTable";
import StyledVideoTable from "../../components/Promotion/StyledVideoTable";
import StyledNoticeTable from "../../components/Promotion/StyledNoticeTable";

const PromotionItem = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };

  const handleView = (id) => {
    console.log("View item:", id);
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
        <Tab label="Banner" />
        <Tab label="Video" />
        <Tab label="Poster" />
        <Tab label="Notice" />
      </Tabs>
      <Divider />
      <Box padding="15px" marginBottom={4}>
        {selectedTab === 0 && (
          <Grid>
            <StyledBannerTable />
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid>
            <StyledVideoTable />
          </Grid>
        )}
        {selectedTab === 2 && (
          <Grid>
            <StyledPosterTable />
          </Grid>
        )}
        {selectedTab === 3 && (
          <Grid>
            <StyledNoticeTable />
          </Grid>
        )}
      </Box>
    </>
  );
};

export default PromotionItem;
