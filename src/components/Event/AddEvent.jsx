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



export default function AddEvent({ setSelectedTab }) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const handleClear = (event) => {
    event.preventDefault();
    setSelectedTab(0);
    reset();
  };
  const [speakers, setSpeakers] = useState([
    {
      speaker_name: "",
      speaker_designation: "",
      speaker_role: "",
    },
  ]);

  const option = [{ value: "online", label: "online" }];

  const types = [{ value: "Conference", label: "Conference" }];
  const onSubmit = async (data) => {
    console.log(data);
  };

  const addSpeaker = () => {
    setSpeakers([
      ...speakers,
      {
        speaker_name: "",
        speaker_designation: "",
        speaker_role: "",
      },
    ]);
  };

  const removeSpeaker = (index) => {
    const newSpeakers = speakers.filter((_, i) => i !== index);

    setSpeakers(newSpeakers);
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
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name of event is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the name of event"
                    {...field}
                  />
                  {errors.name && (
                    <span style={{ color: "red" }}>{errors.name.message}</span>
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
                    onChange={onChange}
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
              name="meeting_link"
              control={control}
              defaultValue=""
              rules={{ required: "Link  is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Add Meeting Link here" {...field} />
                  {errors.meeting_link && (
                    <span style={{ color: "red" }}>
                      {errors.meeting_link.message}
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
              Start Date
            </Typography>
            <Controller
              name="startDate"
              control={control}
              defaultValue={""}
              rules={{ required: "Start Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender
                    label="Select Date from Calender"
                    {...field}
                    value={field.value}
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
              Start Time
            </Typography>
            <Controller
              name="startTime"
              control={control}
              defaultValue=""
              rules={{ required: "StartTime is required" }}
              render={({ field }) => (
                <>
                  <StyledTime
                    label="Select Time"
                    {...field}
                    value={field.value}
                  />
                  {errors.startTime && (
                    <span style={{ color: "red" }}>
                      {errors.startTime.message}
                    </span>
                  )}{" "}
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
              defaultValue={""}
              rules={{ required: "End Date is required" }}
              render={({ field }) => (
                <>
                  <StyledCalender
                    label="Select Date "
                    {...field}
                    value={field.value}
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
              defaultValue=""
              rules={{ required: "Time is required" }}
              render={({ field }) => (
                <>
                  <StyledTime
                    label="Select Time"
                    {...field}
                    value={field.value}
                  />
                  {errors.endTime && (
                    <span style={{ color: "red" }}>
                      {errors.endTime.message}
                    </span>
                  )}{" "}
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
              Description
            </Typography>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description  is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    placeholder={"Enter description"}
                    {...field}
                  />
                  {errors.description && (
                    <span style={{ color: "red" }}>
                      {errors.description.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}></Grid>
          {speakers.map((speaker, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Speaker {index + 1}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`speakers[${index}].speaker_name`}
                  control={control}
                  defaultValue={speaker.speaker_name}
                  render={({ field }) => (
                    <StyledInput placeholder="Speaker Name" {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name={`speakers[${index}].speaker_designation`}
                  control={control}
                  defaultValue={speaker.speaker_designation}
                  render={({ field }) => (
                    <StyledInput placeholder="Speaker Designation" {...field} />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name={`speakers[${index}].speaker_role`}
                  control={control}
                  defaultValue={speaker.speaker_role}
                  render={({ field }) => (
                    <StyledInput placeholder="Speaker Role" {...field} />
                  )}
                />
              </Grid>

              <Grid item xs={6}></Grid>
              <Grid item xs={6} display={"flex"} justifyContent={"end"}>
                <Delete onClick={() => removeSpeaker(index)} />
              </Grid>
            </React.Fragment>
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

          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
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
        </Grid>
      </form>
    </Box>
  );
}
