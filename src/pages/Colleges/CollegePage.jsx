import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { collegeColumns } from "../../assets/json/TableData";
import { useNavigate } from "react-router-dom";
import RemoveCollege from "../../components/College/RemoveCollege";
import { useCollgeStore } from "../../store/collegestore";
import { toast } from "react-toastify";
import { useListStore } from "../../store/listStore";

const CollegePage = () => {
  const navigate = useNavigate();
  const [removeOpen, setRemoveOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [collegeId, setCollegeId] = useState(null);
  const [search, setSearch] = useState("");
  const { deleteColleges } = useCollgeStore();
  const { fetchColleges } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    if (search) {
      filter.search = search;
    }
    filter.limit = row;
    fetchColleges(filter);
  }, [isChange, pageNo, search, row]);
  const handleRemove = (id) => {
    setCollegeId(id);
    setRemoveOpen(true);
  };
  const handleCloseRemove = () => {
    setRemoveOpen(false);
  };
  const handleMember = (id) => {
    navigate("/members/member");
  };
  const handleChange = () => {
    setIsChange(!isChange);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deleteColleges(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      } catch (error) {
        console.log(error);
      }
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
            College list
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <StyledButton variant={"secondary"} name={"Download"} />
          <StyledButton
            variant={"primary"}
            name={"Add College"}
            onClick={() => {
              navigate("/college/add");
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
            columns={collegeColumns}
            onSelectionChange={handleSelectionChange}
            onDeleteRow={handleRemove}
            college
            onModify={(id) => {
              navigate("/college/add", {
                state: { collegeId: id, isUpdate: true },
              });
            }}
            pageNo={pageNo}
            setPageNo={setPageNo}
            onDelete={handleDelete}
            onAction={handleMember}
            rowPerSize={row}
            setRowPerSize={setRow}
          />
          <RemoveCollege
            open={removeOpen}
            onClose={handleCloseRemove}
            onChange={handleChange}
            id={collegeId}
          />
        </Box>
      </Box>
    </>
  );
};

export default CollegePage;
