import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../../ui/StyledButton.jsx";
import StyledSearchbar from "../../ui/StyledSearchbar.jsx";
import StyledTable from "../../ui/StyledTable.jsx";
import { roleColumns } from "../../assets/json/TableData";
import { useRoleStore } from "../../store/roleStore.js";
import { toast } from "react-toastify";
export default function RoleManagement() {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const { getRoles, roles, deleteRoles } = useRoleStore();
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
    console.log("Selected items:", newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deleteRoles(id)));
      toast.success("Deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deleteRoles(id);
    toast.success("Deleted successfully");
    setIsChange(!isChange);
  };
  const handleEdit = (id) => {
    navigate(`/settings/add-role`, {
      state: { roleId: id, isUpdate: true },
    });
  };
  useEffect(() => {
    getRoles();
  }, [isChange]);
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
              <StyledSearchbar />
            </Grid>
            <Grid item></Grid>
            <Grid item>
              <StyledButton
                name="Add role"
                variant="primary"
                onClick={() => navigate("/settings/add-role")}
              >
                Add role
              </StyledButton>
            </Grid>
          </Grid>
        </Grid>

        <Grid marginTop={"15px"}>
          {" "}
          <Box
            borderRadius={"16px"}
            bgcolor={"white"}
            p={1}
            border={"1px solid rgba(0, 0, 0, 0.12)"}
          >
            <StyledTable
              columns={roleColumns}
              data={roles}
              onSelectionChange={handleSelectionChange}
              onModify={handleEdit}
              onDelete={handleDelete}
              onDeleteRow={handleRowDelete}
            />{" "}
          </Box>
        </Grid>
      </>
    </>
  );
}
