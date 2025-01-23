import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { StyledButton } from "../../ui/StyledButton";
import StyledInput from "../../ui/StyledInput";
import { StyledEventUpload } from "../../ui/StyledEventUpload";
import { useNotificationStore } from "../../store/notificationStore";
import { useDropDownStore } from "../../store/dropDownStore";
import uploadFileToS3 from "../../utils/s3Upload";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function InAppNotification({}) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user, fetchListofUser, college, fetchListofCollege } = useDropDownStore();
  const { addNotifications } = useNotificationStore();
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchListofUser();
    fetchListofCollege();
  }, []);
  const option =
    user && Array.isArray(user)
      ? selectedOptions.some((opt) => opt?.value === "*")
        ? [{ value: "*", label: "All" }]
        : [
            { value: "*", label: "All" },
            ...user.map((i) => ({
              value: i._id,
              label: i.name,
            })),
          ]
      : [];
  const colleges =
    college && Array.isArray(college)
      ? selectedCollege.some((opt) => opt?.value === "*")
        ? [{ value: "*", label: "All" }]
        : [
            { value: "*", label: "All" },
            ...college.map((i) => ({
              value: i._id,
              label: i.collegeName,
            })),
          ]
      : [];
  const handleClear = (event) => {
    event.preventDefault();
    reset();
    setSelectedOptions([]);
    setSelectedCollege([]);
    setImageFile(null);
    navigate(-1);
  };
  const onSubmit = async (data) => {
    try {
      setLoading(true);
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
        user: user?.value,
      }));
      const collegeOptions = data?.college?.map((user) => ({
        user: user?.value,
      }));
      const formData = {
        content: data?.content,
        subject: data?.subject,
        media: imageUrl,
      };
      if (type === "user") {
        formData.sendTo = "user";
        formData.users = users;
      }
      if (type === "college") {
        formData.sendTo = "college";
        formData.users = collegeOptions;
      }
      formData.type = "in-app";
      await addNotifications(formData);

      reset();
      setImageFile(null);
      setSelectedOptions([]);
      setSelectedCollege([]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const Type = [
    { value: "user", label: "User" },
    { value: "college", label: "College" },
  ];
  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
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
              name="type"
              control={control}
              defaultValue=""
              rules={{ required: "Type is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select the type"
                    options={Type}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleTypeChange(e);
                    }}
                  />
                  {errors.type && (
                    <span style={{ color: "red" }}>{errors.type.message}</span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            {type === "user" && (
              <Controller
                name="to"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <>
                    <StyledSelectField
                      placeholder="Select member"
                      options={option}
                      isMulti
                      {...field}
                      value={selectedOptions}
                      onChange={(selected) => {
                        setSelectedOptions(selected);
                        field.onChange(selected);
                      }}
                    />
                  </>
                )}
              />
            )}
            {type === "college" && (
              <Controller
                name="college"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <>
                    <StyledSelectField
                      placeholder="Select college"
                      options={colleges}
                      isMulti
                      {...field}
                      value={selectedCollege}
                      onChange={(selected) => {
                        setSelectedCollege(selected);
                        field.onChange(selected);
                      }}
                    />
                  </>
                )}
              />
            )}
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
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    placeholder="Enter message"
                    {...field}
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
              Upload File
            </Typography>
            <Controller
              name="media_url"
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
                  {errors.media_url && (
                    <span style={{ color: "red" }}>
                      {errors.media_url.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"end"}>
            {" "}
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                name="Cancel"
                variant="secondary"
                onClick={(e) => handleClear(e)}
              />
              <StyledButton
                name={loading ? "Saving..." : "Save"}
                variant="primary"
                type="submit"
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
