import { Box, Grid, Typography, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import StyledInput from "../../ui/StyledInput";
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledButton } from "../../ui/StyledButton";
import { useDropDownStore } from "../../store/dropDownStore";
import { useAdminStore } from "../../store/adminStore";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddAdmin = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { college, fetchListofCollege, fetchListofRole, role } =
    useDropDownStore();
  const [loading, setLoading] = useState(false);
  const { addAdmins, fetchSingleAdmin, single, updateAdmin } = useAdminStore();
  const location = useLocation();
  const { adminId, isUpdate } = location.state || {};
  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        name: data?.name,
        email: data?.email,
        college: data?.college.value,
        role: data?.role.value,
        phone: data?.phone,
        status: data?.status?.value === "inactive" ? false : true,
      };
      if (isUpdate) {
        await updateAdmin(adminId, formData);
      } else {
        await addAdmins(formData);
      }
      reset();
      navigate("/settings");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchListofCollege();
    fetchListofRole();
  }, [fetchListofCollege, fetchListofRole]);
  useEffect(() => {
    if (isUpdate && adminId) {
      fetchSingleAdmin(adminId);
    }
  }, [adminId, isUpdate]);
  const collegeList =
    college && Array.isArray(college)
      ? college?.map((item) => ({
          value: item._id,
          label: item.collegeName,
        }))
      : [];
  const roleList =
    role && Array.isArray(role)
      ? role?.map((item) => ({
          value: item._id,
          label: item.roleName,
        }))
      : [];
  useEffect(() => {
    if (single && isUpdate) {
      setValue("name", single.name);
      const selectedRole = roleList.find(
        (role) => role.value === single.role?._id
      );
      const selectedCollege = collegeList.find(
        (college) => college.value === single?.college
      );
      const selectedStatus = statusOptions.find(
        (status) => status.value === (single.status ? "active" : "inactive")
      );
      setValue("status", selectedStatus);
      setValue("college", selectedCollege);
      setValue("role", selectedRole);
      setValue("email", single.email);
      setValue("phone", single.phone);
    }
  }, [single, isUpdate, setValue]);
  const handleClear = (event) => {
    event.preventDefault();
    reset();
    navigate(-1);
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
              Name of the Person <span style={{ color: "#E30613" }}>*</span>
            </Typography>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: " Name is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter  name" {...field} />
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
              College <span style={{ color: "#E30613" }}>*</span>
            </Typography>
            <Controller
              name="college"
              control={control}
              defaultValue=""
              rules={{ required: "College Name is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    placeholder="Choose the College"
                    {...field}
                    options={collegeList}
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
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Role <span style={{ color: "#E30613" }}>*</span>
            </Typography>
            <Controller
              name="role"
              control={control}
              defaultValue=""
              rules={{ required: "Role is required" }}
              render={({ field }) => (
                <>
                  <StyledSelectField
                    options={roleList}
                    placeholder="Choose the Role"
                    {...field}
                  />
                  {errors.role && (
                    <span style={{ color: "red" }}>{errors.role.message}</span>
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
              Email Id <span style={{ color: "#E30613" }}>*</span>
            </Typography>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email Id is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter Email Id" {...field} />
                  {errors.email && (
                    <span style={{ color: "red" }}>{errors.email.message}</span>
                  )}
                </>
              )}
            />
          </Grid>{" "}
          <Grid item xs={6}>
            <Typography
              sx={{ marginBottom: 1 }}
              variant="h6"
              color="textSecondary"
            >
              Phone Number <span style={{ color: "#E30613" }}>*</span>
            </Typography>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{ required: "Phone Number is required" }}
              render={({ field }) => (
                <>
                  <StyledInput placeholder="Enter Phone Number" {...field} />
                  {errors.phone && (
                    <span style={{ color: "red" }}>{errors.phone.message}</span>
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

          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <Stack direction={"row"} spacing={2} justifyContent={"flex-end"}>
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
};

export default AddAdmin;
