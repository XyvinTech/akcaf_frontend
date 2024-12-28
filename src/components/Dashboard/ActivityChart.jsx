import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Brush,
} from "recharts";
import DashboardSelect from "../../ui/DashboardSelect";

const ActivityChart = ({ title, data , type, setType}) => {
  const counts = data?.map((item) => item.count) || [];
  const minValue = Math.min(...counts, 0); 
  const maxValue = Math.max(...counts, 100); 
  const step = 10; 
  const ticks = Array.from({ length: (maxValue - minValue) / step + 1 }, (_, i) => minValue + i * step);

  const handleSelectChange = (event) => {
    setType(event.target.value);
  };
  const options = [
    { value: "month", label: "Month" },
    { value: "year", label: "Year" },
  ];
  return (
    <Box
      width={"100%"}
      height={355}
      padding={2}
      bgcolor={"#fff"}
      borderRadius={"8px"}
    >
      <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
        <Typography variant="h4">{title}</Typography>
        <DashboardSelect
          options={options}
          value={type}
          onChange={handleSelectChange}
        />
      </Stack>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: "12px", fill: "#637381", fontWeight: "500" }}
          />
          <YAxis
            domain={[minValue, maxValue]}
            ticks={ticks}
            tick={{ fontSize: "12px", fill: "#637381", fontWeight: "500" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#e30613"
            strokeWidth={2}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Brush
            dataKey="name"
            height={20}
            stroke="#637381"
            travellerWidth={10}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ActivityChart;
