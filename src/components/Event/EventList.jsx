import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../../ui/StyledTable";
import { eventList, userData } from "../../assets/json/TableData";
import { useNavigate } from "react-router-dom";
import { useEventStore } from "../../store/eventStore";
import { toast } from "react-toastify";
import { useListStore } from "../../store/listStore";

const EventList = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const { deleteEvent } = useEventStore();
  const { fetchEvent, pageNo } = useListStore();
  useEffect(() => {
    let filter = {};

    filter.pageNo = pageNo;
    fetchEvent(filter);
  }, [isChange, pageNo]);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deleteEvent(id)));
      toast.success("Deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deleteEvent(id);
    toast.success("Deleted successfully");
    setIsChange(!isChange);
  };
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
          columns={eventList}
          onSelectionChange={handleSelectionChange}
          onView={(id) => {
            navigate(`/events/${id}`);
          }}
          onDelete={handleDelete}
          onDeleteRow={handleRowDelete}
          onModify={(id) => {
            navigate(`/events/edit/${id}`);
          }}
        />
      </Box>
    </Box>
  );
};

export default EventList;
