import React from "react";
import { Grid, Stack, Typography, Box, Chip } from "@mui/material";
import { ReactComponent as EmailIcon } from "../assets/icons/EmailIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/icons/PhoneIcon.svg";
import { ReactComponent as LocationIcon } from "../assets/icons/LocationIcon.svg";
const CompanyCard = ({ company }) => {
  return (
    <Grid
      container
      spacing={2}
      bgcolor={"white"}
      borderRadius={"12px"}
      padding={"9px"}
      minHeight={"420px"}
    >
      <Grid item xs={12} display="flex" alignItems="center">
        <img
          src={company?.company_logo}
          alt="img"
          width={"50px"}
          height={"50px"}
          style={{ borderRadius: "12px", marginRight: "16px" }}
        />
        <Box>
          <Typography variant="h4" color="#000000" mt={1}>
           jhhj
          </Typography>
          <Typography variant="h7" color="#000000" mt={1}>
          kk
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={"14px"}>
        
            <Stack direction="row" alignItems="center" spacing={1}>
              <PhoneIcon />
              <Typography variant="h7" color={"textTertiary"}>
              +91 9458652637
              </Typography>
            </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <EmailIcon />
            <Typography variant="h7" color={"textTertiary"}>
            johndoe@gmail.com
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <LocationIcon />
            <Typography variant="h7" color={"textTertiary"}>
            Lorem ipsum dolor sit amet consectetur. Viverra sed posuere placerat est donec. 
            </Typography>
          </Stack>{" "}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default CompanyCard;
