import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { useNavigate } from "react-router-dom";
import { groupColumns } from "../../assets/json/TableData";
import { useGroupStore } from "../../store/groupstore";
import { toast } from "react-toastify";

const GroupPage = () => {
  const navigate = useNavigate();
  const { fetchGroup, groups, deleteGroups } = useGroupStore();
  const [selectedRows, setSelectedRows] = useState([]);
  const [isChange, setIsChange] = useState(false);
  useEffect(() => {
    fetchGroup();
  }, [isChange]);
  const handleSelectionChange = (newSelectedIds) => {
    setSelectedRows(newSelectedIds);
  };
  const handleDelete = async () => {
    if (selectedRows.length > 0) {
      await Promise.all(selectedRows?.map((id) => deleteGroups(id)));
      toast.success("Deleted successfully");
      setIsChange(!isChange);
      setSelectedRows([]);
    }
  };
  const handleRowDelete = async (id) => {
    await deleteGroups(id);
    toast.success("Deleted successfully");
    setIsChange(!isChange);
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
            Group
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <StyledButton variant={"secondary"} name={"Download"} />
          <StyledButton
            variant={"primary"}
            name={"Add Group"}
            onClick={() => {
              navigate("/groups/group");
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
            <StyledSearchbar placeholder={"Search"} />
          </Stack>
        </Stack>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable
            data={groups}
            columns={groupColumns}
            onModify={(id) => {
              navigate("/groups/group", {
                state: { groupId: id, isUpdate: true },
              });
            }}
            onView={(rowId) => {
              navigate(`/group/${rowId}`);
            }}
            onSelectionChange={handleSelectionChange}
            onDelete={handleDelete}
            onDeleteRow={handleRowDelete}
          />
        </Box>
      </Box>
    </>
  );
};

export default GroupPage;
