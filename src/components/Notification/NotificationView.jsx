import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
  Link,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";

const NotificationView = ({ open, onClose, data }) => {
  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: "12px" },
      }}
    >
      <DialogTitle sx={{ height: "auto", padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h6"
            fontWeight="bold"
            textTransform={"capitalize"}
          >
            {data?.type}{" "}
          </Typography>
          <Typography
            onClick={(event) => handleClear(event)}
            color="#E71D36"
            style={{ cursor: "pointer" }}
          >
            <CloseIcon />
          </Typography>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ height: "auto", width: "500px", padding: 0 }}>
        <Stack spacing={2} padding={2} justifyContent={"center"}>
          <Typography variant="h5" color={"#2C2829"} fontWeight="bold">
            {data?.subject}
          </Typography>
          <Typography variant="h6" color={"#4A4647"}>
            {data?.content}
          </Typography>
          {data?.link && (
           <Box
           sx={{
             cursor: "pointer",
             color: "#1976d2",
             textDecoration: "underline",
             "&:hover": { textDecoration: "none" },
           }}
           onClick={() => {
             const formattedLink = data.link.startsWith("http")
               ? data.link
               : `https://${data.link}`; 
             
             window.open(formattedLink, "_blank", "noopener,noreferrer");
           }}
         >
           View more details
         </Box>
         
          )}

          {data?.users && data.users.length > 0 && (
            <Stack spacing={1} mt={2}>
              <Typography variant="h6" fontWeight="bold">
                Users:
              </Typography>
              {data?.users?.map((userObj) => (
                <Box key={userObj?._id} display="flex" alignItems="center">
                  <Typography variant="body1">
                    {userObj?.user?.fullName}{" "}
                    {userObj?.read ? "(Read)" : "(Unread)"}
                  </Typography>
                </Box>
              ))}
            </Stack>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationView;
