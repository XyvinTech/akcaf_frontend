import { Box, Grid, Stack, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import StyledSelectField from "../../ui/StyledSelectField";
import { StyledButton } from "../../ui/StyledButton";
import { useEffect, useState } from "react";
import { useDropDownStore } from "../../store/dropDownStore";
import { StyledCalender } from "../../ui/StyledCalender";
import { usePaymentStore } from "../../store/paymentstore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddPaymentPage = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loadings, setLoadings] = useState(false);
  const { user, fetchListofUser } = useDropDownStore();
  const { addPayment } = usePaymentStore();
  useEffect(() => {
    fetchListofUser();
  }, []);
  const option =
    user && Array.isArray(user)
      ? user.map((item) => ({
          value: item._id,
          label: item.name,
        }))
      : [];

  const onSubmit = async (data) => {
    const formData = {
      user: data?.user?.value,
      expiryDate: data?.expiryDate,
    };
    try {
      setLoadings(true);
      await addPayment(formData);
      navigate("/payments");
      reset();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoadings(false);
    }
  };

  return (
    <>
      {" "}
      <Stack
        direction={"row"}
        padding={"10px"}
        bgcolor={"#fff"}
        height={"70px"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack>
          <Typography variant="h4" color="textSecondary">
            Add Payment
          </Typography>
        </Stack>
      </Stack>
      <Grid container padding={"15px"}>
        <Grid item xs={12} md={8}>
          {" "}
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
                    User
                  </Typography>
                  <Controller
                    name="user"
                    control={control}
                    defaultValue=""
                    rules={{ required: "User is required" }}
                    render={({ field }) => (
                      <>
                        <StyledSelectField
                          {...field}
                          placeholder="Select User"
                          options={option}
                        />
                        {errors.user && (
                          <span style={{ color: "red" }}>
                            {errors.user.message}
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
                    Expiry Date
                  </Typography>
                  <Controller
                    name="expiryDate"
                    control={control}
                    defaultValue=""
                    rules={{ required: "expiryDate is required" }}
                    render={({ field }) => (
                      <>
                        <StyledCalender {...field} />
                        {errors.expiryDate && (
                          <span style={{ color: "red" }}>
                            {errors.expiryDate.message}
                          </span>
                        )}
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
        </Grid>
      </Grid>
    </>
  );
};

export default AddPaymentPage;
