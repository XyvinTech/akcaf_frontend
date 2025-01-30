import React, { useEffect, useState } from "react";
import StyledTable from "../../ui/StyledTable";
import { Box, Stack, Typography } from "@mui/material";
import { StyledButton } from "../../ui/StyledButton";
import StyledSearchbar from "../../ui/StyledSearchbar";
import { paymentColumns, reportColumns } from "../../assets/json/TableData";
import { useListStore } from "../../store/listStore";
import { useReportStore } from "../../store/reportStore";
import ReportPreview from "./ReportPreview";
import { toast } from "react-toastify";

const ReportPage = () => {
  const { fetchReport } = useListStore();
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState("");
  const [view, setView] = useState(false);
  const [row, setRow] = useState(10);
  const [isChange, setIsChange] = useState(false);
  const { getReports, reports, updateReport } = useReportStore();

  useEffect(() => {
    let filter = {};
    filter.pageNo = pageNo;
    filter.limit = row;
    if (search) {
      filter.search = search;
      setPageNo(1);
    }
    fetchReport(filter);
  }, [pageNo, search, row, isChange]);
  const handleModify = async (id) => {
    await getReports(id);
    setView(true);
  };
  const handleReject = async (id) => {
    try {
      await updateReport(id, { status: "rejected" });
      setIsChange(!isChange);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
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
            Reports
          </Typography>
        </Stack>
        <Stack direction={"row"} spacing={2}>
          {/* <StyledButton variant={"secondary"} name={"Download"} /> */}
        </Stack>
      </Stack>
      <Box padding={"15px"}>
        <Stack
          direction={"row"}
          justifyContent={"end"}
          paddingBottom={"15px"}
          alignItems={"center"}
        >
          <Stack direction={"row"} spacing={2}>
            <StyledSearchbar
              placeholder={"Search"}
              onchange={(e) => setSearch(e.target.value)}
            />
          </Stack>
        </Stack>
        <Box
          borderRadius={"16px"}
          bgcolor={"white"}
          p={1}
          border={"1px solid rgba(0, 0, 0, 0.12)"}
        >
          <StyledTable
            columns={reportColumns}
            report
            pageNo={pageNo}
            setPageNo={setPageNo}
            rowPerSize={row}
            onModify={handleModify}
            onAction={handleReject}
            setRowPerSize={setRow}
          />
        </Box>
        <ReportPreview
          open={view}
          onClose={() => setView(false)}
          data={reports}
          onChange={() => setIsChange(!isChange)}
        />
      </Box>
    </>
  );
};

export default ReportPage;
