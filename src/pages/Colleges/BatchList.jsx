import { Box, Divider, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCollgeStore } from "../../store/collegestore";
import { useNavigate, useParams } from "react-router-dom";
import StyledTable from "../../ui/StyledTable";
import { batchColumns } from "../../assets/json/TableData";
import { useListStore } from "../../store/listStore";

const BatchList = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const navigate = useNavigate();
  const { coursedetails, fetchBatch } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [row, setRow] = useState(10);
  const { id } = useParams();
  const collegeCourses = coursedetails?.find(
    (college) => college.collegeId === id
  );

  useEffect(() => {
    if (collegeCourses?.courses?.[selectedTab]) {
      let filter = {};
      filter.pageNo = pageNo;
      filter.limit = row;
      const selectedCourseId = collegeCourses.courses[selectedTab]._id;
      fetchBatch(id, selectedCourseId, filter);
    }
  }, [selectedTab, collegeCourses, pageNo, row]);

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
          <StyledTable
            columns={batchColumns}
            onView={(view) => {
              navigate(`/college/batch/${view}`, {
                state: {
                  collegeId: id,
                  courseId: collegeCourses.courses[selectedTab]._id,
                },
              });
            }}
            menu
            pageNo={pageNo}
            setPageNo={setPageNo}
            rowPerSize={row}
            setRowPerSize={setRow}
          />
        </Box>
      </Box>
    </>
  );
};

export default BatchList;
