import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Stack } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton.jsx";
import StyledInput from "../../ui/StyledInput.jsx";
import { Controller, useForm } from "react-hook-form";
import StyledSelectField from "../../ui/StyledSelectField.jsx";
import { ReactComponent as Delete } from "../../assets/icons/DeleteIcon.svg";
import { StyledEventUpload } from "../../ui/StyledEventUpload.jsx";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField.jsx";
import { StyledCalender } from "../../ui/StyledCalender.jsx";
import { StyledTime } from "../../ui/StyledTime.jsx";
import uploadFileToS3 from "../../utils/s3Upload.js";
import { useEventStore } from "../../store/eventStore.js";
import { useParams } from "react-router-dom";

export default function AddEvent({ setSelectedTab, isUpdate }) {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [speakers, setSpeakers] = useState([
    {
      name: "",
      designation: "",
      role: "",
      image: "",
    },
  ]);

  const { addEvent, updateEvent, fetchEventById, event } = useEventStore();

  useEffect(() => {
    if (isUpdate && id) {
      fetchEventById(id);
    }
  }, [isUpdate, id, fetchEventById]);

  useEffect(() => {
    if (event && isUpdate) {
      const selectedType = types.find((item) => item.value === event.type);
      setValue("type", selectedType || "");
      setValue("eventName", event.eventName);
      setValue("venue", event.venue);
      setValue("image", event.image);
      setValue("startDate", event.startDate);
      setValue("endDate", event.endDate);
      setValue("startTime", event.startTime);
      setValue("endTime", event.endTime);
      const selectedplatform = option.find(
        (item) => item.value === event.platform
      );
      setValue("platform", selectedplatform || "");
      setValue("link", event.link);
      setValue(
        "speakers",
        Array.isArray(event.speakers) ? event.speakers : [event.speakers]
      );

      // Update the speakers state
      setSpeakers(
        Array.isArray(event.speakers) ? event.speakers : [event.speakers]
      );
    }
  }, [event, isUpdate, setValue]);

  const [imageFile, setImageFile] = useState(null);

  const handleClear = (event) => {
    event.preventDefault();
    setSelectedTab(0);
    reset();
  };

  const option = [{ value: "Zoom", label: "Zoom" }];

  const types = [
    { value: "Online", label: "Online" },
    { value: "Offline", label: "Offline" },
  ];

  const onSubmit = async (data) => {
    let imageUrl = data?.image || "";

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

    const speakersData = await Promise.all(
      data.speakers.map(async (speaker, index) => {
        let speakerImageUrl = speakers[index]?.image || "";

        if (typeof speakers[index]?.image === "object") {
          try {
            speakerImageUrl = await new Promise((resolve, reject) => {
              uploadFileToS3(
                speakers[index].image,
                (location) => resolve(location),
                (error) => reject(error)
              );
            });
          } catch (error) {
            console.error(`Failed to upload image for speaker:`, error);
          }
        }

        return {
          name: speaker?.name,
          designation: speaker?.designation,
          role: speaker?.role,
          image: speakerImageUrl,
        };
      })
    );

    const formData = {
      type: data?.type?.value,
      eventName: data?.eventName,
      image: imageUrl,
      startDate: data?.startDate,
      startTime: data?.startTime,
      endDate: data?.endDate,
      endTime: data?.endTime,
      platform: data?.platform.value,
      link: data?.link,
      speakers: speakersData,
    };

    if (isUpdate && id) {
      await updateEvent(id, formData);
    } else {
      await addEvent(formData);
    }

    setSelectedTab(0);
    reset();
  };

  const addSpeaker = () => {
    setSpeakers([
      ...speakers,
      {
        name: "",
        designation: "",
        role: "",
        image: "",
      },
    ]);
  };

  const removeSpeaker = (index) => {
    const newSpeakers = speakers.filter((_, i) => i !== index);
    setSpeakers(newSpeakers);
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
              Type of event
            </Typography>
            <Controller
              name="type"
              control={control}
              defaultValue=""
              rules={{ required: "Type of event is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Enter Event Type"
                    options={types}
                    {...field}
                  />
                  {errors.type && (
                    <span style={{ color: "red" }}>{errors.type.message}</span>
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
              Name of event
            </Typography>
            <Controller
              name="eventName"
              control={control}
              defaultValue=""
              rules={{ required: "Name of event is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the name of event"
                    {...field}
                  />
                  {errors.eventName && (
                    <span style={{ color: "red" }}>
                      {errors.eventName.message}
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
              Event Image
            </Typography>
            <Controller
              name="image"
              control={control}
              defaultValue=""
              rules={{ required: "Image is required" }}
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
                  {errors.image && (
                    <span style={{ color: "red" }}>{errors.image.message}</span>
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
              Virtual platform
            </Typography>
            <Controller
              name="platform"
              control={control}
              defaultValue=""
              rules={{ required: "Virtual platform is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Select Virtual Platform"
                    options={option}
                    {...field}
                  />
                  {errors.platform && (
                    <span style={{ color: "red" }}>
                      {errors.platform.message}
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
              Add link
            </Typography>
            <Controller
              name="link"
              control={control}
              defaultValue=""
              rules={{ required: "Link  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter Link" {...field} />
                  {errors.link && (
                    <span style={{ color: "red" }}>{errors.link.message}</span>
                  )}
                </>
              )}
            />
          </Grid>

          {/* Date and Time Fields */}
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
              defaultValue={null}
              rules={{ required: "Start Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender placeholder="Enter Start Date" {...field} />
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
              defaultValue={null}
              rules={{ required: "End Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender placeholder="Enter End Date" {...field} />
                  {errors.endDate && (
                    <span style={{ color: "red" }}>
                      {errors.endDate.message}
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
              Start Time
            </Typography>
            <Controller
              name="startTime"
              control={control}
              defaultValue={null}
              rules={{ required: "Start Time is required" }}
              render={({ field }) => (
                <>
                  <StyledTime placeholder="Enter Start Time" {...field} />
                  {errors.startTime && (
                    <span style={{ color: "red" }}>
                      {errors.startTime.message}
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
              End Time
            </Typography>
            <Controller
              name="endTime"
              control={control}
              defaultValue={null}
              rules={{ required: "End Time is required" }}
              render={({ field }) => (
                <>
                  <StyledTime placeholder="Enter End Time" {...field} />
                  {errors.endTime && (
                    <span style={{ color: "red" }}>
                      {errors.endTime.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>

          {/* Speakers Section */}
          <Grid item xs={12}>
            <Typography variant="h6" color="textSecondary" mb={2}>
              Speakers
            </Typography>

            {speakers.map((speaker, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={6}>
                  <Controller
                    name={`speakers[${index}].name`}
                    control={control}
                    defaultValue={speaker?.name}
                    render={({ field }) => (
                      <StyledInput placeholder="Speaker Name" {...field} />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name={`speakers[${index}].designation`}
                    control={control}
                    defaultValue={speaker?.designation}
                    render={({ field }) => (
                      <StyledInput
                        placeholder="Speaker Designation"
                        {...field}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name={`speakers[${index}].role`}
                    control={control}
                    defaultValue={speaker?.role}
                    render={({ field }) => (
                      <StyledInput placeholder="Speaker Role" {...field} />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name={`speakers[${index}].image`}
                    control={control}
                    defaultValue={speaker?.image}
                    render={({ field: { onChange, value } }) => (
                      <StyledEventUpload
                        label="Upload Speaker Image"
                        onChange={(file) => {
                          setImageFile(file);
                          onChange(file);
                        }}
                        value={value}
                      />
                    )}
                  />
                </Grid>{" "}
                <Grid item xs={6}></Grid>
                <Grid item xs={6} display={"flex"} justifyContent={"end"}>
                  <Delete onClick={() => removeSpeaker(index)} />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Typography
                sx={{ marginBottom: 1 }}
                variant="h6"
                fontWeight={500}
                color={"#004797"}
                onClick={addSpeaker}
              >
                + Add more
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          {" "}
        </Grid>
        <Grid item xs={6} display={"flex"} justifyContent={"flex-end"}>
          {" "}
          <Stack
            direction={"row"}
            spacing={2}
            display={"flex"}
            justifyContent={"flex-end"}
          >
            <StyledButton
              name="Cancel"
              variant="secondary"
              onClick={(event) => handleClear(event)}
            >
              Cancel
            </StyledButton>
            <StyledButton name="Save" variant="primary" type="submit">
              Save
            </StyledButton>
          </Stack>
        </Grid>
      </form>
    </Box>
  );
}
