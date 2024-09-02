import React, { useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { memberColumns, userData } from "../../assets/json/TableData";
import { useNavigate } from "react-router-dom";
import RejectEntry from "../../components/Approve/RejectEntry";
import ApproveApproval from "../../components/Approve/ApproveApproval";

const ApprovalPage = () => {
  const [rejectOpen,setRejectOpen] = useState(false);
  const [approveOpen,setApproveOpen] = useState(false);
  const handleReject = (id) => {
    setRejectOpen(true);
  };
const handleCloseReject = () => {
  setRejectOpen(false);
};
const handleApprove = (id) => {
  setApproveOpen(true);
};
const handleCloseApprove = () => {
  setApproveOpen(false);
};

  return (
    <>
      <Stack
        direction={"row"}
        padding={"10px"}
        bgcolor={"#fff"}
        height={"70px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography variant="h4" color="textSecondary">
            Member Request list
          </Typography>
        </Stack>
      </Stack>
      <Box padding={"15px"}>
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
            payment
            columns={memberColumns}
            onModify={handleApprove}
            onAction={handleReject}
          />
          <RejectEntry open={rejectOpen} onClose={handleCloseReject} />
          <ApproveApproval open={approveOpen} onClose={handleCloseApprove} />
        </Box>
      </Box>
    </>
  );
};

export default ApprovalPage;
