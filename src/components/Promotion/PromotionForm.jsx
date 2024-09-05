import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton.jsx";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../../ui/StyledSelectField.jsx";
import { StyledEventUpload } from "../../ui/StyledEventUpload.jsx";
import StyledInput from "../../ui/StyledInput.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField.jsx";
import { StyledCalender } from "../../ui/StyledCalender.jsx";
import uploadFileToS3 from "../../utils/s3Upload.js";
import { usePromotionStore } from "../../store/promotionstore.js";
import { toast } from "react-toastify";

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
  const [imageFile, setImageFile] = useState(null);
  const [type, setType] = useState();
  const [submitting, setSubmitting] = useState(false);
  const { addPromotions, fetchPromotionById, updatePromotion, promotion } =
    usePromotionStore();

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
  useEffect(() => {
    if (isUpdate && id) {
      fetchPromotionById(id);
    }
  }, [id, isUpdate, fetchPromotionById]);
  useEffect(() => {
    if (isUpdate && promotion) {
      const selectedType = option.find((item) => item.value === promotion.type);
      setValue("type", selectedType || "");
      setValue("startDate", promotion.startDate);
      setValue("endDate", promotion.endDate);

      if (promotion.type === "notice") {
        setValue("title", promotion.title || "");
        setValue("description", promotion.description || "");
        setValue("link", promotion.link || "");
      } else if (promotion.type === "video") {
        setValue("title", promotion.video_title || "");
        setValue("yt_link", promotion.yt_link || "");
      } else if (promotion.type === "banner" || "") {
        setValue("media", promotion.media || "");
      } else if (promotion.type === "poster" || "") {
        setValue("media", promotion.media || "");
        setValue("link", promotion.link || "");
      }

      setType(promotion.type);
    }
  }, [isUpdate, promotion, setValue]);
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
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
      const formData = {
        startDate: data?.startDate,
        endDate: data?.endDate,
      };
      if (type === "banner") {
        formData.type = "banner";
        formData.media = imageUrl;
      } else if (type === "video") {
        formData.type = "video";
        formData.link = data?.link;
        formData.title = data?.title;
      } else if (type === "notice") {
        formData.type = "notice";
        formData.title = data?.title;
        formData.description = data?.description;
        formData.link = data?.link;
      } else if (type === "poster") {
        formData.type = "poster";
        formData.media = imageUrl;
        formData.link = data?.link;
      }
      if (isUpdate && id) {
        await updatePromotion(id, formData);
      } else {
        await addPromotions(formData);
      }
      navigate("/promotions");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
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
                name="media"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <>
                    <StyledEventUpload
                      label="Upload image here"
                      onChange={(file) => {
                        setImageFile(file);
                        onChange(file);
                      }}
                      value={value}
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
                  name="link"
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
          )}
          {(type === "notice" || type === "poster") && (
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
          )}
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Start Date
            </Typography>
            <Controller
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
            />
          </Grid>
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              End Date
            </Typography>
            <Controller
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
            />
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
                name={submitting ? "Publishing" : "Publish"}
                variant="primary"
                type="submit"
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
