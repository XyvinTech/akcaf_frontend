import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { StyledButton } from "../../ui/StyledButton";
import StyledTable from "../../ui/StyledTable";
import { useGroupStore } from "../../store/groupstore";
import { groupmemberColumns } from "../../assets/json/TableData";
import { useListStore } from "../../store/listStore";

const GroupMembers = () => {
  const { id } = useParams();
  const { fetchMembers, pageNo } = useListStore(); 
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    fetchMembers(id, filter);
  }, [pageNo]);
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
        Group / Member
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
          <StyledTable columns={groupmemberColumns}  menu />
        </Box>
      </Box>
    </>
  );
};

export default GroupMembers;
