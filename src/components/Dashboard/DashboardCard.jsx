import { Stack, Typography } from "@mui/material";
import React from "react";

const DashboardCard = ({ data,color }) => {
  return (
    <Stack
      bgcolor={"#fff"}
      height={"170px"}
      borderRadius="8px"
      width={ "100%" }
      padding={"20px 16px"}
      justifyContent={"space-between"}
    >
      <Typography variant="h5" color="#1D1C23">
        {data?.title}
      </Typography>{" "}
      <Typography fontWeight={600} fontSize={"40px"} color={color? color: "#000"}>
       {data?.value}
      </Typography>{" "}
    </Stack>
  );
};

export default DashboardCard;
