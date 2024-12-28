import { Box, Stack } from "@mui/material";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../../ui/StyledTable";
import { useEffect, useState } from "react";
import { useListStore } from "../../store/listStore";
import { hallColumns } from "../../assets/json/TableData";
import RejectBooking from "../../components/Hall/RejectBooking";
import ApproveBooking from "../../components/Hall/ApproveBooking";

const BookingList = () => {
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [isChange, setIsChange] = useState(false);
  const { fetchBookings } = useListStore();
  const [approvalId, setApprovalId] = useState(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [row, setRow] = useState(10);
  const handleChange = () => {
    setIsChange((prev) => !prev);
  };
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    if (search) {
      filter.search = search;
      setPageNo(1);
    }
    fetchBookings(filter);
  }, [isChange, pageNo, search, row]);
  const handleApprove = (id) => {
    setApprovalId(id);
    setApproveOpen(true);
  };
  const handleReject = (id) => {
    setApprovalId(id);
    setRejectOpen(true);
  };
  return (
    <>
      {" "}
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={"15px"}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={2}>
          <StyledSearchbar
            placeholder={"Search"}
            onchange={(e) => setSearch(e.target.value)}
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
          columns={hallColumns}
          pageNo={pageNo}
          setPageNo={setPageNo}
          payment
          onModify={handleApprove}
          onAction={handleReject}
          rowPerSize={row}
          setRowPerSize={setRow}
        />
        <ApproveBooking
          open={approveOpen}
          onClose={() => setApproveOpen(false)}
          id={approvalId}
          setIsChange={handleChange}
        />
        <RejectBooking
          open={rejectOpen}
          onClose={() => setRejectOpen(false)}
          id={approvalId}
          setIsChange={handleChange}
        />
      </Box>
    </>
  );
};

export default BookingList;
