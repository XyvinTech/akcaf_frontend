import { Box, Stack } from "@mui/material";
import React from "react";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../../ui/StyledTable";
import { eventList, userData } from "../../assets/json/TableData";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={"15px"}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={2}>
          <StyledSearchbar placeholder={"Search"} />
        </Stack>
      </Stack>
      <Box
        borderRadius={"16px"}
        bgcolor={"white"}
        p={1}
        border={"1px solid rgba(0, 0, 0, 0.12)"}
      >
        <StyledTable
          data={userData}
          columns={eventList}
          onView={(id) => {
            navigate(`/events/${id}`);
          }}
          onModify={(id) => {
            navigate(`/events/edit/${id}`);
          }}
        />
      </Box>
    </Box>
  );
};

export default EventList;
