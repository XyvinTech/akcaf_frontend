import React, { useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { memberColumns, userData } from "../../assets/json/TableData";
import { useNavigate } from "react-router-dom";
import RemoveCollege from "../../components/College/RemoveCollege";

const CollegePage = () => {
  const navigate = useNavigate();
  const [removeOpen, setRemoveOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const handleRemove = (id) => {
    setRemoveOpen(true);
  };
  const handleCloseRemove = () => {
    setRemoveOpen(false);
  };
  const handleMember = (id) => {
    navigate("/members/member");
  }
  const handleChange = () => {
    setIsChange(!isChange);
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
            College list
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <StyledButton variant={"secondary"} name={"Download"} />
          <StyledButton
            variant={"primary"}
            name={"Add College"}
            onClick={() => {
              navigate("/college/add");
            }}
          />
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
            columns={memberColumns}
            onDeleteRow={handleRemove}
            college
            onAction={handleMember}
            onView={(id) => {
              navigate(`/college/${id}`);
            }}
          />
          <RemoveCollege
            open={removeOpen}
            onClose={handleCloseRemove}
            onChange={handleChange}
          />
        </Box>
      </Box>
    </>
  );
};

export default CollegePage;
