import React, { useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import BasicCard from "@/components/Card";
import { Grid, ListItem } from "@mui/material";

const Mypage = (prop: any) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [tasks, setTasks] = useState([]);
  const accessToken = prop.accessToken;

  const handleDateChange = async (date: Dayjs) => {
    if (!date) return;
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
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
          // 取得したデータを処理する
        } else {
          console.error("Error fetching tasks:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [accessToken]);

  const deleteTask = async (task_id: any) => {
    const url = "http://localhost:5000/task/" + task_id;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (res.ok) {
      setTasks((prev) => prev.filter((task) => task.id != task_id));
    } else {
      console.log("error");
    }
  };

  return (
    <Box sx={{ marginTop: "64px", flexGrow: 1, padding: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ListItem>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar value={selectedDate} onChange={handleDateChange} />
            </LocalizationProvider>
          </ListItem>
        </Grid>
        <Grid item xs={6}>
          <ListItem sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ padding: "15px" }}>
              <BasicCard
                time={selectedDate?.format("YYYY/MM/DD")}
                title={"Hello"}
                memo={"ご飯を忘れない"}
              />
            </Box>
            <Box sx={{ padding: "15px" }}>
              <BasicCard
                time={selectedDate?.add(1, "day").format("YYYY/MM/DD")}
                title={"Hello"}
                memo={"ご飯を忘れない"}
              />
            </Box>
            <Box sx={{ padding: "15px" }}>
              <BasicCard
                time={selectedDate?.add(2, "day").format("YYYY/MM/DD")}
                title={"Hello"}
                memo={"ご飯を忘れない"}
              />
            </Box>
            <Box sx={{ padding: "15px" }}>
              <BasicCard
                time={selectedDate?.add(3, "day").format("YYYY/MM/DD")}
                title={"Hello"}
                memo={"ご飯を忘れない"}
              />
            </Box>
          </ListItem>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Mypage;
