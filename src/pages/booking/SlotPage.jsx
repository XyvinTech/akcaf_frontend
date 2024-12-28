import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import { StyledTime } from "../../ui/StyledTime";
import { createTime, getTimes } from "../../api/timeapi";
import { toast } from "react-toastify";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const SlotPage = () => {
  const [availability, setAvailability] = useState([]);
  const [isChange, setIsChange] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await getTimes();
        const backendData = response.data;
        const mappedData = days.map((day) => {
          const backendDay = backendData.find((item) => item.day === day);
          return backendDay
            ? { ...backendDay, checked: true }
            : { day, checked: false, start: null, end: null };
        });

        setAvailability(mappedData);
      } catch (error) {
        console.error("Error fetching times:", error);
      }
    };

    fetchTimes();
  }, [isChange]);

  const handleCheckboxChange = (index) => {
    const newAvailability = [...availability];
    newAvailability[index].checked = !newAvailability[index].checked;
    setAvailability(newAvailability);
  };

  const handleTimeChange = (index, type, value) => {
    const newAvailability = [...availability];
    newAvailability[index][type] = value;
    setAvailability(newAvailability);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const mappedAvailability = availability.map((item) => {
        if (item.checked) {
          return {
            day: item.day,
            ...(item.start && { start: item.start }),
            ...(item.end && { end: item.end }),
          };
        } else {
          return { day: item.day };
        }
      });

      await createTime({ addTimeSchema: mappedAvailability });
      setLoading(false);
      toast.success("Saved successfully");
      setIsChange(!isChange);
    } catch (error) {
      console.error("Error saving times:", error);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h6" mb={2} color="#111928">
        Weekly Hours
      </Typography>
      <Stack spacing={2}>
        {availability?.map((item, index) => (
          <Stack
            key={item.day}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
            p={2}
            borderRadius={1}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(index)}
                  color="primary"
                />
              }
              label={<Typography fontWeight="bold">{item.day}</Typography>}
            />
            {item?.checked ? (
              <Stack direction="row" spacing={2} alignItems="center">
                <StyledTime
                  label="Start Time"
                  value={item.start}
                  onChange={(value) => handleTimeChange(index, "start", value)}
                />
                <Typography>-</Typography>
                <StyledTime
                  label="End Time"
                  value={item.end}
                  onChange={(value) => handleTimeChange(index, "end", value)}
                />
              </Stack>
            ) : (
              <Typography color="gray">Unavailable</Typography>
            )}
          </Stack>
        ))}
      </Stack>
      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
        <StyledButton name={loading ? "Saving..." : "Save"} variant={"primary"} onClick={handleSave} />
      </Stack>
    </Box>
  );
};

export default SlotPage;
