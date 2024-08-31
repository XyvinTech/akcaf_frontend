import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import UserCard from "../../ui/UserCard";
import CompanyCard from "../../ui/CompanyCard";

const MemberProfile = ({ data }) => {
//   const renderSocialIcon = (platform) => {
//     switch (platform) {
//       case "instagram":
//         return <InstagramIcon />;
//       case "twitter":
//         return <TwitterIcon />;
//       case "linkedin":
//         return <LinkedInIcon />;
//       default:
//         return null;
//     }
//   };

  return (
    <>
      <Grid container spacing={4} padding={2}>
        <Grid item md={7}>
          <UserCard user={data} />
        </Grid>
        <Grid item md={5}>
          <CompanyCard company={data} />
        </Grid>
        {data?.social_media && data?.social_media?.length > 0 && (
          <>
            <Grid item md={12}>
              <Typography variant="h5" color="textTertiary" mt={1}>
                Social Media
              </Typography>
            </Grid>

            {/* {data?.social_media?.map((media, index) => (
              <Grid item md={4} xs={12} key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  bgcolor="white"
                  borderRadius={"12px"}
                  p={2}
                >
                  {renderSocialIcon(media?.platform)}
                  <Typography
                    variant="h5"
                    color="#6D6D6D"
                    fontWeight={400}
                    ml={1}
                  >
                    <a
                      href={media?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {media?.platform?.charAt(0).toUpperCase() +
                        media?.platform.slice(1)}
                    </a>
                  </Typography>
                </Box>
              </Grid>
            ))} */}
          </>
        )}{" "}
        {data?.websites && data?.websites?.length > 0 && (
          <>
            <Grid item md={12}>
              <Typography variant="h5" color="textTertiary" mt={1}>
                Websites & links
              </Typography>
            </Grid>
            {/* {data?.websites?.map((website, index) => (
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
                      href={website?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {website?.url}
                    </a>
                  </Typography>
                </Box>
              </Grid>
            ))} */}
          </>
        )}{" "}
        {data?.products && data?.products?.length > 0 && (
          <Grid item md={12}>
            <Typography variant="h5" color="textTertiary" mt={1}>
              Products
            </Typography>
          </Grid>
        )}
        {data?.products?.map((product) => (
          <Grid item md={2} xs={12} key={product?._id}>
            {/* <ProductCard product={product} /> */}
          </Grid>
        ))}
        {data?.video && data?.video?.length > 0 && (
          <Grid item md={12}>
            <Typography variant="h5" color="textTertiary" mt={1}>
              video
            </Typography>
          </Grid>
        )}
        {data?.video?.map((videoItem, index) => (
          <Grid item md={4} xs={12} key={index}>
            {/* <Video url={videoItem.url} /> */}
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
                {/* <CertificateCard certificate={certificate} /> */}
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
                {/* <AwardCard award={award} /> */}
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};

export default MemberProfile;
