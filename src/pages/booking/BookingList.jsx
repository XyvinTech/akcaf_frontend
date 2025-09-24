import { Badge, Box, Stack } from "@mui/material";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../../ui/StyledTable";
import { useEffect, useState } from "react";
import { useListStore } from "../../store/listStore";
import { hallColumns } from "../../assets/json/TableData";
import RejectBooking from "../../components/Hall/RejectBooking";
import ApproveBooking from "../../components/Hall/ApproveBooking";
import { ReactComponent as FilterIcon } from "../../assets/icons/FilterIcon.svg";
import BookingFilter from "../../components/Hall/BookingFilter";
import { useApprovalStore } from "../../store/approvalstore";
import { toast } from "react-toastify";

const BookingList = () => {
  const [search, setSearch] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [isChange, setIsChange] = useState(false);
  const { fetchBookings } = useListStore();
  const [approvalId, setApprovalId] = useState(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [row, setRow] = useState(10);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
      hall: "",
      userName: "",
      eventName: "",
      status: "",
    });
    const handleApplyFilter = (newFilters) => {
      setFilters(newFilters);
    };
  const [selectedRows, setSelectedRows] = useState([]);
  const handleChange = () => {
    setIsChange((prev) => !prev);
  };
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    if (search) {
      filter.search = search;
    }
    if (filters.hall) {
      filter.hall = filters.hall;
    }
    if (filters.userName) {
      filter.userName = filters.userName;
    }
    if (filters.eventName) {
      filter.eventName = filters.eventName;
    }
    if (filters.status) {
      filter.status = filters.status;
    }
    fetchBookings(filter);
  }, [isChange, pageNo, search, row,filters]);
  const handleApprove = (id) => {
    setApprovalId(id);
    setApproveOpen(true);
  };
  const handleReject = (id) => {
    setApprovalId(id);
    setRejectOpen(true);
  };
  const { updateHall } = useApprovalStore();
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length === 0) return;
    try {
      await Promise.all(
        selectedRows.map((id) => updateHall(id, { status: "deleted" }))
      );
      setSelectedRows([]);
      handleChange();
    } catch (err) {
      toast.error(err?.message || "Failed to delete bookings");
    }
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
            onchange={(e) => {setSearch(e.target.value)
              setPageNo(1)
            }}
          />
               <Badge
              color="error"
              variant="dot"
              invisible={
                !(
                  filters.hall ||
                  filters.userName ||
                  filters.eventName ||
                  filters.status
                )
              }
              sx={{
                "& .MuiBadge-dot": {
                  width: "15px",
                  height: "15px",
                  borderRadius: "50%",
                },
              }}
              overlap="circular"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <Box
                bgcolor={"#FFFFFF"}
                borderRadius={"50%"}
                width={"48px"}
                height={"48px"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="1px solid rgba(0, 0, 0, 0.12)"
                onClick={() => setFilterOpen(true)}
                style={{ cursor: "pointer" }}
              >
                {" "}
                <FilterIcon />
              </Box>
            </Badge>
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
          onSelectionChange={handleSelectionChange}
          onDelete={handleDelete}
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
         <BookingFilter
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            onApply={handleApplyFilter}
          />
      </Box>
    </>
  );
};

export default BookingList;
