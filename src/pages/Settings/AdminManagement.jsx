import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../ui/StyledButton.jsx";
import StyledSearchbar from "../../ui/StyledSearchbar.jsx";
import StyledTable from "../../ui/StyledTable.jsx";
import { adminColumns, userData } from "../../assets/json/TableData";
import { useAdminStore } from "../../store/adminStore.js";
import { useListStore } from "../../store/listStore.js";
import { toast } from "react-toastify";
export default function AdminManagement() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const { getAdmins } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const [isChange, setIsChange] = useState(false);
  const [search, setSearch] = useState("");
  const { deleteAdmins } = useAdminStore();

  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      try {
        await Promise.all(selectedRows?.map((id) => deleteAdmins(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      } catch (error) {
        toast.error(error.message);
      }
    }
  };
  const handleRowDelete = async (id) => {
    try {
      await deleteAdmins(id);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleEdit = (id) => {
    navigate(`/settings/add-admin`, {
      state: { adminId: id, isUpdate: true },
    });
  };
  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    if (search) {
      filter.search = search;
    }
    getAdmins(filter);
  }, [isChange, pageNo, search, row]);
  return (
    <>
      {" "}
      <>
        <Grid container alignItems="center">
          <Grid item xs={6}></Grid>
          <Grid
            item
            xs={6}
            container
            display={"flex"}
            alignItems={"center"}
            justifyContent="flex-end"
            spacing={2}
          >
            <Grid item>
              <StyledSearchbar
                placeholder={"Search"}
                onchange={(e) => {
                  setSearch(e.target.value);
                  setPageNo(1);
                }}
              />
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <StyledButton
                name="Add new admin"
                variant="primary"
                onClick={() => navigate("/settings/add-admin")}
              >
                Add new admin
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid marginTop={"15px"}>
          <Box
            borderRadius={"16px"}
            bgcolor={"white"}
            p={1}
            border={"1px solid rgba(0, 0, 0, 0.12)"}
          >
            <StyledTable
              columns={adminColumns}
              pageNo={pageNo}
              setPageNo={setPageNo}
              rowPerSize={row}
              onModify={handleEdit}
              setRowPerSize={setRow}
              onDelete={handleDelete}
              onDeleteRow={handleRowDelete}
              onSelectionChange={handleSelectionChange}
            />{" "}
          </Box>
        </Grid>
      </>
    </>
  );
}
