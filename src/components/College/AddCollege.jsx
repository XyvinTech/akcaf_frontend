import { Box, Grid, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledButton } from "../../ui/StyledButton";
import { useDropDownStore } from "../../store/dropDownStore";
import { useCollgeStore } from "../../store/collegestore";
import { useLocation, useNavigate } from "react-router-dom";
import AddCourse from "./AddCourse";
import { toast } from "react-toastify";

const AddCollege = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { collegeId, isUpdate } = location.state || {};
  const { course, fetchListofCourse } = useDropDownStore();
  const [courseOpen, setCourseOpen] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { addColleges, fetchCollegeById, college, updateCollege } =
    useCollgeStore();
  const addCourse = () => {
    setCourseOpen(true);
  };
  useEffect(() => {
    if (isUpdate && collegeId) {
      fetchCollegeById(collegeId);
    }
  }, [collegeId, isUpdate]);
  useEffect(() => {
    if (college && isUpdate) {
      setValue("collegeName", college?.collegeName);
      const selectedCountry = country.find(
        (item) => item?.value === college?.country
      );
      setValue("country", selectedCountry || "");
      const selectedState = state.find((item) => item?.value === college?.state);
      setValue("state", selectedState || "");
      const selectedCourses = college?.course?.map((courseId) =>
        courseOption.find((option) => option?.value === courseId)
      );
      setValue("course", selectedCourses || []);
      setValue("startYear", college?.startYear);
      const selectedStatus = option.find(
        (item) => item?.value === (college?.status ? "active" : "inactive")
      );
      setValue("status", selectedStatus || "");
    }
  }, [college, isUpdate, setValue]);
  const handleClose = () => {
    setCourseOpen(false);
  };
  const handleChange = () => {
    setIsChange(!isChange);
  };
  const handleClear = (event) => {
    event.preventDefault();
    reset();
    navigate(-1);
  }
  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const formData = {
        course: data?.course.map((i) => i.value),
        startYear: data?.startYear,
        collegeName: data?.collegeName,
        country: data?.country.value,
        state: data?.state.value,
        status: data?.status.value === "active" ? true : false,
      };
      if (isUpdate && collegeId) {
        await updateCollege(collegeId, formData);
        navigate("/colleges");
      } else {
        const response = await addColleges(formData);

        navigate("/colleges");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    fetchListofCourse();
  }, [isChange]);
  const courseOption =
    course &&
    Array.isArray(course) &&
    course.map((i) => ({
      value: i?._id,
      label: i?.courseName,
    }));
  const option = [
    {
      value: "active",
      label: "Active",
    },
    {
      value: "inactive",
      label: "Inactive",
    },
  ];
  const state = [
    {
      value: "Kerala",
      label: "Kerala",
    },
  ];
  const country = [
    {
      value: "India",
      label: "India",
    },
  ];
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
              College Name
            </Typography>
            <Controller
              name="collegeName"
              control={control}
              defaultValue=""
              rules={{ required: "College Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput
                    placeholder="Enter the College name"
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
              Course Name
            </Typography>
            <Controller
              name="course"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <StyledSelectField
                    isMulti
                    options={courseOption}
                    placeholder="choose the course name"
                    {...field}
                  />
                  {errors.course && (
                    <span style={{ color: "red" }}>
                      {errors.course.message}
                    </span>
                  )}
                </>
              )}
            />
          </Grid>
          <Grid item xs={12} display={"flex"} justifyContent={"flex-end"}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              fontWeight={500}
              color={"#E30613"}
              onClick={addCourse}
            >
              + Add more
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Start year
            </Typography>
            <Controller
              name="startYear"
              control={control}
              defaultValue=""
              rules={{ required: "Start year is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter the start year" {...field} />
                  {errors.startYear && (
                    <span style={{ color: "red" }}>
                      {errors.startYear.message}
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
              Country
            </Typography>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{ required: "Country is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Choose the Country"
                    {...field}
                    options={country}
                  />
                  {errors.country && (
                    <span style={{ color: "red" }}>
                      {errors.country.message}
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
              State
            </Typography>
            <Controller
              name="state"
              control={control}
              defaultValue=""
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Choose the state"
                    {...field}
                    options={state}
                  />
                  {errors.state && (
                    <span style={{ color: "red" }}>{errors.state.message}</span>
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
                    options={option}
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
              <StyledButton name="Cancel" variant="secondary" onClick={(e) => handleClear(e)}/>
              <StyledButton
                name={submitting ? "Saving..." : "Save"}
                variant="primary"
                type="submit"
              />
            </Stack>
          </Grid>
        </Grid>
      </form>
      <AddCourse
        open={courseOpen}
        onClose={handleClose}
        onChange={handleChange}
      />
    </Box>
  );
};

export default AddCollege;
