import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { ReactComponent as AppInstagramIcon } from "../assets/icons/AppInstagramIcon.svg";

import { ReactComponent as AppWebsiteIcon } from "../assets/icons/AppWebsiteIcon.svg";
import Video from "../components/Member/Video";
import CertificateCard from "../ui/CertificateCard";
import AwardCard from "../ui/AwardCard";


const QRPage = () => {
  const certificate = {
    name: "Certificate Name",
    link: "https://marketplace.canva.com/EAFlVDzb7sA/1/0/1600w/canva-white-gold-elegant-modern-certificate-of-participation-bK_WEelNCjo.jpg",
  };
  const award={
    name:"Award Name",
    authority:"Authority Name",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf7HCG6mph85gGzQpLsEEr4moLNdTXadtlyQ&s"
  }
  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box sx={{ p: 4, bgcolor: "#FFFFFF", borderRadius: 5, boxShadow: 2 }}>
          <Typography variant="h5" color="textTertiary" mt={1} mb={1}>
            Social Media
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            bgcolor="#F2F2F2"
            borderRadius={"12px"}
            p={1}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              bgcolor="#fff"
              borderRadius={"6px"}
              p={1}
            >
              <AppInstagramIcon />{" "}
            </Box>

            <Typography variant="h5" color="#6D6D6D" fontWeight={400} ml={1}>
              <a target="_blank" rel="noopener noreferrer">
                hghgv
              </a>
            </Typography>
          </Box>
          <Typography variant="h5" color="textTertiary" mt={1} mb={1} pt={2}>
            Websites & links
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-start"
            bgcolor="#F2F2F2"
            borderRadius={"12px"}
            p={1}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              bgcolor="#fff"
              borderRadius={"6px"}
              p={1}
            >
              <AppWebsiteIcon />{" "}
            </Box>
            <Typography variant="h5" color="#6D6D6D" fontWeight={400} ml={1}>
              <a target="_blank" rel="noopener noreferrer">
                hghgv
              </a>
            </Typography>
          </Box>
          <Typography variant="h5" color="textTertiary" mt={1} mb={1} pt={2}>
            Video title
          </Typography>
          <Video url="https://youtu.be/Lq5d4tilc9o?si=J6Qt8t9AkminYRX2" />
          <Typography variant="h5" color="textTertiary" mt={1} mb={1} pt={2}>
            Certificates
          </Typography>
          <CertificateCard certificate={certificate} />
          <Typography variant="h5" color="textTertiary" mt={1} mb={1} pt={2}>
            Certificates
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={6}>
            <AwardCard award={award} ismobile/>
            </Grid>
            <Grid item xs={6}>
            <AwardCard award={award} ismobile/>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default QRPage;
