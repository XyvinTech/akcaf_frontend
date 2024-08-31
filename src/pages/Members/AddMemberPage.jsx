import React from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import AddMember from "../../components/Member/AddMember";

const AddMemberPage = () => {
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
            Members List / Add Member
          </Typography>
        </Stack>
       
      </Stack>
      <Box padding={"15px"}>
        <AddMember/>
      </Box>
    </>
  );
};

export default AddMemberPage;
