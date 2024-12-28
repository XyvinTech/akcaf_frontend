import React, { useEffect, useState } from "react";
import ActivityChart from "../../components/Dashboard/ActivityChart";
import { Box, Grid, Stack, Typography } from "@mui/material";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import { getDashboard } from "../../api/adminapi";
import { useNavigate } from "react-router-dom";
import { useMemberStore } from "../../store/Memberstore";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState([]);
  const [type, setType] = useState("month");
  const { setMemStatus, setSub } = useMemberStore();
  const fetchUser = async (status) => {
    setMemStatus(status);
    // setSub(null);
    // setUser(null);
    navigate(`/members`);
  };
  useEffect(() => {
    const dashboardData = async () => {
      try {
        const response = await getDashboard({ type: type });
        // console.log("Dashboard Data:", response.data);

        setDashboardData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    dashboardData();
  }, [type]);
  const totalMembers = {
    title: "Total Members",
    value: dashboardData?.totalMembers ? dashboardData?.totalMembers : 0,
  };
  const totalColleges = {
    title: "Total Colleges",
    value: dashboardData?.totalColleges ? dashboardData?.totalColleges : 0,
  };
  const totalRevenue = {
    title: "Total Revenue",
    value: `AED ${dashboardData?.totalRevenue ? dashboardData?.totalRevenue : 0}`,
  };
  
  const activeUsers = {
    title: "Active",
    value: dashboardData?.activeUsers ? dashboardData?.activeUsers : 0,
  };
  const inactiveUsers = {
    title: "Inactive",
    value: dashboardData?.inactiveUsers ? dashboardData?.inactiveUsers : 0,
  };
  const suspendedUsers = {
    title: "Suspended",
    value: dashboardData?.suspendedUsers,
  };
  const events = {
    title: "Events",
    value: dashboardData?.eventsCount ? dashboardData?.eventsCount : 0,
  };
  const news = {
    title: "News",
    value: dashboardData?.newsCount ? dashboardData?.newsCount : 0,
  };
  const deleted = {
    title: "Deleted",
    value: dashboardData?.deletedUsers ? dashboardData?.deletedUsers : 0,
  };
  const awaiting = {
    title: "Awaiting payment",
    value: dashboardData?.awaitingPaymentUsers
      ? dashboardData?.awaitingPaymentUsers
      : 0,
  };
  const notifications = {
    title: "Feeds",
    value: dashboardData?.feedsCount ? dashboardData?.feedsCount : 0,
  };
  const payments = {
    title: "Promotions",
    value: dashboardData?.promotionCount ? dashboardData?.promotionCount : 0,
  };

  return (
    <>
      <Box
        padding={"10px"}
        bgcolor={"#FFFFFF"}
        height={"70px"}
        display={"flex"}
        alignItems={"center"}
      >
        <Typography variant="h4" color={"#4A4647"}>
          Dashboard
        </Typography>
      </Box>
      <Grid container padding={"15px"} paddingTop={3} spacing={4}>
        <Grid item xs={6}>
          <Stack spacing={2} direction={"row"}>
          <Box
              width={"100%"}
              sx={{ cursor: "pointer" }}
              onClick={() =>navigate("/members")}
            >
            <DashboardCard data={totalMembers} color={"#E30613"} /></Box>
            <Box
              width={"100%"}
              sx={{ cursor: "pointer" }}
              onClick={() =>navigate("/colleges")}
            >
            <DashboardCard data={totalColleges} color={"#006591"} /></Box>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          {" "}
          <DashboardCard data={totalRevenue} color={"#6C9CF8"} />
        </Grid>
        <Grid item xs={6}>
          {" "}
          <ActivityChart
            title={"Members"}
            data={dashboardData?.memberGraph}
            type={type}
            setType={setType}
          />
        </Grid>
        <Grid item xs={6}>
          {" "}
          <ActivityChart
            title={"Total Revenue"}
            data={dashboardData?.revenueGraph}
            type={type}
            setType={setType}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} direction={"row"}>
            <Box
              width={"100%"}
              sx={{ cursor: "pointer" }}
              onClick={() => fetchUser("active")}
            >
              <DashboardCard data={activeUsers} color={"#1ABA0C"} />
            </Box>
            <Box
              width={"100%"}
              sx={{ cursor: "pointer" }}
              onClick={() => fetchUser("inactive")}
            >
            <DashboardCard data={inactiveUsers} color={"#FFCC00"} /></Box>
            <Box
              width={"100%"}
              sx={{ cursor: "pointer" }}
              onClick={() => fetchUser("suspended")}
            >
            <DashboardCard data={suspendedUsers} color={"#FF9500"} /></Box>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} direction={"row"}>
          <Box
              width={"100%"}
              sx={{ cursor: "pointer" }}
              onClick={() =>navigate("/events/list")}
            >
            <DashboardCard data={events} /></Box>
            <Box
              width={"100%"}
              sx={{ cursor: "pointer" }}
              onClick={() =>navigate("/news")}
            >
            <DashboardCard data={news} /></Box>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} direction={"row"}>
          <Box
              width={"100%"}
              sx={{ cursor: "pointer" }}
              onClick={() => fetchUser("deleted")}
            >
            <DashboardCard data={deleted} color={"#E30613"} /></Box>
            <Box
              width={"100%"}
              sx={{ cursor: "pointer" }}
              onClick={() => fetchUser("awaiting_payment")}
            >
            <DashboardCard data={awaiting} color={"#FF9500"} /></Box>
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2} direction={"row"}>
          <Box
              width={"100%"}
            >
            <DashboardCard data={notifications} /></Box>
            <Box
              width={"100%"}
              sx={{ cursor: "pointer" }}
              onClick={() =>navigate("/promotions")}
            >
            <DashboardCard data={payments} /></Box>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
