import React from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { memberColumns, userData } from "../../assets/json/TableData";
import { useNavigate } from "react-router-dom";

const MemberPage = () => {
  const navigate = useNavigate();
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
            Members List
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <StyledButton variant={"secondary"} name={"Download"} />
          <StyledButton variant={"primary"} name={"Add new member"} onClick={() => {navigate("/members/member")}}/>
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
          <StyledTable data={userData} columns={memberColumns} member  onView={(id) => {navigate(`/members/${id}`)}} onModify={() => {navigate("/members/member")}}/>
        </Box>
      </Box>
    </>
  );
};

export default MemberPage;
