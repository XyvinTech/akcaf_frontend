import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { StyledButton } from "../../ui/StyledButton";
import StyledInput from "../../ui/StyledInput";
import { StyledEventUpload } from "../../ui/StyledEventUpload";
import { useDropDownStore } from "../../store/dropDownStore";
import { useNotificationStore } from "../../store/notificationStore";
import uploadFileToS3 from "../../utils/s3Upload";

export default function EmailNotification({}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user, fetchListofUser } = useDropDownStore();
  const { addNotifications } = useNotificationStore();
  const [imageFile, setImageFile] = useState(null);
  useEffect(() => {
    fetchListofUser();
  }, []);
  const option =
    user && Array.isArray(user)
      ? user.map((i) => ({
          value: i?._id,
          label: i?.email,
        }))
      : [];
  const onSubmit = async (data) => {
    let imageUrl = data?.media || "";

    if (imageFile) {
      try {
        imageUrl = await new Promise((resolve, reject) => {
          uploadFileToS3(
            imageFile,
            (location) => resolve(location),
            (error) => reject(error)
          );
        });
      } catch (error) {
        console.error("Failed to upload image:", error);
        return;
      }
    }
    const users = data?.to?.map((user) => ({
      user: user.value,
    }));
    const formData = {
      link: data?.link,
      content: data?.content,
      subject: data?.subject,
      users: users,
      media: imageUrl,
    };
    formData.type = "email";
    addNotifications(formData);
    console.log(formData);
    reset();
  };

  return (
    <Box
      sx={{ padding: 3 }}
      bgcolor={"white"}
      borderRadius={"12px"}
      border={"1px solid rgba(0, 0, 0, 0.12)"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Send to
            </Typography>
            <Controller
              name="to"
              control={control}
              defaultValue={[]}
              rules={{ required: "Member is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select member"
                    options={option}
                    isMulti
                    {...field}
                  />
                  {errors.to && (
                    <span style={{ color: "red" }}>{errors.to.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Subject
            </Typography>
            <Controller
              name="subject"
              control={control}
              defaultValue=""
              rules={{ required: "Subject is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter subject line" {...field} />
                  {errors.subject && (
                    <span style={{ color: "red" }}>
                      {errors.subject.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Content
            </Typography>
            <Controller
              name="content"
              control={control}
              defaultValue=""
              rules={{ required: "Message is required" }}
              render={({ field: { onChange } }) => (
                <>
                  <StyledMultilineTextField
                    label="Add message"
                    onChange={onChange}
                  />
                  {errors.content && (
                    <span style={{ color: "red" }}>
                      {errors.content.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Upload photo or video
            </Typography>
            <Controller
              name="media"
              control={control}
              defaultValue=""
              rules={{ required: "File is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledEventUpload
                    label="Upload your file"
                    onChange={(file) => {
                      setImageFile(file);
                      onChange(file);
                    }}
                    value={value}
                  />
                  {errors.media && (
                    <span style={{ color: "red" }}>{errors.media.message}</span>
                  )}
                </>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Add Link
            </Typography>
            <Controller
              name="link"
              control={control}
              defaultValue=""
              rules={{ required: "Link is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Paste link here" {...field} />
                  {errors.link && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
                  )}
                </>
              )}
            />
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"end"}>
            {" "}
            <Stack direction={"row"} spacing={2}>
              <StyledButton name="Cancel" variant="secondary" />
              <StyledButton name="Save" variant="primary" type="submit" />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
