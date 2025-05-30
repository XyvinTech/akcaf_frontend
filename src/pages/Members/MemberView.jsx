import {
  Box,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MemberProfile from "../../components/Member/MemberProfile";
import MemberPosts from "../../components/Member/MemberPosts";
import MemberAnalytics from "../../components/Member/MemberAnalytics";
import { useMemberStore } from "../../store/Memberstore";
import { useFeedStore } from "../../store/feedStore";
import AppSubscriptionCard from "../../ui/AppSubscriptionCard";

const MemberView = () => {
  const storedTab = localStorage.getItem("akcafmemberTab");

  const [selectedTab, setSelectedTab] = useState(
    storedTab ? Number(storedTab) : 0
  );
  const [isChange, setIsChange] = useState(false);
  const { id } = useParams();
  const { fetchMemberById, member, loading, refreshMember } = useMemberStore();

  const handleIsChange = () => {
    setIsChange(!isChange);
  };

  useEffect(() => {
    fetchMemberById(id);
  }, [isChange, refreshMember]);
  const handleChange = (event, newValue) => {
    localStorage.setItem("akcafmemberTab", newValue);
    setSelectedTab(newValue);
  };

  return (
    <>
      <Box
        padding={"20px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Typography variant="h4" color={"textSecondary"}>
          Member
        </Typography>
      </Box>{" "}
      <Divider />
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
        <Tab label="Profile" />
        <Tab label="Subscriptions" />
        <Tab label="Posts" />
      </Tabs>
      <Box padding="15px" marginBottom={4}>
        {selectedTab === 0 && (
          <Grid spacing={2}>
            <MemberProfile data={member} loading={loading} />
          </Grid>
        )}
        {selectedTab === 1 && (
          <Grid container item xs={6} m={2}>
            <AppSubscriptionCard />
          </Grid>
        )}
        {selectedTab === 2 && (
          <Grid>
            <MemberPosts id={id} />
          </Grid>
        )}

        {/* {selectedTab === 3 && (
          <Grid container item xs={12}>
            {" "}
            <MemberAnalytics />
          </Grid>
        )} */}
      </Box>
    </>
  );
};

export default MemberView;
