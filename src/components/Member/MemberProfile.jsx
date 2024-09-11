import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import UserCard from "../../ui/UserCard";
import CompanyCard from "../../ui/CompanyCard";
import CertificateCard from "../../ui/CertificateCard";
import AwardCard from "../../ui/AwardCard";
import { ReactComponent as WebsiteIcon } from "../../assets/icons/WebsiteIcon.svg";
import { ReactComponent as InstagramIcon } from "../../assets/icons/InstagramIcon.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/TwitterIcon.svg";
import { ReactComponent as LinkedInIcon } from "../../assets/icons/LinkedInIcon.svg";
import Video from "./Video";

const MemberProfile = ({ data }) => {
  const renderSocialIcon = (platform) => {
    switch (platform) {
      case "instagram":
        return <InstagramIcon />;
      case "twitter":
        return <TwitterIcon />;
      case "linkedin":
        return <LinkedInIcon />;
      default:
        return null;
    }
  };

  return (
    <>
      <Grid container spacing={4} padding={2}>
        <Grid item md={7}>
          <UserCard user={data} />
        </Grid>
        { data?.company &&
        <Grid item md={5}>
          <CompanyCard company={data} />
        </Grid> }
        {data?.social && data?.social?.length > 0 && (
          <>
            <Grid item md={12}>
              <Typography variant="h5" color="textTertiary" mt={1}>
                Social Media
              </Typography>
            </Grid>

            {data?.social?.map((media, index) => (
              <Grid item md={4} xs={12} key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  bgcolor="white"
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
                      {media?.name?.charAt(0).toUpperCase() +
                        media?.name.slice(1)}
                    </a>
                  </Typography>
                </Box>
              </Grid>
            ))}
          </>
        )}{" "}
        {data?.websites && data?.websites?.length > 0 && (
          <>
            <Grid item md={12}>
              <Typography variant="h5" color="textTertiary" mt={1}>
                Websites & links
              </Typography>
            </Grid>
            {data?.websites?.map((website, index) => (
              <Grid item md={4} xs={12} key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  bgcolor="white"
                  borderRadius={"12px"}
                  p={2}
                >
                  <WebsiteIcon />
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
              </Grid>
            ))}
          </>
        )}{" "}
        {data?.videos && data?.videos?.length > 0 && (
          <Grid item md={12}>
            <Typography variant="h5" color="textTertiary" mt={1}>
              video
            </Typography>
          </Grid>
        )}
        {data?.videos?.map((videoItem, index) => (
          <Grid item md={4} xs={12} key={index}>
            <Video url={videoItem.link} />
          </Grid>
        ))}
        {data?.certificates && data?.certificates?.length > 0 && (
          <>
            <Grid item md={12}>
              <Typography variant="h5" color="textTertiary" mt={1}>
                Certificates
              </Typography>
            </Grid>
            {data?.certificates?.map((certificate, index) => (
              <Grid item md={6} xs={12} key={index}>
                <CertificateCard certificate={certificate} />
              </Grid>
            ))}
          </>
        )}{" "}
        {data?.awards && data?.awards?.length > 0 && (
          <>
            <Grid item md={12}>
              <Typography variant="h5" color="textTertiary" mt={1}>
                Awards
              </Typography>
            </Grid>
            {data?.awards?.map((award, index) => (
              <Grid item md={6} xs={12} key={index}>
                <AwardCard award={award} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default MemberProfile;
