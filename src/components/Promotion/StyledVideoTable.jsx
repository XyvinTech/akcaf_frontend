import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../../ui/StyledTable";
import { useNavigate } from "react-router-dom";
import { usePromotionStore } from "../../store/promotionstore";
import { toast } from "react-toastify";

const StyledVideoTable = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const { fetchPromotion, promotions, deletePromotions } = usePromotionStore();
  useEffect(() => {
    let filter = { type: "video" };

    fetchPromotion(filter);
  }, [isChange]);
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
      await Promise.all(selectedRows?.map((id) => deletePromotions(id)));
      toast.success("Deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleEdit = (id) => {
    navigate(`/promotions/edit/${id}`);
  };
  const handleRowDelete = async (id) => {
    await deletePromotions(id);
    toast.success("Deleted successfully");
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
          data={promotions}
          onSelectionChange={handleSelectionChange}
          onDelete={handleDelete}
          onDeleteRow={handleRowDelete}
          onModify={handleEdit}
        />{" "}
      </Box>
    </>
  );
};

export default StyledVideoTable;
