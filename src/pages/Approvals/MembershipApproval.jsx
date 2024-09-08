import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../../ui/StyledTable";
import RejectEntry from "../../components/Approve/RejectEntry";
import ApproveApproval from "../../components/Approve/ApproveApproval";
import { useApprovalStore } from "../../store/approvalstore";
import { approvalColumns } from "../../assets/json/TableData";

const MembershipApproval = () => {
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const { fetchApproval, approvals } = useApprovalStore();
  const [approvalId, setApprovalId] = useState(null);

  const handleChange = () => {
    setIsChange((prev) => !prev);
  };
  useEffect(() => {
    fetchApproval();
  }, [isChange]);
  const handleReject = (id) => {
    setApprovalId(id);
    setRejectOpen(true);
  };
  const handleCloseReject = () => {
    setRejectOpen(false);
  };
  const handleApprove = (id) => {
    setApprovalId(id);
    setApproveOpen(true);
  };
  const handleCloseApprove = () => {
    setApproveOpen(false);
  };

  return (
    <>
      {" "}
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
          columns={approvalColumns}
          data={approvals}
          payment
          onModify={handleApprove}
          onAction={handleReject}
        />
        <RejectEntry
          open={rejectOpen}
          onClose={handleCloseReject}
          id={approvalId}
          setIsChange={handleChange}
        />
        <ApproveApproval
          open={approveOpen}
          onClose={handleCloseApprove}
          id={approvalId}
          setIsChange={handleChange}
        />
      </Box>
    </>
  );
};

export default MembershipApproval;
