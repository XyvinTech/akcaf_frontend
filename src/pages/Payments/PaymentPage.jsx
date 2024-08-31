import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../../ui/StyledTable";
import { StyledButton } from "../../ui/StyledButton";
export default function PaymentPage() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [approveOpen, setApproveOpen] = useState(false);

  const [isChange, setIsChange] = useState(false);

  const userColumns = [
    { title: "Member name", field: "full_name", padding: "none" },
    { title: "Date", field: "date" },
    { title: "Time", field: "time" },
    { title: "Category", field: "category" },
    { title: "Amount", field: "amount" },
    { title: "Mode of payment", field: "mode_of_payment" },
    { title: "Status", field: "status" },
  ];

  const handleChange = () => {
    setIsChange(!isChange);
  };


  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deletePayments(id);
    setIsChange(!isChange);
  };
  const handleView2 = (id) => {
    // navigate(`/payments/addpaymentdetails`);
  };
  const handleEdit = (id) => {
    // navigate(`/payments/addpaymentdetails`, {
    //   state: { paymentId: id, isUpdate: true },
    // });
  };
  const handleApprove = async (id) => {
    // await fetchPaymentById(id);
    setApproveOpen(true);
  };
  const handleCloseApprove = () => {
    setApproveOpen(false);
  };
  return (
    <>
      {" "}
      <Box
        padding={"10px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Grid container alignItems="center">
          <Grid item xs={6}>
            <Typography variant="h4" color={"textSecondary"}>
              Payments
            </Typography>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end" spacing={2}>
            <Grid item>
              <StyledButton
                name="Add"
                variant="secondary"
                onClick={handleView2}
              >
                Add
              </StyledButton>
            </Grid>
            <Grid item>
              <StyledButton name="Download" variant="primary">
                Download
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box padding="15px" marginBottom={4}>
        <>
          <Stack
            direction={"row"}
            justifyContent={"end"}
            paddingBottom={'15px'}
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
            <StyledTable
              columns={userColumns}
              data={[]}
              onSelectionChange={handleSelectionChange}
              onView={handleApprove}
              onDelete={handleDelete}
              onModify={handleEdit}
              onDeleteRow={handleRowDelete}
            />{" "}
            {/* <MemberShipRenewal
              open={approveOpen}
              onClose={handleCloseApprove}
              data={payment}
              onChange={handleChange}
            /> */}
          </Box>
        </>
      </Box>
    </>
  );
}
