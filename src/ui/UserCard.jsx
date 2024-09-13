import React from "react";
import { Grid, Stack, Typography, Box } from "@mui/material";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";

import { ReactComponent as LocationIcon } from "../assets/icons/LocationIcon.svg";

const UserCard = ({ user }) => {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"10px"}
      minHeight={"420px"}
      position="relative"
    >
      <Grid item md={6} xs={12} >
        <img
          src={user?.image}
          alt="img"
          width={"216px"}
          height={"216px"}
          style={{ borderRadius: "12px" }}
        />
      </Grid>
      <Grid
        item
        md={6}
        xs={12}
        // lg={6}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack spacing={"10px"}>
          <Typography
            variant="h7"
            color="white"
            fontWeight="bold"
            sx={{
              backgroundColor: "orange",
              padding: "0px 6px",
              borderRadius: "12px",
              width: "fit-content",
            }}
          >
            {user?.role}
          </Typography>

          <Typography variant="h5" color={"textPrimary"}>
            {user?.name?.first} {user?.name?.middle} {user?.name?.last}
          </Typography>
          <Typography variant="h7" color={"textPrimary"}>
          {user?.college?.collegeName} 
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <PhoneIcon />
            <Typography variant="h7" color={"textPrimary"}>
              {user?.phone}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <EmailIcon />
            <Typography variant="h7" color={"textPrimary"}>
              {user?.email}
            </Typography>
          </Stack>
          {user?.address && (
            <Stack direction="row" alignItems="center"  spacing={1}>
              <LocationIcon />
              <Typography variant="h7" color={"textPrimary"}>
                {user?.address}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Grid>

      <Grid
        item
        md={12}
        xs={12}
        display={"flex"}
        alignItems={"flex-start"}
        flexDirection={"column"}
      >
        {user?.bio && (
          <>
            <Typography variant="h7" color={"textPrimary"} fontWeight={700}>
              Bio
            </Typography>
            <Typography variant="h7" color={"textPrimary"}>
              {user?.bio}
            </Typography>
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default UserCard;
