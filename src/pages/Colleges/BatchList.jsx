import { Box, Divider, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCollgeStore } from "../../store/collegestore";
import { useParams } from "react-router-dom";
import StyledTable from "../../ui/StyledTable";
import { batchColumns } from "../../assets/json/TableData";

const BatchList = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { coursedetails, batches, fetchBatch } = useCollgeStore();
  const { id } = useParams();
  const collegeCourses = coursedetails?.find(
    (college) => college.collegeId === id
  );

  useEffect(() => {
    if (collegeCourses?.courses?.[selectedTab]) {
      const selectedCourseId = collegeCourses.courses[selectedTab]._id;
      fetchBatch(id, selectedCourseId);
    }
  }, [selectedTab, collegeCourses]);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        aria-label="tabs"
        TabIndicatorProps={{
          style: {
            backgroundColor: "#E30613",
            height: 4,
            borderRadius: "4px",
          },
        }}
        sx={{
          paddingTop: "0px",
          "& .MuiTabs-indicator": {
            backgroundColor: "#E30613",
          },
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            color: "#686465",
          },
          "& .MuiTab-root.Mui-selected": {
            color: "#E30613",
          },
        }}
      >
        {collegeCourses?.courses?.map((course, index) => (
          <Tab key={course._id} label={course.courseName} />
        ))}
      </Tabs>
      <Divider />
      <Box padding="15px" marginBottom={4}>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable columns={batchColumns} data={batches} menu />
        </Box>
      </Box>
    </>
  );
};

export default BatchList;
