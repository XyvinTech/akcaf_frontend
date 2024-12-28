import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Stack, Typography } from "@mui/material";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { paymentColumns } from "../../assets/json/TableData";
import { useListStore } from "../../store/listStore";
import { StyledButton } from "../../ui/StyledButton";
import { useNavigate } from "react-router-dom";

const MemberPage = () => {
  const { fetchPayment } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState("");
  const [row, setRow] = useState(10);
  const navigate = useNavigate();
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    if (search) {
      filter.search = search;
      setPageNo(1);
    }
    fetchPayment(filter);
  }, [pageNo, search, row]);

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
          <StyledButton
            variant={"primary"}
            name={"Add Payment"}
            onClick={() => {
              navigate("/payments/add");
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
            <StyledSearchbar
              placeholder={"Search"}
              onchange={(e) => {
                setSearch(e.target.value);
              }}
            />
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
            rowPerSize={row}
            setRowPerSize={setRow}
          />
        </Box>
      </Box>
    </>
  );
};

export default MemberPage;
