import React from "react";

import { Box, Typography } from "@mui/material";
const AwardCard = ({ award }) => {
  return (
    <Box
      borderRadius={"8px"}
      bgcolor={"white"}
      width={"302px"}
      border={"1px solid rgba(0, 0, 0, 0.12)"}
    >
      <Box
        component="img"
        src={award?.url}
        sx={{
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          width: "302px",
          height: "168px",
        }}
      />
      <Box borderRadius={"8px"} bgcolor={"white"} padding={"10px"}>
        <Typography
          variant="h5"
          color={"#333333"}
          textAlign={"start"}
          sx={{ marginBottom: "10px" }}
        >
          {award?.name}
        </Typography>
        <Typography
          variant="h5"
          fontWeight={400}
          color={"#757575"}
          textAlign={"start"}
          sx={{ marginBottom: "10px" }}
        >
          {award?.authority_name}
        </Typography>
      </Box>
    </Box>
  );
};

export default AwardCard;
