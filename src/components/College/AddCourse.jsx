import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";

import { StyledButton } from "../../ui/StyledButton";
import { useApprovalStore } from "../../store/approvalstore";
import StyledInput from "../../ui/StyledInput";
import { useCourseStore } from "../../store/coursestore";

const AddCourse = ({ open, onClose, onChange }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const { addCourses } = useCourseStore();
  const onSubmit = async (formData) => {
    const addData = {
      courseName: formData?.courseName,
    };

    await addCourses(addData);
    onChange();
    onClose();
  };
  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: { borderRadius: "12px" },
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ height: "auto", padding: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h3" color={"textTertiary"}>
                Add new course
              </Typography>
              <Typography
                onClick={onClose}
                color="#E71D36"
                style={{ cursor: "pointer" }}
              >
                <CloseIcon />
              </Typography>
            </Box>
          </DialogTitle>
          <DialogContent
            sx={{ height: "auto", width: "430px", backgroundColor: "#F9F9F9" }}
          >
            <Stack spacing={2} paddingTop={2}>
              <Controller
                name="courseName"
                control={control}
                rules={{ required: "Course is required" }}
                render={({ field }) => (
                  <>
                    <StyledInput placeholder={"Enter course name"} {...field} />
                    {errors.courseName && (
                      <span style={{ color: "red" }}>
                        {errors.courseName.message}
                      </span>
                    )}
                  </>
                )}
              />
            </Stack>
          </DialogContent>
          <Stack
            direction={"row"}
            spacing={2}
            padding={2}
            justifyContent={"end"}
          >
            <StyledButton
              variant="secondary"
              name="Cancel"
              onClick={(event) => handleClear(event)}
            />
            <StyledButton variant="primary" name="Save" type="submit" />
          </Stack>
        </form>
      </Dialog>
    </>
  );
};

export default AddCourse;
