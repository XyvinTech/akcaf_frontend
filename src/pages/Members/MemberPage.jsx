import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Grid2, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { memberColumns, userData } from "../../assets/json/TableData";
import { useNavigate } from "react-router-dom";
import DeleteProfile from "../../components/Member/DeleteProfile";
import { useMemberStore } from "../../store/Memberstore";

const MemberPage = () => {
  const navigate = useNavigate();
  const { fetchMember, members } = useMemberStore();
  const [isChange, setIschange] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [memberId, setMemberId] = useState(null);
  useEffect(() => {
    fetchMember();
  }, [isChange]);

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
            Members List
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          <StyledButton variant={"secondary"} name={"Download"} />
          <StyledButton
            variant={"primary"}
            name={"Add new member"}
            onClick={() => {
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
            data={members}
            columns={memberColumns}
            member
            onDeleteRow={handleRowDelete}
            onView={(id) => {
              navigate(`/members/${id}`);
            }}
            onModify={(id) => {
              navigate(`/members/member`, {
                state: { memberId: id, isUpdate: true },
              });
            }}
          />
          <DeleteProfile
            open={deleteOpen}
            onClose={handleCloseDelete}
            onChange={handleChange}
            id={memberId}
          />
        </Box>
      </Box>
    </>
  );
};

export default MemberPage;
