import React, { useEffect, useState } from "react";
import { Box, Divider, Grid, Tab, Tabs } from "@mui/material";

import MembershipApproval from "./MembershipApproval";
import FeedList from "./FeedList";

const ApprovalPage = () => {
  const storedTab = localStorage.getItem("akcafapprovalTab");

  const [selectedTab, setSelectedTab] = useState(
    storedTab ? Number(storedTab) : 0
  );

  const handleChange = (event, newValue) => {
    localStorage.setItem("akcafapprovalTab", newValue);
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
        <Tab label="Requirements" />
        <Tab label="Membership" />
      </Tabs>
      <Divider />
      <Box padding={"15px"}>
        {selectedTab === 0 && (
          <Grid>
            <FeedList />
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid>
            <MembershipApproval />
          </Grid>
        )}
      </Box>
    </>
  );
};

export default ApprovalPage;
