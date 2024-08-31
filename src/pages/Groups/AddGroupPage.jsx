import React from "react";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import AddGroup from "../../components/Group/AddGroup";

const AddGroupPage = () => {
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
            Group List / Add Group
          </Typography>
        </Stack>
      </Stack>
      <Box padding={"15px"}>
        <AddGroup />
      </Box>
    </>
  );
};

export default AddGroupPage;
