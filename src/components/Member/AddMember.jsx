import { Box, Grid, Typography, Stack, LinearProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import { StyledButton } from "../../ui/StyledButton";
import { StyledEventUpload } from "../../ui/StyledEventUpload";
import { useDropDownStore } from "../../store/dropDownStore";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemberStore } from "../../store/Memberstore";
import { getRole } from "../../api/collegeapi";
import { upload } from "../../api/adminapi";

const AddMember = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { memberId, isUpdate } = location.state || {};
  const { college, fetchListofCollege } = useDropDownStore();
  const { addMembers, fetchMemberById, member, updateMember, loading } =
    useMemberStore();

  const [selectedCollege, setSelectedCollege] = useState(null);
  const [courseOptions, setCourseOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [loadings, setLoadings] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const defaultRoleOptions = [
    { value: "president", label: "President" },
    { value: "secretary", label: "Secretary" },
    { value: "treasurer", label: "Treasurer" },
    { value: "rep", label: "Rep" },
    { value: "member", label: "Member" },
  ];

  const [roleOptions, setRoleOptions] = useState(defaultRoleOptions);

  useEffect(() => {
    fetchListofCollege();
  }, []);

  useEffect(() => {
    if (isUpdate && memberId) {
      fetchMemberById(memberId);
    }
  }, [memberId, isUpdate]);
  const collegeList =
    college && Array.isArray(college)
      ? college?.map((item) => ({
          value: item._id,
          label: item.collegeName,
        }))
      : [id];

  useEffect(() => {
    if (isUpdate && member) {
      const selectedColleges = collegeList?.find(
        (item) => item?.value === member?.college?._id
      );
      setValue(
        "college",
        selectedColleges || {
          valud: member?.college?._id,
          label: member?.college?.collegeName,
        }
      );
      console.log("selected College", selectedCollege);
      setSelectedCollege(selectedColleges);
      setValue("fullName", member?.fullName || "");
      setValue("email", member?.email || "");
      setValue("phone", member?.phone || "");
      setValue("bio", member?.bio || "");
      setValue("image", member?.image || "");
      setValue("emiratesID", member?.emiratesID || "");
      if (selectedCollege) {
        handleCollegeChange(selectedCollege);
        // setValue(
        //   "course",
        //   member?.course
        //     ? { value: member?.course?._id, label: member?.course?.courseName }
        //     : ""
        // );
        setValue(
          "batch",
          member?.batch ? { value: member?.batch, label: member?.batch } : ""
        );
      }
      setValue(
        "batch",
        member?.batch ? { value: member?.batch, label: member?.batch } : ""
      );
      const selectedRole = defaultRoleOptions?.find(
        (item) => item?.value === member?.role
      );
      setValue("role", selectedRole || "");
      const selectedStatus = statusOptions?.find(
        (item) => item?.value === member?.status
      );
      setValue("status", selectedStatus || "");
    }
  }, [member, isUpdate, setValue]);
  const handleCollegeChange = async (selectedCollegeId) => {
    try {
      const res = await getRole(selectedCollegeId.value);

      const roleData = res?.data;

      if (roleData?.length > 0) {
        // Extract unique roles from API response
        const excludedRoles = [...new Set(roleData.map((item) => item.role))];

        // Filter out the excluded roles from roleOptions
        const filteredRoles = defaultRoleOptions.filter(
          (role) => !excludedRoles.includes(role.value)
        );

        setRoleOptions(filteredRoles);
      }
    } catch (error) {
      console.error("Error fetching role data:", error);
    }

    const selectedCollege = college?.find(
      (item) => item?._id === selectedCollegeId?.value
    );
    if (selectedCollege) {
      // console.log("here is selected college", selectedCollege);

      // const updatedCourses = selectedCollege?.course?.map((course) => ({
      //   value: course?._id,
      //   label: course?.courseName,
      // }));
      // setCourseOptions(updatedCourses);
      const updatedBatches = selectedCollege?.batch?.map((batch) => ({
        value: batch,
        label: batch,
      }));

      setBatchOptions(updatedBatches);

      setValue("course", "");
      // setValue("batch", "");
    }
  };
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const handleClear = (event) => {
    event.preventDefault();
    reset();
    setImageFile(null);
    setSelectedCollege(null);
    setCourseOptions([]);
    setBatchOptions([]);
    navigate(-1);
  };

  const onSubmit = async (data) => {
    try {
      setLoadings(true);
      let imageUrl = data?.image || "";

     if (imageFile) {
          try {
            imageUrl = await new Promise(async (resolve, reject) => {
              try {
                const response = await upload(imageFile);
                resolve(response?.data || "");
              } catch (error) {
                reject(error);
              }
            });
          } catch (error) {
            console.error("Failed to upload image:", error);
            return;
          }
        }
      const formData = {
        fullName: data?.fullName,
        emiratesID: data?.emiratesID,
        email: data?.email,
        phone: data?.phone?.startsWith("+") ? data.phone : `+${data.phone}`,
        college: data?.college.value,
        // course: data?.course.value,
        batch: data?.batch.value,
        role: data?.role.value,
        status: data?.status.value,
      };
      if (imageUrl) {
        formData.image = imageUrl;
      }
      if (data?.bio) {
        formData.bio = data?.bio;
      }
      if (isUpdate) {
        await updateMember(memberId, formData);
      } else {
        await addMembers(formData);
      }
      reset();
      navigate("/members");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadings(false);
    }
  };

  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : (
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
                  Name
                </Typography>
                <Controller
                  name="fullName"
                  control={control}
                  defaultValue=""
                  rules={{ required: " Name is required" }}
                  render={({ field }) => (
                    <>
                      <StyledInput placeholder="Enter the name" {...field} />
                      {errors.fullName && (
                        <span style={{ color: "red" }}>
                          {errors.fullName.message}
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
                  Emirates ID
                </Typography>
                <Controller
                  name="emiratesID"
                  control={control}
                  defaultValue=""
                  rules={{ required: "emiratesID is required" }}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Enter the emirates ID"
                        {...field}
                      />
                      {errors.emiratesID && (
                        <span style={{ color: "red" }}>
                          {errors.emiratesID.message}
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
                  name="college"
                  control={control}
                  defaultValue=""
                  rules={{ required: "College Name is required" }}
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        placeholder="Choose the college"
                        options={collegeList}
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleCollegeChange(e);
                          setSelectedCollege(e);
                        }}
                      />
                      {errors.college && (
                        <span style={{ color: "red" }}>
                          {errors.college.message}
                        </span>
                      )}
                    </>
                  )}
                />
              </Grid>
              {/* <Grid item xs={12}>
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
                        placeholder="Choose the course"
                        options={courseOptions}
                        {...field}
                      />
                    </>
                  )}
                />
              </Grid> */}
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
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        placeholder="Choose the batch"
                        options={batchOptions}
                        {...field}
                      />
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
                  Role
                </Typography>
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        placeholder="Choose the Role"
                        options={roleOptions}
                        {...field}
                      />
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
                  name="image"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <>
                      <StyledEventUpload
                        label="Upload Photo here"
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
                      <StyledInput
                        placeholder="Enter the email id "
                        {...field}
                      />
                      {errors.email && (
                        <span style={{ color: "red" }}>
                          {errors.email.message}
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
                  Phone number
                </Typography>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <>
                      <StyledInput
                        placeholder="Enter the phone number"
                        type={"mobile"}
                        {...field}
                      />
                      {errors.phone && (
                        <span style={{ color: "red" }}>
                          {errors.phone.message}
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
                  Bio
                </Typography>
                <Controller
                  name="bio"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <StyledMultilineTextField placeholder="Bio" {...field} />
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
                  render={({ field }) => (
                    <>
                      <StyledSelectField
                        placeholder="Choose the status"
                        options={statusOptions}
                        {...field}
                      />
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <Stack
                  direction={"row"}
                  spacing={2}
                  justifyContent={"flex-end"}
                >
                  <StyledButton
                    name="Cancel"
                    variant="secondary"
                    onClick={(event) => handleClear(event)}
                  />
                  <StyledButton
                    name={loadings ? "Saving..." : "Save"}
                    variant="primary"
                    type="submit"
                  />
                </Stack>
              </Grid>
            </Grid>
          </form>
        </Box>
      )}{" "}
    </>
  );
};

export default AddMember;
