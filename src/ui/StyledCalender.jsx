import React from "react";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"; 

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.2)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.2)",
            borderWidth: "1px",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(0, 0, 0, 0.2)",
          "&.Mui-focused": {
            color: "rgba(0, 0, 0, 0.2)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          "& .MuiInputBase-input::placeholder": {
            color: "rgba(0, 0, 0, 0.2)",
            opacity: 1,
          },
        },
      },
    },
  },
});

const CustomTextField = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#ffffff",
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
  },
});

export const StyledCalender = ({ label, onChange, placeholder, value }) => {
  const [selectedDate, setSelectedDate] = React.useState(
    value ? moment.utc(value) : null // Initialize with UTC value
  );

  React.useEffect(() => {
    if (value) {
      setSelectedDate(moment.utc(value)); // Ensure the value is set in UTC
    }
  }, [value]);

  const handleDateChange = (date) => {
    if (date) {
      const utcDate = moment.utc(date).toISOString(); // Convert date to UTC
      setSelectedDate(moment.utc(date)); // Set selected date in UTC format
      if (onChange) {
        onChange(utcDate); // Return the UTC date in ISO format
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params) => (
            <CustomTextField {...params} placeholder={placeholder} />
          )}
          sx={{ width: "100%" }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  );
};
