import { Box, Grid, Typography, Stack } from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { StyledButton } from "../../ui/StyledButton";
import { StyledEventUpload } from "../../ui/StyledEventUpload";

const AddCollege = () => {
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
    <Box sx={{ padding: 3 }} bgcolor={"white"} borderRadius={"12px"}border={'1px solid rgba(0, 0, 0, 0.12)'}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Group Name
            </Typography>
            <Controller
              name="group_name"
              control={control}
              defaultValue=""
              rules={{ required: "Group Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the Group name" {...field} />
                  {errors.group_name && (
                    <span style={{ color: "red" }}>
                      {errors.group_name.message}
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
              Group Information
            </Typography>
            <Controller
              name="group_information"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Type the content here" {...field} />
                  {errors.group_information && (
                    <span style={{ color: "red" }}>
                      {errors.group_information.message}
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
              Group admin
            </Typography>
            <Controller
              name="group_admin"
              control={control}
              defaultValue=""
              rules={{ required: "Group Admin is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Choose the Group Admin"
                    {...field}
                  />
                  {errors.group_admin && (
                    <span style={{ color: "red" }}>
                      {errors.group_admin.message}
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
                    <span style={{ color: "red" }}>{errors.status.message}</span>
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

export default AddCollege;
