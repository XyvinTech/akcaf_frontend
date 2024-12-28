import {
  Box,
  Divider,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ReactComponent as AppInstagramIcon } from "../assets/icons/AppInstagramIcon.svg";
import { ReactComponent as AppPhoneIcon } from "../assets/icons/AppPhoneIcon.svg";
import { ReactComponent as AppEmailIcon } from "../assets/icons/AppEmailIcon.svg";
import { ReactComponent as AppLocationIcon } from "../assets/icons/AppLocationIcon.svg";
import { ReactComponent as AppContactIcon } from "../assets/icons/AppContactIcon.svg";
import { ReactComponent as AppLinkedInIcon } from "../assets/icons/AppLinkedInIcon.svg";
import { ReactComponent as AppWebsiteIcon } from "../assets/icons/AppWebsiteIcon.svg";
import { ReactComponent as AppTwitterIcon } from "../assets/icons/AppTwitterIcon.svg";
import { ReactComponent as AppFacebookIcon } from "../assets/icons/AppFacebookIcon.svg";
import { ReactComponent as AppBioIcon } from "../assets/icons/AppBioIcon.svg";
import { ReactComponent as WhatsappIcon } from "../assets/icons/WhatsappIcon.svg";
import image from "../assets/images/image.png";
import bg from "../assets/images/bg.png";
import companylogo from "../assets/images/companylogo.png";
import main from "../assets/images/main.png";
import { StyledButton } from "../ui/StyledButton";
import { getSingleUser } from "../api/memberapi";
import { useParams } from "react-router-dom";
import QRVideoCard from "../components/Member/QRVideoCard";
import QRCertificateCard from "../components/Member/QRCertificateCard";
import QRAwardCard from "../components/Member/QRAwardCard";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const QRPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const formattedId = id?.endsWith("/") ? id.slice(0, -1) : id;
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleUser(formattedId);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleSaveContact = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${userData?.fullName}
ORG:${userData?.company?.name}
TEL:${userData?.phone}
EMAIL:${userData?.email}
END:VCARD
    `;

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${userData?.fullName}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const renderSocialIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <AppInstagramIcon />;
      case "twitter":
        return <AppTwitterIcon />;
      case "linkedin":
        return <AppLinkedInIcon />;
      case "facebook":
        return <AppFacebookIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      {loading ? (
        <LinearProgress
          sx={{
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#e30613",
            },
            backgroundColor: "#ffcccc",
          }}
        />
      ) : (
        <Grid
          container
          justifyContent="center"
          minHeight={isMobile && "100vh"}
          mb={10}
          style={
            isMobile
              ? {}
              : {
                  backgroundImage: `url(${bg})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }
          }
          bgcolor={isMobile ? "#FFF" : "#FFF"}
        >
          <Grid item xs={12} sm={12} md={6} lg={7}>
            <Box
              sx={{
                borderRadius: isMobile ? 0 : 5,
                boxShadow: isMobile ? "none" : 2,
                m: isMobile ? 0 : 2,
                p: isMobile ? 0 : 2,
              }}
              bgcolor={!isMobile && "#fff"}
            >
              <Stack
                spacing={!isMobile && 4}
                direction={isMobile ? "column" : "row"}
              >
                {" "}
                <Grid item lg={6} sm={12} pl={!isMobile && 4}>
                  <Stack
                    direction={"column"}
                    justifyContent={isMobile ? "center" : "start"}
                    alignItems={isMobile ? "center" : "flex-start"}
                    bgcolor={!isMobile && "#fff"}
                    pt={isMobile ? 10 : 0}
                    spacing={isMobile ? 0 : 2}
                    sx={
                      isMobile
                        ? {
                            backgroundImage: `url(${main})`,
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top center",
                          }
                        : {}
                    }
                  >
                    <Stack>
                      <img
                        src={userData?.image || image}
                        alt="image"
                        width={"130px"}
                        height={"130px"}
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </Stack>
                    <Stack
                      direction={"column"}
                      alignItems={isMobile && "center"}
                      p={isMobile && 2}
                    >
                      <Typography
                        variant="h3"
                        color="textTertiary"
                        mt={1}
                        mb={1}
                      >
                        {userData?.fullName}
                      </Typography>
                      {userData?.college?.collegeName && (
                        <>
                          {" "}
                          <Typography
                            variant="h8"
                            color="textTertiary"
                            mt={1}
                            mb={1}
                          >
                            {userData?.college?.collegeName}
                          </Typography>
                          <Typography
                            variant="h8"
                            color="textTertiary"
                            mt={1}
                            mb={1}
                          >
                            {userData?.batch} Alumni
                          </Typography>
                        </>
                      )}
                    </Stack>
                  </Stack>
                  <Typography
                    variant="h5"
                    color="textTertiary"
                    mt={isMobile ? 1 : 4}
                    mb={1}
                    p={isMobile && 2}
                    pb={isMobile && 0}
                  >
                    Personal
                  </Typography>
                  <Stack
                    spacing={2}
                    mb={4}
                    mt={4}
                    p={isMobile && 2}
                    pt={isMobile && 0}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Stack>
                        {" "}
                        <AppPhoneIcon />{" "}
                      </Stack>
                      <Typography variant="h7">{userData?.phone}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Stack>
                        <AppEmailIcon />{" "}
                      </Stack>
                      <Typography variant="h7">{userData?.email}</Typography>
                    </Stack>
                    {userData?.address && (
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Stack>
                          {" "}
                          <AppLocationIcon />{" "}
                        </Stack>
                        <Typography variant="h7">
                          {userData?.address}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                  {userData?.bio && (
                    <>
                      <Stack p={isMobile && 2}>
                        {" "}
                        <AppBioIcon />
                        <Typography variant="h7" color="#626262" mt={1} mb={1}>
                          {userData?.bio}
                        </Typography>
                      </Stack>
                    </>
                  )}
                  {userData?.company && (
                    <>
                      <Typography
                        variant="h5"
                        color="textTertiary"
                        mt={4}
                        mb={2}
                        p={isMobile && 2}
                        pb={isMobile && 0}
                      >
                        Company
                      </Typography>
                      <Stack
                        spacing={2}
                        mb={4}
                        mt={4}
                        p={isMobile && 2}
                        pt={isMobile && 0}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Stack>
                            {" "}
                            <AppPhoneIcon />{" "}
                          </Stack>
                          <Typography variant="h7">
                            {userData?.company?.phone}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Stack>
                            <AppLocationIcon />{" "}
                          </Stack>
                          <Typography variant="h7">
                            {userData?.company?.address}
                          </Typography>
                        </Stack>
                      </Stack>
                    </>
                  )}
                  {!isMobile && (
                    <Stack spacing={2} mt={2}>
                      <StyledButton
                        variant={"preview"}
                        onClick={() => {
                          const whatsappUrl = `https://wa.me/${userData?.phone}`;
                          window.open(
                            whatsappUrl,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                        name={
                          <>
                            <WhatsappIcon style={{ marginRight: "8px" }} />
                            SAY HAI
                          </>
                        }
                      />
                      <StyledButton
                        variant={"primary"}
                        name={
                          <>
                            <AppContactIcon style={{ marginRight: "8px" }} />{" "}
                            SAVE CONTACT
                          </>
                        }
                        onClick={handleSaveContact}
                      />
                    </Stack>
                  )}{" "}
                  <Stack
                    display={isMobile ? "flex" : "none"}
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    direction={"row"}
                    sx={{
                      position: "fixed",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      zIndex: 1000,
                      backgroundColor: "white",
                      padding: 2,
                      boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <StyledButton
                      variant={"preview"}
                      onClick={() => {
                        const whatsappUrl = `https://wa.me/${userData?.phone}`;
                        window.open(
                          whatsappUrl,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      name={
                        <>
                          <WhatsappIcon style={{ marginRight: "8px" }} />
                          SAY HAI
                        </>
                      }
                    />
                    <StyledButton
                      variant={"primary"}
                      name={
                        <>
                          <AppContactIcon style={{ marginRight: "8px" }} /> SAVE
                          CONTACT
                        </>
                      }
                      onClick={handleSaveContact}
                    />
                  </Stack>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{
                    margin: "2px",
                  }}
                />{" "}
                <Grid
                  item
                  lg={6}
                  sm={12}
                  pr={!isMobile && 4}
                  sx={
                    !isMobile
                      ? {
                          maxHeight: "120vh",
                          overflowY: "auto",
                          overflowX: "hidden",
                          "&::-webkit-scrollbar": {
                            width: "8px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f0f0f0",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#CACACA",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#CACACA",
                          },
                        }
                      : {}
                  }
                >
                  {userData?.social && userData?.social?.length > 0 && (
                    <>
                      {" "}
                      <Typography
                        variant="h5"
                        color="textTertiary"
                        mt={1}
                        mb={2}
                        p={isMobile && 2}
                        pb={isMobile && 0}
                      >
                        Social Media
                      </Typography>
                      <Stack p={isMobile && 2} pt={isMobile && 0}>
                        <Grid container spacing={isMobile ? 0 : 2}>
                          {" "}
                          {userData?.social?.map((media, index) => (
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              key={index}
                              paddingBottom={isMobile && 3}
                            >
                              {" "}
                              <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-start"
                                bgcolor="#F2F2F2"
                                borderRadius={"12px"}
                                p={2}
                              >
                                {renderSocialIcon(media?.name)}{" "}
                                <Typography
                                  variant="h5"
                                  color="#6D6D6D"
                                  fontWeight={400}
                                  ml={1}
                                >
                                  <a
                                    href={media?.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      textDecoration: "none",
                                      color: "#6D6D6D",
                                    }}
                                  >
                                    {media?.name}
                                  </a>
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Stack>
                    </>
                  )}{" "}
                  {userData?.websites && userData?.websites?.length > 0 && (
                    <>
                      <Typography
                        variant="h5"
                        color="textTertiary"
                        mt={2}
                        mb={1}
                        pt={2}
                        p={isMobile && 2}
                        pb={isMobile && 0}
                      >
                        Websites & links
                      </Typography>{" "}
                      <Grid container spacing={3} p={isMobile && 2}>
                        {" "}
                        {userData?.websites?.map((website, index) => (
                          <Grid item xs={12} sm={12} key={index}>
                            {" "}
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="flex-start"
                              bgcolor="#F2F2F2"
                              borderRadius={"12px"}
                              p={2}
                            >
                              <AppWebsiteIcon />{" "}
                              <Typography
                                variant="h5"
                                color="#6D6D6D"
                                fontWeight={400}
                                ml={1}
                              >
                                <a
                                  href={website?.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  style={{
                                    textDecoration: "none",
                                    color: "#6D6D6D",
                                  }}
                                >
                                  {website?.name}
                                </a>
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  )}{" "}
                  {userData?.videos && userData?.videos?.length > 0 && (
                    <Typography
                      variant="h5"
                      color="textTertiary"
                      mt={2}
                      mb={2}
                      pt={2}
                      p={isMobile && 2}
                      pb={isMobile && 0}
                    >
                      Video title
                    </Typography>
                  )}
                  <Stack p={isMobile && 2}>
                    {userData?.videos?.length > 0 && (
                      <Carousel
                        responsive={responsive}
                        infinite={true}
                        swipeable={true}
                        draggable={true}
                        autoPlay={true}
                        autoPlaySpeed={2000}
                        keyBoardControl={true}
                        showDots={false}
                      >
                        {userData?.videos?.map(
                          (videoItem, index) =>
                            videoItem?.link && (
                              <div key={index} p={isMobile && 2}>
                                <QRVideoCard url={videoItem.link} />
                              </div>
                            )
                        )}
                      </Carousel>
                    )}
                  </Stack>
                  {userData?.certificates &&
                    userData?.certificates?.length > 0 && (
                      <>
                        <Typography
                          variant="h5"
                          color="textTertiary"
                          mt={5}
                          mb={2}
                          pt={2}
                          p={isMobile && 2}
                          pb={isMobile && 0}
                        >
                          Certificates
                        </Typography>
                        <Grid container spacing={2} p={isMobile && 2}>
                          {userData?.certificates?.map((certificate, index) => (
                            <Grid item xs={12} lg={6} key={index}>
                              <QRCertificateCard
                                isMobile
                                certificate={certificate}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </>
                    )}{" "}
                  {userData?.awards && userData?.awards?.length > 0 && (
                    <>
                      <Typography
                        variant="h5"
                        color="textTertiary"
                        mt={1}
                        mb={1}
                        pt={2}
                        p={isMobile && 2}
                        pb={isMobile && 0}
                      >
                        Awards
                      </Typography>
                      <Grid
                        container
                        spacing={2}
                        mt={2}
                        mb={10}
                        p={isMobile && 2}
                        pt={isMobile && 0}
                      >
                        {userData?.awards?.map((award, index) => (
                          <>
                            {" "}
                            <Grid item xs={6} lg={6} key={index}>
                              <QRAwardCard award={award} ismobile />
                            </Grid>
                          </>
                        ))}
                      </Grid>{" "}
                    </>
                  )}{" "}
                </Grid>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default QRPage;
