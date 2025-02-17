import { useEffect, useState } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import { StyledButton } from "../../ui/StyledButton";
import StyledInput from "../../ui/StyledInput";
import { useMemberStore } from "../../store/Memberstore";
import StyledSelectField from "../../ui/StyledSelectField";

const BookingFilter = ({ open, onClose, onApply }) => {
  const [userName, setUserName] = useState("");
  const [eventName, setEventName] = useState("");
  const [status, setStatus] = useState(null);
  const [hall, setHall] = useState("");

  const handleClear = (event) => {
    event.preventDefault();
    setHall("");
    setEventName("");
    setUserName("");
    setStatus(null);
    onApply({
      hall: "",
      eventName: "",
      userName: "",
      status: "",
    });
    onClose();
  };

  const handleApply = () => {
    onApply({
      hall,
      eventName,
      userName,
      status: status?.value || "",
    });
    onClose();
  };

  const handleStatusChange = (selectedOption) => {
    setStatus(selectedOption);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          position: "absolute",
          top: 0,
          right: 0,
          height: "100vh",
          width: "430px",
        },
      }}
    >
      <DialogTitle sx={{ height: "auto", padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" color={"#4F4F4F"}>
            Filter
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
      <DialogContent sx={{ padding: 0 }}>
        <Stack spacing={2} padding={2} mb={12}>
          <Typography>Hall</Typography>
          <StyledInput
            placeholder={"Enter hall Name"}
            value={hall}
            onChange={(e) => setHall(e.target.value)}
          />
          <Typography>User Name</Typography>
          <StyledInput
            placeholder={"Enter User Name"}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <Typography>Event Name</Typography>
          <StyledInput
            placeholder={"Enter Event Name"}
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <Typography>Status</Typography>
          <StyledSelectField
            placeholder="Select Status"
            options={[
              { value: "active", label: "active" },
              { value: "inactive", label: "inactive" },
              { value: "suspended", label: "suspended" },
              { value: "deleted", label: "deleted" },
              { value: "awaiting_payment", label: "awaiting_payment" },
            ]}
            value={status}
            onChange={handleStatusChange}
          />
        </Stack>
      </DialogContent>
      <Stack direction={"row"} spacing={2} padding={2} justifyContent={"end"}>
        <StyledButton variant="secondary" name="Reset" onClick={handleClear} />
        <StyledButton variant="primary" name="Apply" onClick={handleApply} />
      </Stack>
    </Dialog>
  );
};

export default BookingFilter;
