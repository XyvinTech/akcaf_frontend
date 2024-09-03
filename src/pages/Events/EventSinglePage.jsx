import React, { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import SpeakerTable from "../../components/Event/SpeakerTable";
import RsvpTable from "../../components/Event/RsvpTable";
import CancelEvent from "../../components/Event/CancelEvent";
import { useParams } from "react-router-dom";
import PostponeEvent from "../../components/Event/PostponeEvent";
import { StyledButton } from "../../ui/StyledButton";
import EventCard from "../../ui/EventCard";
import { useEventStore } from "../../store/eventStore";
const EventSinglePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [postponeOpen, setPostponeOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const { id } = useParams();

  const { fetchEventById, event } = useEventStore();
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handlePostpone = () => {
    setPostponeOpen(true);
  };
  const handleClosePostpone = () => {
    setPostponeOpen(false);
  };
  const handleCancel = () => {
    setCancelOpen(true);
  };
  const handleCloseCancel = () => {
    setCancelOpen(false);
  };
  const handleIsChange = () => {
    setIsChange(!isChange);
  };
  useEffect(() => {
    fetchEventById(id);
  }, [id]);
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
              Events / Event Name
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
            <>
              <Grid item>
                <StyledButton
                  name="Cancel"
                  variant="secondary"
                  onClick={handleCancel}
                />
              </Grid>
              <Grid item>
                <StyledButton
                  name="Postpone"
                  variant="primary"
                  onClick={handlePostpone}
                />
              </Grid>
            </>
          </Grid>
        </Grid>
      </Box>{" "}
      <Box padding="30px" marginBottom={4}>
        <Grid container alignItems="center" spacing={4}>
          <Grid item md={6}>
            <EventCard user={[]} />
          </Grid>
        </Grid>
      </Box>
      <Box marginBottom={4}>
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
          <Tab label="Speaker List" />
          <Tab label="RSVP list" />
        </Tabs>
      </Box>{" "}
      <Box padding="15px" paddingTop={0} marginBottom={4}>
        {selectedTab === 0 && (
          <Grid>
            <SpeakerTable data={[]} />
          </Grid>
        )}{" "}
        {selectedTab === 1 && (
          <Grid>
            <RsvpTable />
          </Grid>
        )}
      </Box>{" "}
      <PostponeEvent
        open={postponeOpen}
        onClose={handleClosePostpone}
        onChange={handleIsChange}
      />
      <CancelEvent
        open={cancelOpen}
        onClose={handleCloseCancel}
        onChange={handleIsChange}
      />
    </>
  );
};

export default EventSinglePage;
