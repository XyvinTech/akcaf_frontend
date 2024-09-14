import { Box, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledSearchbar from "../../ui/StyledSearchbar";
import StyledTable from "../../ui/StyledTable";
import { useNavigate } from "react-router-dom";
import { usePromotionStore } from "../../store/promotionstore";
import { toast } from "react-toastify";
import { useListStore } from "../../store/listStore";

const StyledBannerTable = () => {
  const navigate = useNavigate();
  const [filterOpen, setFilterOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const { deletePromotions } = usePromotionStore();
  const { fetchPromotion } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    let filter = { type: "banner" };
    filter.pageNo = pageNo;
    fetchPromotion(filter);
  }, [isChange, pageNo]);
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
      try {
        await Promise.all(selectedRows?.map((id) => deletePromotions(id)));
        toast.success("Deleted successfully");
        setIsChange(!isChange);
        setSelectedRows([]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleEdit = (id) => {
    navigate(`/promotions/edit/${id}`);
  };
  const handleRowDelete = async (id) => {
    try {
      await deletePromotions(id);
      toast.success("Deleted successfully");
      setIsChange(!isChange);
    } catch (error) {
      console.log(error);
    }
  };

  const userColumns = [
    { title: "Date", field: "startDate", padding: "none" },

    { title: "Media", field: "media" },
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
          onSelectionChange={handleSelectionChange}
          onDelete={handleDelete}
          onDeleteRow={handleRowDelete}
          onModify={handleEdit}
          pageNo={pageNo}
          setPageNo={setPageNo}
        />{" "}
      </Box>
    </>
  );
};

export default StyledBannerTable;
