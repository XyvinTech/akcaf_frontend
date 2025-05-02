import React, { useEffect } from "react";
import {
  Typography,
  Stack,
  Grid,
  Box,
  Divider,
  Alert,
  Chip,
  Paper,
} from "@mui/material";
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

  // Check if payment information exists
  const hasPayment = subscription?.amount && subscription?.currency;

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: "12px",
        overflow: "hidden",
        position: "relative",
      }}
    >

      <Grid
        container
        spacing={0}
        sx={{
          bgcolor: "white",
          border: hasPayment ? "none" : "1px solid #e0e0e0", 
        }}
      >
        <Grid item xs={12} sx={{ bgcolor: hasPayment ? "#f5f5f5" : "#f8f8f8" }}>
          <Box textAlign="center" py={2}>
            <Typography variant="h5" color={hasPayment ? "#686465" : "#757575"} fontWeight={600}> 
              Membership Subscription
            </Typography>
            
            <Box display="flex" justifyContent="center" mt={1}>
              <Chip
                label={hasPayment ? 
                  (subscription?.status || "Active") : 
                  "Unpaid Subscription"}
                color={hasPayment ? "success" : "default"} 
                variant={hasPayment ? "outlined" : "filled"}
                size="small"
                sx={{ 
                  fontWeight: 500,
                  textTransform: "capitalize"
                }}
              />
            </Box>
          </Box>
        </Grid>

        {!hasPayment && (
          <Grid item xs={12}>
            <Alert
              severity="info" 
              variant="filled"
              sx={{
                borderRadius: 0,
                py: 0.5,
              }}
            >
              <Typography variant="body2" fontWeight="500">
                This subscription requires payment to be activated
              </Typography>
            </Alert>
          </Grid>
        )}

        <Grid item xs={12} sx={{ px: 3, py: 2 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ 
              py: 1.5,
              borderBottom: "1px solid #eeeeee"
            }}
          >
            <Typography variant="subtitle2" color="#555555" fontWeight={600}>
              Plan Type
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: hasPayment ? "#2C2829" : "#757575",
                fontWeight: hasPayment ? 400 : 500,
              }}
            >
              {subscription?.status || (hasPayment ? "Standard" : "Not Activated")}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ 
              py: 1.5,
              borderBottom: "1px solid #eeeeee"
            }}
          >
            <Typography variant="subtitle2" color="#555555" fontWeight={600}>
              Last Renewed
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: subscription?.lastRenewed ? "#2C2829" : "#757575", 
                fontWeight: subscription?.lastRenewed ? 400 : 500,
              }}
            >
              {subscription?.lastRenewed ? 
                formatDate(subscription.lastRenewed) : 
                "No renewal record"}
            </Typography>
          </Stack>

          {hasPayment && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ 
                py: 1.5,
                borderBottom: "1px solid #eeeeee"
              }}
            >
              <Typography variant="subtitle2" color="#555555" fontWeight={600}>
                Amount Paid
              </Typography>
              <Typography
                variant="body2"
                color="#2C2829"
                sx={{ 
                  fontWeight: 500,
                  color: "#388e3c",
                }}
              >
                {subscription?.currency === "AED" ? "AED " : "₹"}
                {subscription?.amount}
              </Typography>
            </Stack>
          )}
          
          {!hasPayment && (
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ 
                py: 1.5,
                borderBottom: "1px solid #eeeeee"
              }}
            >
              <Typography variant="subtitle2" color="#555555" fontWeight={600}>
                Payment Status
              </Typography>
              <Typography
                variant="body2"
                sx={{ 
                  color: "#757575", 
                  fontWeight: 600,
                  bgcolor: "#f5f5f5", 
                  px: 1,
                  py: 0.5,
                  borderRadius: "4px",
                }}
              >
                PAYMENT REQUIRED
              </Typography>
            </Stack>
          )}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ 
              py: 1.5,
              borderBottom: hasPayment ? "1px solid #eeeeee" : "none",
            }}
          >
            <Typography variant="subtitle2" color="#555555" fontWeight={600}>
              Expiry Date
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: subscription?.expiryDate ? "#2C2829" : "#757575", 
                fontWeight: subscription?.expiryDate ? 400 : 500,
              }}
            >
              {subscription?.expiryDate ? 
                formatDate(subscription.expiryDate) : 
                "No active subscription"}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}