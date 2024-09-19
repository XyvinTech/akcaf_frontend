import { Box, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ReactComponent as AppInstagramIcon } from "../assets/icons/AppInstagramIcon.svg";
import { ReactComponent as AppPhoneIcon } from "../assets/icons/AppPhoneIcon.svg";
import { ReactComponent as AppEmailIcon } from "../assets/icons/AppEmailIcon.svg";
import { ReactComponent as AppLocationIcon } from "../assets/icons/AppLocationIcon.svg";
import { ReactComponent as AppLinkedInIcon } from "../assets/icons/AppLinkedInIcon.svg";
import { ReactComponent as AppWebsiteIcon } from "../assets/icons/AppWebsiteIcon.svg";
import { ReactComponent as AppTwitterIcon } from "../assets/icons/AppTwitterIcon.svg";
import Video from "../components/Member/Video";
import CertificateCard from "../ui/CertificateCard";
import AwardCard from "../ui/AwardCard";
import { StyledButton } from "../ui/StyledButton";
import { getSingleUser } from "../api/memberapi";
import { useParams } from "react-router-dom";

const QRPage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
const {id} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSingleUser(id);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const renderSocialIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <AppInstagramIcon />;
      case "twitter":
        return <AppTwitterIcon />;
      case "linkedin":
        return <AppLinkedInIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Box
              sx={{
                p: 4,
                bgcolor: "#FFFFFF",
                borderRadius: 5,
                boxShadow: 2,
                mt: 4,
              }}
            >
              <Stack justifyContent={"center"} alignItems={"center"}>
                <img
                  src={userData?.image}
                  alt="image"
                  width={"130px"}
                  height={"139px"}
                />
                <Typography variant="h3" color="textTertiary" mt={1} mb={1}>
                  {userData?.name?.first} {userData?.name?.last}
                </Typography>
                <Typography
                  variant="h8"
                  color="textTertiary"
                  mt={1}
                  mb={1}
                  fontWeight={600}
                >
                  {userData?.college?.collegeName}
                </Typography>
                <Typography
                  variant="h8"
                  color="textTertiary"
                  mt={1}
                  mb={1}
                  fontWeight={600}
                >
                  {userData?.batch}
                </Typography>
              </Stack>
              <Typography variant="h5" color="textTertiary" mt={1} mb={1}>
                Personal
              </Typography>
              <Stack spacing={2} mb={4} mt={4}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AppPhoneIcon />
                  <Typography variant="h7">{userData?.phone}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AppEmailIcon />
                  <Typography variant="h7">{userData?.email}</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AppLocationIcon />
                  <Typography variant="h7">{userData?.address}</Typography>
                </Stack>
              </Stack>
              <Typography variant="h7" color="#626262" mt={1} mb={1}>
                {userData?.bio}
              </Typography>
              <Typography variant="h5" color="textTertiary" mt={4} mb={2}>
                Company
              </Typography>
              <Stack direction={"row"} spacing={2} mb={4}>
                <a
                  href={`https://wa.me/${userData?.company?.phone}`}
                  target="_blank"   style={{ textDecoration: 'none' }}
                  rel="noopener noreferrer"
                >
                  <StyledButton variant={"primary"} name={"SAY HAI"} />
                </a>
                <StyledButton variant={"secondary"} name={"SAVE CONTACT"} />
              </Stack>
              {userData?.social && userData?.social?.length > 0 && (
                <>
                  {" "}
                  <Typography variant="h5" color="textTertiary" mt={1} mb={1}>
                    Social Media
                  </Typography>
                  <Stack spacing={2}>
                    {" "}
                    {userData?.social?.map((media, index) => (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="flex-start"
                        bgcolor="#F2F2F2"
                        borderRadius={"12px"}
                        p={2}
                      >
                        {renderSocialIcon(media?.name)}
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
                          >
                            {media?.link}
                          </a>
                        </Typography>
                      </Box>
                    ))}{" "}
                  </Stack>{" "}
                </>
              )}{" "}
              {userData?.websites && userData?.websites?.length > 0 && (
                <>
                  <Typography
                    variant="h5"
                    color="textTertiary"
                    mt={1}
                    mb={1}
                    pt={2}
                  >
                    Websites & links
                  </Typography>{" "}
                  {userData?.websites?.map((website, index) => (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="flex-start"
                      bgcolor="white"
                      borderRadius={"12px"}
                      p={2}
                    >
                      <AppWebsiteIcon />
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
                        >
                          {website?.name}
                        </a>
                      </Typography>
                    </Box>
                  ))}{" "}
                </>
              )}{" "}
              {userData?.videos && userData?.videos?.length > 0 && (
                <Typography
                  variant="h5"
                  color="textTertiary"
                  mt={1}
                  mb={1}
                  pt={2}
                >
                  Video title
                </Typography>
              )}
              {userData?.videos?.map((videoItem, index) => (
                <Video url={videoItem.link} />
              ))}{" "}
              {userData?.certificates && userData?.certificates?.length > 0 && (
                <>
                  <Typography
                    variant="h5"
                    color="textTertiary"
                    mt={1}
                    mb={1}
                    pt={2}
                  >
                    Certificates
                  </Typography>
                  {userData?.certificates?.map((certificate, index) => (
                    <Stack key={index}>
                      <CertificateCard certificate={certificate} />
                    </Stack>
                  ))}{" "}
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
                  >
                    Awards
                  </Typography>
                  <Grid container spacing={2} mt={2}>
                    {userData?.awards?.map((award, index) => (
                      <Grid item xs={6} key={index}>
                        <AwardCard award={award} ismobile />
                      </Grid>
                    ))}
                  </Grid>{" "}
                </>
              )}{" "}
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default QRPage;
