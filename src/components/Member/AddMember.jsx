import { Box, Grid, Typography, Stack } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { StyledButton } from "../../ui/StyledButton";
import { StyledEventUpload } from "../../ui/StyledEventUpload";

const AddMember = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
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
              First Name
            </Typography>
            <Controller
              name="first_name"
              control={control}
              defaultValue=""
              rules={{ required: "First Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the First name" {...field} />
                  {errors.first_name && (
                    <span style={{ color: "red" }}>
                      {errors.first_name.message}
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
              Middle Name
            </Typography>
            <Controller
              name="middle_name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Middle Name" {...field} />
                  {errors.middle_name && (
                    <span style={{ color: "red" }}>
                      {errors.middle_name.message}
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
              Last Name
            </Typography>
            <Controller
              name="last_name"
              control={control}
              defaultValue=""
              rules={{ required: "Last Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Last Name" {...field} />
                  {errors.last_name && (
                    <span style={{ color: "red" }}>
                      {errors.last_name.message}
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
              College Name
            </Typography>
            <Controller
              name="collegeName"
              control={control}
              defaultValue=""
              rules={{ required: "College Name is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Choose the college"
                    {...field}
                  />
                  {errors.collegeName && (
                    <span style={{ color: "red" }}>
                      {errors.collegeName.message}
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
              Batch
            </Typography>
            <Controller
              name="batch"
              control={control}
              defaultValue=""
              rules={{ required: "Batch is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Choose the batch"
                    {...field}
                  />
                  {errors.batch && (
                    <span style={{ color: "red" }}>{errors.batch.message}</span>
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
              Member Id
            </Typography>
            <Controller
              name="memberId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the member ID" {...field} />
                  {errors.memberId && (
                    <span style={{ color: "red" }}>
                      {errors.memberId.message}
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
              Designation
            </Typography>
            <Controller
              name="designation"
              control={control}
              defaultValue=""
              rules={{ required: "Designation is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Choose the Designation"
                    {...field}
                  />
                  {errors.designation && (
                    <span style={{ color: "red" }}>
                      {errors.designation.message}
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
              Photo
            </Typography>
            <Controller
              name="photo"
              control={control}
              defaultValue=""
              rules={{ required: "Photo is required" }}
              render={({ field: { onChange, value } }) => (
                <>
                  <StyledEventUpload
                    label="Upload Photo here"
                    onChange={onChange}
                    value={value}
                  />
                  {errors.photo && (
                    <span style={{ color: "red" }}>{errors.photo.message}</span>
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
              Bio
            </Typography>
            <Controller
              name="bio"
              control={control}
              defaultValue=""
              rules={{ required: "Bio is required" }}
              render={({ field }) => (
                <>
                  <StyledMultilineTextField
                    placeholder="Add Description "
                    {...field}
                  />
                  {errors.bio && (
                    <span style={{ color: "red" }}>{errors.bio.message}</span>
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
              Email Id
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the email id " {...field} />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
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
              Phone number
            </Typography>
            <Controller
              name="phone_number"
              control={control}
              defaultValue=""
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the phone number"
                    {...field}
                  />
                  {errors.phone_number && (
                    <span style={{ color: "red" }}>
                      {errors.phone_number.message}
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
              Status
            </Typography>
            <Controller
              name="status"
              control={control}
              defaultValue=""
              rules={{ required: "Status is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Choose the status"
                    {...field}
                  />
                  {errors.status && (
                    <span style={{ color: "red" }}>
                      {errors.status.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>

          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
              <StyledButton name="Cancel" variant="secondary" />
              <StyledButton name="Save" variant="primary" type="submit" />
            </Stack>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default AddMember;
