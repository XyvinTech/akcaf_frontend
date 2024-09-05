import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { StyledButton } from "../../ui/StyledButton";
import StyledTable from "../../ui/StyledTable";
import { useCollgeStore } from "../../store/collegestore";
import { member } from "../../assets/json/TableData";

const BatchMemberPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { collegeId, courseId } = location.state || {};
  const { batches, getMember } = useCollgeStore();
  console.log(id, collegeId, courseId);
  useEffect(() => {
    getMember(collegeId, courseId, id);
  }, []);
  return (
    <>
      {" "}
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
            Batch / Detail
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <StyledButton variant={"secondary"} name={"Download"} />
        </Stack>
      </Stack>
      <Box padding="15px" marginBottom={4}>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable columns={member} data={batches} menu />
        </Box>
      </Box>
    </>
  );
};

export default BatchMemberPage;
