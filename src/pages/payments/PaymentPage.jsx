import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { usePaymentStore } from "../../store/paymentstore";
import { paymentColumns } from "../../assets/json/TableData";
import { useListStore } from "../../store/listStore";

const MemberPage = () => {
  const { fetchPayment } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    fetchPayment(filter);
  }, [pageNo]);

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
            Payments
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <StyledButton variant={"secondary"} name={"Download"} />
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
            columns={paymentColumns}
            menu
            pageNo={pageNo}
            setPageNo={setPageNo}
          />
        </Box>
      </Box>
    </>
  );
};

export default MemberPage;
