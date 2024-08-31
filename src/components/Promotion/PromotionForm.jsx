import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton.jsx";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../../ui/StyledSelectField.jsx";
import { StyledEventUpload } from "../../ui/StyledEventUpload.jsx";
import StyledInput from "../../ui/StyledInput.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField.jsx";

export default function Promotionform({ isUpdate }) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { value } = location.state || {};

  const [type, setType] = useState();
  const [submitting, setSubmitting] = useState(false);

  const handleTypeChange = (selectedOption) => {
    setType(selectedOption.value);
  };

  const option = [
    { value: "banner", label: "Banner" },
    { value: "video", label: "Video" },
    { value: "poster", label: "Poster" },
    { value: "notice", label: "Notice" },
  ];
  const handleClear = (event) => {
    event.preventDefault();
    navigate("/promotions");
  };

  const onSubmit = async (data) => {
    setSubmitting(true);
  };

  return (
    <Box sx={{ padding: 3 }} bgcolor={"white"} borderRadius={"12px"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Choose type
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
                    options={option}
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
          </Grid>{" "}
          {(type === "banner" || type === "poster") && (
            <Grid item xs={12}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                color="textSecondary"
              >
                Upload image
              </Typography>
              <Controller
                name="file"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <StyledEventUpload
                      label="Upload image here"
                      {...field}
                      onChange={(selectedFile) => {
                        field.onChange(selectedFile);
                      }}
                    />
                  </>
                )}
              />
            </Grid>
          )}
          {type === "video" && (
            <>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                 color="textSecondary"
                >
                  Add Youtube link
                </Typography>
                <Controller
                  name="yt_link"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledInput placeholder="Add Youtube link" {...field} />
                    </>
                  )}
                />
              </Grid>{" "}
            </>
          )}{" "}
          {(type === "video" || type === "notice") && (
            <Grid item xs={12}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                color="textSecondary"
              >
                Title
              </Typography>
              <Controller
                name="title"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    <StyledInput placeholder="Title" {...field} />
                  </>
                )}
              />
            </Grid>
          )}{" "}
          {type === "notice" && (
            <>
              <Grid item xs={12}>
                <Typography
                  sx={{ marginBottom: 1 }}
                  variant="h6"
                  color="textSecondary"
                >
                  Description
                </Typography>
                <Controller
                  name="description"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledMultilineTextField
                        placeholder="Add Description in less than 500 words"
                        {...field}
                      />
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
                  Link
                </Typography>
                <Controller
                  name="link"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledInput placeholder="Link" {...field} />
                    </>
                  )}
                />
              </Grid>
            </>
          )}
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
             color="textSecondary"
            >
              Start Date
            </Typography>
            {/* <Controller
              name="startDate"
              control={control}
              defaultValue=""
              rules={{ required: "Start Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender
                    label="Select start date from Calender"
                    {...field}
                  />
                  {errors.startDate && (
                    <span style={{ color: "red" }}>
                      {errors.startDate.message}
                    </span>
                  )}
                </>
              )}
            /> */}
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
            color="textSecondary"
            >
              End Date
            </Typography>
            {/* <Controller
              name="endDate"
              control={control}
              defaultValue=""
              rules={{ required: "End Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender
                    label="Select end date from Calender"
                    {...field}
                  />
                  {errors.endDate && (
                    <span style={{ color: "red" }}>
                      {errors.endDate.message}
                    </span>
                  )}
                </>
              )}
            /> */}
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"end"}>
            {" "}
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                name="Preview"
                variant="secondary"
                disabled={submitting}
                onClick={(event) => handleClear(event)}
              >
                Preview
              </StyledButton>
              <StyledButton
                name="Publish"
                variant="primary"
                type="submit"
                disabled={submitting}
              >
                Publish
              </StyledButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
