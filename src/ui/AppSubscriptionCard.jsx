import React, { useEffect, useState } from "react";
import { Typography, Stack, Grid, Box, Divider } from "@mui/material";
import { StyledButton } from "./StyledButton";
import moment from "moment";
import { useMemberStore } from "../store/Memberstore";
import { useParams } from "react-router-dom";

export default function AppSubscriptionCard() {
  const { subscription, fetchSubscriptionById } = useMemberStore();
  const { id } = useParams();

  const formatDate = (date) => {
    return date ? moment(date).format("DD-MM-YYYY") : "-";
  };
  useEffect(() => {
    if (id) {
      fetchSubscriptionById(id);
    }
  }, [id, fetchSubscriptionById]);
  console.log("subscriprion",subscription);
  
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"20px"}
    >
      <Grid item xs={12}>
        <Box textAlign="center">
          <Typography variant="h5" color={"#686465"} marginBottom={2}>
            App Subscription
          </Typography>
        </Box>
      </Grid>
      <Grid item md={12}>
        <Stack
          spacing={2}
          padding={2}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
            Plan
          </Typography>
          {subscription?.status && (
            <Typography
              variant="h6"
              color="#EB5860"
              textTransform={"capitalize"}
              sx={{
                padding: "0px 6px",
                borderRadius: "12px",
                border: "1px solid #EB5860",
              }}
            >
              {subscription?.status}
            </Typography>
          )}
        </Stack>
        <Divider />
        <Stack
          spacing={2}
          padding={2}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
            Last Renewed date
          </Typography>
          {subscription?.lastRenewed && (
            <Typography variant="h6" color="#2C2829">
              {formatDate(subscription?.lastRenewed)}
            </Typography>
          )}
        </Stack>
        <Divider />{" "}
        <Stack
          spacing={2}
          padding={2}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
            Amount paid
          </Typography>
          {subscription?.amount && (
            <Typography variant="h6" color="#2C2829">
              ₹{subscription?.amount}
            </Typography>
          )}
        </Stack>
        <Divider />
        <Stack
          spacing={2}
          padding={2}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography variant="h7" color={"#2C2829"} fontWeight={700}>
            Expiry date
          </Typography>
          {subscription?.expiryDate && (
            <Typography variant="h6" color="#2C2829">
              {formatDate(subscription?.expiryDate)}
            </Typography>
          )}
        </Stack>
        <Divider />
      </Grid>
    </Grid>
  );
}
