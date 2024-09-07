import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { Box, Stack } from "@mui/material";
import { useFeedStore } from "../../store/feedStore";
import { postColumns } from "../../assets/json/TableData";
import FeedApproval from "../Approve/FeedApproval";
import FeedReject from "../Approve/FeedReject";

const MemberPosts = ({ id }) => {
  const { fetchFeedByUser, feeds } = useFeedStore();
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [approvalId, setApprovalId] = useState(null);
  useEffect(() => {
    fetchFeedByUser(id);
    console.log("tijo", isChange);
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
      <>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={"15px"}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={2}>
            <StyledSearchbar />
          </Stack>
        </Stack>{" "}
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable
            columns={postColumns}
            data={feeds}
            payment
            onAction={handleReject}
            onModify={handleApprove}
          />{" "}
          <FeedApproval
            open={approveOpen}
            onClose={handleCloseApprove}
            id={approvalId}
            setIsChange={setIsChange}
          />
          <FeedReject
            open={rejectOpen}
            onClose={handleCloseReject}
            id={approvalId}
            setIsChange={setIsChange}
          />
        </Box>
      </>
    </>
  );
};

export default MemberPosts;
