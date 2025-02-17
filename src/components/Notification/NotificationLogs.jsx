import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { useListStore } from "../../store/listStore";
import { useNotificationStore } from "../../store/notificationStore";
import NotificationView from "./NotificationView";

const NotificationLogs = () => {
  const { fetchNotification } =
    useListStore();
    const{ fetchNotificationById, notification } = useNotificationStore();
  const [pageNo, setPageNo] = useState(1);
  const [open, setOpen] = useState(false);
  const [row, setRow] = useState(10);
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;

    fetchNotification(filter);
  }, [pageNo, row]);
  const columns = [
    { title: "Type", field: "type" },
    { title: "User Count", field: "userCount" },
    { title: "Subject", field: "subject", padding: "none" },
  ];
  const handleView = async (id) => {
    try {
      setOpen(true)
      await fetchNotificationById(id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <Box padding={"15px"}>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={"15px"}
          alignItems={"center"}
        ></Stack>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable
            columns={columns}
            menu
            onView={handleView}
            pageNo={pageNo}
            setPageNo={setPageNo}
            rowPerSize={row}
            setRowPerSize={setRow}
          />
        </Box>
        <NotificationView
        data={notification}
        onClose={() => setOpen(false)}
        open={open}
      />
      </Box>
    </>
  );
};

export default NotificationLogs;
