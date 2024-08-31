import React from "react";
import { memberColumns } from "../../assets/json/TableData";
import StyledTable from "../../ui/StyledTable";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { Box, Stack } from "@mui/material";

const MemberPosts = () => {
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
          <StyledTable columns={memberColumns} data={[]} />{" "}
        </Box>
      </>
    </>
  );
};

export default MemberPosts;
