import {
  Typography,
  Dialog,
  DialogContent,
  Stack,
  DialogTitle,
  Box,
  Divider,
  Grid,
  Avatar,
  DialogActions,
} from "@mui/material";
import { ReactComponent as CloseIcon } from "../../assets/icons/CloseIcon.svg";
import moment from "moment";
import { StyledButton } from "../../ui/StyledButton";
import { useReportStore } from "../../store/reportStore";
import { toast } from "react-toastify";
import image from "../../assets/images/image.png"
const ReportPreview = ({ open, onClose, onChange, data }) => {
  const { updateReport } = useReportStore();
  const handleClear = (event) => {
    event.preventDefault();
    onClose();
  };
  const handleSubmit = async () => {
    try {
      await updateReport(data?._id, { status: "approved" });
      onChange();
    } catch (error) {
      toast.error(error.message);
    } finally {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: "12px", minWidth: 700 },
      }}
    >
      <DialogTitle sx={{ height: "auto", padding: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>Report Details</Typography>
          <Typography
            onClick={(event) => handleClear(event)}
            color="#E71D36"
            style={{ cursor: "pointer" }}
          >
            <CloseIcon />
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: 3 }}>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Typography variant="h6" color={"#333333"} fontWeight={600}>
              Report Type: {data?.reportType}
            </Typography>{" "}
            {data?.content !== null && (
              <>
                <Typography variant="h6" color={"#333333"} fontWeight={600}>
                  Reported Content
                </Typography>

                <Box
                  display={"flex"}
                  justifyContent="center"
                  alignItems={"center"}
                  bgcolor={"#f2f2f2"}
                  padding={"16px"}
                  borderRadius={"10px"}
                >
                  {data?.reportType === "User" && (
                    <Stack
                      spacing={2}
                      bgcolor={"white"}
                      borderRadius={"10px"}
                      padding={"10px"}
                      width={"185px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                         <img
                        src={data?.content?.image || image}
                        alt="profile"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <Typography
                        variant="h4"
                        fontWeight={600}
                        color={"#2C2829"}
                      >
                        {data?.content?.fullName}
                      </Typography>
                      <Stack
                        direction={"row"}
                        spacing={2}
                        width={"100%"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Stack justifyContent={"start"} width={"100%"}>
                          <Typography
                            fontWeight={600}
                            textTransform={"capitalize"}
                          >
                            {data?.content?.role}
                          </Typography>
                          <Typography>{data?.content?.memberId}</Typography>
                        </Stack>
                      </Stack>
                    </Stack>
                  )}

                  {data?.reportType === "Feeds" && (
                    <Stack
                      spacing={2}
                      bgcolor={"white"}
                      borderRadius={"10px"}
                      padding={"10px"}
                      width={"185px"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <img
                        src={data?.content?.media}
                        alt="profile"
                        style={{
                          width: "165px",
                          height: "85px",
                          objectFit: "contain",
                        }}
                      />
                      <Typography mt={2}>{data?.content?.content}</Typography>
                    </Stack>
                  )}
                  {data?.reportType === "Message" && (
                    <Stack
                      spacing={2}
                      bgcolor={"white"}
                      borderRadius={"10px"}
                      padding={"10px"}
                      width={"185px"}
                      display={"flex"}
                      justifyContent={"flex-start"}
                    >
                      <Typography mt={2}>
                        {data?.content?.content}
                      </Typography>
                      <Typography mt={2} textAlign="end">
                        {moment(data?.content?.timestamp).format(
                          "HH:mm"
                        )}
                      </Typography>
                    </Stack>
                  )}
                </Box>
              </>
            )}
          </Stack>{" "}
          <Box>
            <Grid container spacing={2} alignItems="center">
              <Grid item md={6}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Typography sx={{ width: "60%", textAlign: "left" }}>
                    Reported By:
                  </Typography>
                 
                  <Typography
                    variant="h6"
                    sx={{ width: "40%", textAlign: "left" }}
                  >
                    {data?.reportBy?.fullName}
                  </Typography>
                </Stack>
                {data?.reportType === "User" && (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center" // Centers the text vertically within each Stack
                    mb={2}
                  >
                    <Typography sx={{ width: "60%", textAlign: "left" }}>
                      Offender:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ width: "40%", textAlign: "left" }}
                    >
                      {data?.content?.fullName}
                    </Typography>
                  </Stack>
                )}
                {data?.reportType === "Feeds" && (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Typography sx={{ width: "60%", textAlign: "left" }}>
                        Posted By
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "40%", textAlign: "left" }}
                      >
                        {data?.author}
                      </Typography>
                    </Stack>
                  )}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center" // Centers the text vertically within each Stack
                  mb={2}
                >
                  <Typography sx={{ width: "60%", textAlign: "left" }}>
                    Report Reason :
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ width: "40%", textAlign: "left" }}
                  >
                    {data?.description || "N/P"}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item md={6}>
                {data?.reportType === "Feeds" && (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="start"
                    mb={2}
                  >
                    <Typography sx={{ width: "60%", textAlign: "left" }}>
                      Feed Date / Time:
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ width: "40%", textAlign: "left" }}
                    >
                      {moment(data?.createdAt).format("DD-MM-YYYY HH:mm")}
                    </Typography>
                  </Stack>
                )}
                {(data?.reportType === "User" ||
                  data?.reportType === "Feeds" ||
                  data?.reportType === "Message") && (
                  <>
                    {" "}
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="start"
                      mb={2}
                    >
                      <Typography sx={{ width: "60%", textAlign: "left" }}>
                        Report time/ date:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "40%", textAlign: "left" }}
                      >
                        {moment(data?.createdAt).format("DD-MM-YYYY HH:mm")}
                      </Typography>
                    </Stack>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={2}
                    >
                      <Typography sx={{ width: "60%", textAlign: "left" }}>
                        Offence time/ date:
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ width: "40%", textAlign: "left" }}
                      >
                        {moment(data?.content?.createdAt).format(
                          "DD-MM-YYYY HH:mm"
                        )}
                      </Typography>
                    </Stack>
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <StyledButton
          name={`Report ${data?.reportType}`}
          onClick={handleSubmit}
          variant={"primary"}
        />
      </DialogActions>
    </Dialog>
  );
};

export default ReportPreview;
