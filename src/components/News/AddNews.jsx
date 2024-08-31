import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import StyledSelectField from "../../ui/StyledSelectField";
import StyledInput from "../../ui/StyledInput";
import { StyledEventUpload } from "../../ui/StyledEventUpload";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { StyledButton } from "../../ui/StyledButton";

export default function AddNews({ isUpdate, setSelectedTab }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      category: null,
      title: "",
      image: "",
      content: "",
    },
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleClear = (event) => {
    event.preventDefault();
    navigate("/news");
  };

  const option = [
    { value: "Business", label: "Business" },
    { value: "Market", label: "Market" },
    { value: "Economy", label: "Economy" },
  ];

  const onSubmit = async (data) => {
    navigate(`/news`);

    setSelectedTab(0);
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
              Choose category
            </Typography>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Latest"
                    options={option}
                    {...field}
                  />
                  {errors.category && (
                    <span style={{ color: "red" }}>
                      {errors.category.message}
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
              Title
            </Typography>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the news title" {...field} />
                  {errors.title && (
                    <span style={{ color: "red" }}>{errors.title.message}</span>
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
              Upload Photo or video
            </Typography>
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{ required: "File is required" }}
              render={({ field }) => (
                <>
                  <StyledEventUpload
                    label="Upload image here"
                    {...field}
                    onChange={(selectedFile) => {
                      field.onChange(selectedFile);
                    }}
                  />
                  {errors.image && (
                    <span style={{ color: "red" }}>{errors.image.message}</span>
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
              Add content
            </Typography>
            <Controller
              name="content"
              control={control}
              rules={{ required: "Content is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    placeholder="Add Description in less than 500 words"
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
          <Grid item xs={6}></Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"end"}>
            <Stack direction={"row"} spacing={2}>
              <StyledButton
                name="Preview"
                variant="secondary"
                onClick={(event) => handleClear(event)}
              />
              <StyledButton
                name={isUpdate ? "Update" : "Publish"}
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
