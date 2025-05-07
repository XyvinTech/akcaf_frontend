import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Badge, Box, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { memberColumns, userData } from "../../assets/json/TableData";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteProfile from "../../components/Member/DeleteProfile";
import { ReactComponent as FilterIcon } from "../../assets/icons/FilterIcon.svg";
import { useListStore } from "../../store/listStore";
import { getMember } from "../../api/memberapi";
import { generateExcel } from "../../utils/generateExcel";
import MemberFilter from "../../components/Member/MemeberFilter";
import { useMemberStore } from "../../store/Memberstore";
import { toast } from "react-toastify";

const MemberPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchMember } = useListStore();
  const [selectedRows, setSelectedRows] = useState([]);
  const { deleteMembers } = useMemberStore();
  const [search, setSearch] = useState("");
  const [isChange, setIschange] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    membershipId: "",
    designation: "",
    companyName: "",
    status: "",
  });
  
  useEffect(() => {
    const savedRow = localStorage.getItem("memberTableRowSize");
    if (savedRow) {
      setRow(parseInt(savedRow, 10));
    }
    
    // Check if we need to restore a specific page from navigation state
    if (location.state && location.state.returnToPage) {
      setPageNo(location.state.returnToPage);
    } else {
      // Otherwise load from localStorage
      const savedPage = localStorage.getItem("currentMemberPage");
      if (savedPage) {
        setPageNo(parseInt(savedPage, 10));
      }
    }
  }, [location]);

  const handleRowChange = (newRowSize) => {
    setRow(newRowSize);
    localStorage.setItem("memberTableRowSize", newRowSize);
  };
  
  const handleApplyFilter = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    if (search) {
      filter.search = search;
    }
    if (filters.status) filter.status = filters.status;
    if (filters.name) filter.fullName = filters.name;
    if (filters.membershipId) filter.memberId = filters.membershipId;
    if (filters.designation) filter.designation = filters.designation;
    if (filters.companyName) filter.companyName = filters.companyName;
    filter.limit = row;
    fetchMember(filter);
  }, [isChange, pageNo, search, row, filters]);
  
  useEffect(() => {
    localStorage.setItem("currentMemberPage", pageNo);
  }, [pageNo]);
  
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deleteMembers(id)));
        toast.success("Deleted successfully");
        setIschange(!isChange);
        setSelectedRows([]);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  
  const handleRowDelete = (id) => {
    setMemberId(id);
    setDeleteOpen(true);
  };
  
  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };
  
  const handleChange = () => {
    setIschange(!isChange);
  };
  
  const handleDownload = async () => {
    try {
      const data = await getMember({ fullUser: true });
      const csvData = data.data;
      if (csvData && csvData.headers && csvData.csvData) {
        generateExcel(csvData.headers, csvData.csvData);
      } else {
        console.error(
          "Error: Missing headers or data in the downloaded content"
        );
      }
    } catch (error) {
      console.error("Error downloading users:", error);
    }
  };
  
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
            Members list
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <StyledButton
            variant={"secondary"}
            name={"Download"}
            onClick={handleDownload}
          />
          <StyledButton
            variant={"primary"}
            name={"Add new member"}
            onClick={() => {
              // Save current page before navigating to add member form
              localStorage.setItem("currentMemberPage", pageNo);
              navigate("/members/member");
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
                setPageNo(1);
              }}
            />
            <Badge
              color="error"
              variant="dot"
              invisible={
                !(
                  filters.name ||
                  filters.membershipId ||
                  filters.designation ||
                  filters.companyName ||
                  filters.status ||
                  filters.subscription
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
            columns={memberColumns}
            member
            onDeleteRow={handleRowDelete}
            onView={(id) => {
              // Save current page before navigating to view member details
              localStorage.setItem("currentMemberPage", pageNo);
              navigate(`/members/${id}`);
            }}
            pageNo={pageNo}
            onDelete={handleDelete}
            onSelectionChange={handleSelectionChange}
            setPageNo={setPageNo}
            onModify={(id) => {
              // Save current page before navigating to edit member
              localStorage.setItem("currentMemberPage", pageNo);
              navigate(`/members/member`, {
                state: { memberId: id, isUpdate: true },
              });
            }}
            rowPerSize={row}
            setRowPerSize={handleRowChange}
          />
          <DeleteProfile
            open={deleteOpen}
            onClose={handleCloseDelete}
            onChange={handleChange}
            id={memberId}
          />
          <MemberFilter
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            onApply={handleApplyFilter}
          />
        </Box>
      </Box>
    </>
  );
};

export default MemberPage;