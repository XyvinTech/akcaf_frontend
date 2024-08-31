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
  import { useState } from "react";
import { StyledButton } from "../../ui/StyledButton";
import { StyledMultilineTextField } from "../../ui/StyledMultilineTextField";
import ApproveRejectDisplay from "./ApproveRejectDisplay";

  
  const RejectEntry = ({ open, onClose, data, onChange }) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      getValues,
    } = useForm();
    const [reject, setReject] = useState(false);
    const [previewData, setPreviewData] = useState(null);
  
    const onSubmit = async (formData) => {
      const updateData = {
        reason: formData?.reason,
        status: "rejected",
      };
      onChange();
      onClose();
    };
  
    const handleReject = (event) => {
      event.preventDefault();
      setPreviewData({ ...data, reason: getValues("reason") });
      setReject(true);
    };
  
    const handleCloseReject = () => {
      setReject(false);
      setPreviewData(null);
    };
    console.log(data);
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
                  Rejection notice
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
                <Typography variant="h7" color={"textTertiary"}>
                  Reason for Rejection
                </Typography>
                <Controller
                  name="reason"
                  control={control}
                  rules={{ required: "Content is required" }}
                  render={({ field }) => (
                    <>
                      <StyledMultilineTextField
                        placeholder={"Add reason"}
                        {...field}
                      />
                      {errors.reason && (
                        <span style={{ color: "red" }}>
                          {errors.reason.message}
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
                name="Preview"
                onClick={handleReject}
              />
              <StyledButton variant="primary" name="Send" type="submit" />
            </Stack>
          </form>
        </Dialog>
  
        <ApproveRejectDisplay
          open={reject}
          onClose={handleCloseReject}
          data={previewData}
          onChange={onSubmit}
        />
      </>
    );
  };
  
  export default RejectEntry;
  