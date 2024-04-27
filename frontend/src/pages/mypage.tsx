import React, { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import BasicCard from "@/components/Card";
import TodayCard from "@/components/TodayCard";

const Mypage = ({ token }: any) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [tasks, setTasks] = useState([]);
  const [todayTask, setTodayTask] = useState();

  const accessToken = token; //useEffectの場合，tokenがundefinedになる（レンダリング順番）

  const handleDateChange = async (date: Dayjs) => {
    if (!date) return;
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchTodaysTask = async () => {
      const today = dayjs().format("YYYY-MM-DD");

      try {
        const res = await fetch("http://localhost:5000/task/" + today, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTodayTask(data);
          console.log("today's task:" + data);
          // 取得したデータを処理する
        } else {
          console.error("Error fetching tasks:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTodaysTask();
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch("http://localhost:5000/task/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setTasks(data);
          console.log("my task:" + data);
          // 取得したデータを処理する
        } else {
          console.error("Error fetching tasks:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTask();
  }, []);

  // const deleteTask = async (task_id: any) => {
  //   const url = "http://localhost:5000/task/" + task_id;
  //   const res = await fetch(url, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   if (res.ok) {
  //     setTasks((prev) => prev.filter((task) => task.id != task_id));
  //   } else {
  //     console.log("error");
  //   }
  // };

  return (
    <Box
      sx={{
        flex: 1,
        px: 3,
        py: 2,
      }}
    >
      <Grid
        container
        direction="row"
        sx={{
          flex: 1,
          borderRadius: 3,
          bgcolor: "#f0f4f5",
          pr: 3,
          minHeight: "87.5vh",
        }}
      >
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ pt: 3, pl: 3, flex: 3 }}>
            <TodayCard data={todayTask} token={accessToken} />
          </Box>
          <Box sx={{ pt: 3, pl: 3, flex: 6 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar value={selectedDate} onChange={handleDateChange} />
            </LocalizationProvider>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: 3,
            pl: 3,
            pb: 3,
            flex: "1",
          }}
        >
          <Box sx={{ flex: 1, bgcolor: "#ffffff", borderRadius: 3 }}>
            <BasicCard token={accessToken} data={tasks} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Mypage;
