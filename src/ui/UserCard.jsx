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
      <Grid item md={6} xs={12} lg={6}>
        <img
          src={user?.profile_picture}
          alt="img"
          width={"216px"}
          height={"216px"}
          style={{ borderRadius: "12px" }}
        />
      </Grid>
      <Grid item md={6} xs={12} lg={6} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={"10px"}>
          <Typography
            variant="h7"
            color="white"
            fontWeight="bold"
            sx={{
              backgroundColor: "orange",
              padding: "0px 6px",
              borderRadius: "12px",width: 'fit-content'
            }}
          >
            Premium
          </Typography>

          <Typography variant="h5" color={"textPrimary"}>
            John flitzgerald
          </Typography>
          <Typography variant="h7" color={"textPrimary"}>
            MES College of Engineering
          </Typography>
          <Typography variant="h7" color={"textPrimary"}>
            Member ID:
          </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <PhoneIcon />
            <Typography variant="h7"color={"textPrimary"}>
              +91 9458652637
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon />
            <Typography variant="h7" color={"textPrimary"}>
              Prabfitz@gmail.com
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <LocationIcon />
            <Typography variant="h7" color={"textPrimary"}>
              123,cross ,Lorel ipsum
            </Typography>
          </Stack>
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
        <Typography variant="h7" color={"textPrimary"} fontWeight={700}>
          Bio
        </Typography>
        <Typography variant="h7" color={"textPrimary"}>
          {user?.bio}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default UserCard;
