import { Box, Stack } from "@mui/material";
import React, { useState } from "react";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../../ui/StyledTable";
import { useNavigate } from "react-router-dom";

const StyledPosterTable = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setFilterOpen(false);
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
  const handleEdit = (id) => {
    // navigate(`/promotion/edit/${id}`, { state: { value: "video" } });
  };
  const handleRowDelete = async (id) => {
    setIsChange(!isChange);
  };

  const userColumns = [
    { title: "Date", field: "startDate", padding: "none" },

    { title: "Media", field: "banner_image_url" },
  ];
  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"end"}
        paddingBottom={"15px"}
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
          onDelete={handleDelete}
          onDeleteRow={handleRowDelete}
          onModify={handleEdit}
        />{" "}
      </Box>
    </>
  );
};

export default StyledPosterTable;
