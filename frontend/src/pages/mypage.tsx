import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box } from "@mui/material";

const Mypage = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const handleDateChange = async (date: Dayjs) => {
    if (!date) return;
    setSelectedDate(date);
    const res = await fetch("http://127.0.0.1:5000/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={selectedDate} onChange={handleDateChange} />
      <p>{selectedDate?.format("YYYY/MM/DD")}</p>
    </LocalizationProvider>
  );
};

export default Mypage;
